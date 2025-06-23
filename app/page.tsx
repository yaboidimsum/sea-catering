import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
