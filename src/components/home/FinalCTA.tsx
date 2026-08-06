"use client";
import Link from "next/link";
import { useReveal } from "@/components/Section";

export function FinalCTA() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="relative bg-[#0F172A] py-32 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFFFFF] rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center reveal">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
          Your Story Deserves More <br className="hidden md:block" />
          <span className="italic text-[#D4AF37]">Than A Draft.</span>
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-sans">
          Join the hundreds of authors who trusted Devoreq to bring their publishing dreams to life. Let's create something timeless.
        </p>
        <Link href="/contact" className="btn-gold px-10 py-4 text-lg">
          Start Your Publishing Journey
        </Link>
      </div>
    </section>
  );
}
