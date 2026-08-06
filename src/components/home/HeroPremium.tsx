"use client";
import Link from "next/link";
import { useReveal } from "@/components/Section";

export function HeroPremium() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center bg-[#0F172A] overflow-hidden pt-20">
      {/* Background Particles/Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/50 to-[#0F172A] z-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0F172A]/80 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <div className="reveal">
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">
              Premium Publishing House
            </span>
          </div>
          <h1 className="reveal font-serif text-5xl md:text-6xl lg:text-7xl text-[#FFFFFF] leading-[1.1] mb-6">
            From Manuscript to <span className="text-[#D4AF37]">Bestseller</span>.
          </h1>
          <p className="reveal text-lg md:text-xl text-[#FFFFFF]/80 mb-10 font-sans leading-relaxed max-w-xl">
            Professional cover design, interior formatting, global publishing, and strategic author branding for those who demand excellence.
          </p>
          
          <div className="reveal flex flex-wrap gap-4">
            <Link href="/contact" className="btn-gold">
              Publish My Book
            </Link>
            <Link href="/portfolio" className="btn-outline-light">
              View Portfolio
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex justify-center reveal relative">
          {/* Floating book effect */}
          <div className="relative w-80 h-[480px] perspective-[1000px]">
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-3xl rounded-full transform translate-y-10"></div>
            <div className="relative w-full h-full transform-style-3d hover:-rotate-y-12 transition-transform duration-700 ease-out animate-[float_6s_ease-in-out_infinite]">
              <img 
                src="/portfolio/ebook/Leonardo And Me _ Cover Illustration and Book Design __ Behance/imgi_48_cd5475243420291.6982b49c0e92a.jpeg" 
                alt="Premium Book Cover" 
                className="w-full h-full object-cover rounded-md shadow-2xl shadow-black/50"
              />
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}} />
    </section>
  );
}
