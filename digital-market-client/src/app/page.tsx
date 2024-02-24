import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  const user = false;

  return (
    <div>
      <Navbar />
      <HeroSection />
    </div>
  );
}
