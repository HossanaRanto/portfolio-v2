import { PublicNavbar } from "@/presentation/components/layout/PublicNavbar";
import { Footer } from "@/presentation/components/layout/Footer";

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
      <Footer />
    </>
  );
}
