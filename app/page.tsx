import HeroSection from "@/components/auto-slider-banner";
import Concerts from "@/components/sections/concerts";
import MerchSection from "@/components/sections/merch";

export default function TaniynLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />

      <MerchSection />

      <Concerts />
    </div>
  );
}
