import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import HomePageClient from "@/components/marketing/pages/HomePageClient";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HomePageClient />
      </main>
      <Footer />
    </div>
  );
}
