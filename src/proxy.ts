import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { localizedPath } from "@/lib/seo-routes.mjs";

const AUTHORIZED_EMAIL = process.env.AUTHORIZED_EMAIL || "";

export async function proxy(request: NextRequest) {
  // Lets the root layout set <html lang> from the ?lang parameter
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-lang", request.nextUrl.searchParams.get("lang") === "fr" ? "fr" : "en");

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Legacy detail URLs -> /projects?project=<id> and /experiences?experience=<id>.
  // Done here (not in the page) so crawlers get a real 308 instead of a streamed client redirect.
  const legacy = request.nextUrl.pathname.match(/^\/(projects|experiences)\/([^/]+)\/?$/);
  if (legacy) {
    const [, section, key] = legacy;
    const { data } = section === "projects"
      ? await supabase.from("projects").select("id, language").eq("slug", key).maybeSingle()
      : await supabase.from("experiences").select("id, language").eq("id", key).maybeSingle();
    if (data) {
      const param = section === "projects" ? "project" : "experience";
      return NextResponse.redirect(
        new URL(localizedPath(`/${section}`, data.language, { [param]: data.id }), request.url),
        308,
      );
    }
  }

  const { data: { user } } = await supabase.auth.getUser();

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!user) {
          return NextResponse.redirect(new URL('/login', request.url));
      }
      
      if (user.email !== AUTHORIZED_EMAIL) {
          // If logged in but not authorized, redirect to a "Unauthorized" or simple logout behavior
          // For now, let's redirect to home with a query param? or prevent access
           return NextResponse.redirect(new URL('/', request.url));
      }
  }

  // Determine if we should refresh the session (handled by getUser implicitly via supabase client logic normally, but here middleware ensures tokens are fresh)
  // Actually, getUser() already refreshes if needed in the background if we use the proper supabase method in middleware which is getSession usually, but getUser is safer
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
