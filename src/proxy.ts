import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const AUTHORIZED_EMAIL = "mahefaniainaranto@gmail.com";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
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
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

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
