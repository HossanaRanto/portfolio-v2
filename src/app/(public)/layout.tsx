import { PublicNavbar } from "@/presentation/components/layout/PublicNavbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <main>
        {children}
      </main>
      <footer className="py-8 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} Ranto Mahefaniaina. All rights reserved.
      </footer>
    </>
  );
}
