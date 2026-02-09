import { PublicNavbar } from "@/presentation/components/layout/PublicNavbar";
import { Footer } from "@/presentation/components/layout/Footer";
import { GeometricBackground } from "@/presentation/components/ui/geometric-background";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GeometricBackground />
      <PublicNavbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
