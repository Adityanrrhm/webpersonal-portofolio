import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificatesPage from "@/components/CertificatesPage";

export default function CertificatePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CertificatesPage />
      <Footer />
    </main>
  );
}
