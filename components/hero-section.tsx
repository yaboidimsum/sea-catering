import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Truck, FileText, Phone } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Grid background with improved performance */}
      <div className="vercel-grid absolute inset-0 will-change-transform" />

      {/* Gradient mesh background */}
      <div className="bg-gradient-mesh absolute inset-0 opacity-30" />

      <div className="container relative mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-sm font-medium"
          >
            SEA Catering
          </Badge>
          <h1 className="vercel-text-gradient mb-6 animate-fade-in text-balance text-5xl font-bold md:text-7xl">
            Healthy Meals, Anytime, Anywhere.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl animate-slide-up text-pretty text-xl text-gray-400">
            SEA Catering provides the meal plans and delivery infrastructure to
            build, scale, and secure a healthier, more personalized diet.
          </p>
          <div className="mb-16 flex animate-slide-up flex-col justify-center gap-4 sm:flex-row">
            <Button
              className="interactive-hover focus-ring bg-white px-6 py-3 text-black hover:bg-gray-200"
              asChild
            >
              <Link href="/menu">▲ Start Ordering</Link>
            </Button>
            <Button
              variant="outline"
              className="glass-effect focus-ring border-gray-600 px-6 py-3 text-white hover:bg-gray-800"
              asChild
            >
              <Link href="/contact">Get a Demo</Link>
            </Button>
          </div>

          {/* Enhanced Hero Image with modern styling */}
          <div className="relative mx-auto mb-16 w-full max-w-4xl">
            <div className="vercel-border-gradient gpu-accelerated relative aspect-video overflow-hidden rounded-lg bg-black/40">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              <Image
                src="/stock-photo.jpg"
                alt="Assortment of healthy meals"
                fill
                className="object-cover opacity-90"
                priority
              />
            </div>
          </div>

          {/* <div className="mt-16 animate-fade-in text-center">
            <h2 className="mb-4 text-balance text-2xl font-semibold">
              Develop with your favorite ingredients →
            </h2>
            <p className="text-pretty text-xl font-semibold">
              Launch globally, instantly ⚡ Keep eating healthy →
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
