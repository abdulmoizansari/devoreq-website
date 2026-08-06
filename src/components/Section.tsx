"use client";

import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.classList.add("in"); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.classList.contains("reveal")) io.observe(n);
            n.querySelectorAll(".reveal").forEach((child) => io.observe(child));
          }
        });
      });
    });
    mo.observe(el, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return ref;
}

export function SectionTitle({ eyebrow, title, light = false, accent }: { eyebrow?: string; title: string; light?: boolean; accent?: string }) {
  return (
    <div className="mb-12 reveal">
      {eyebrow && <div className={`text-xs uppercase tracking-[0.3em] mb-3 ${light ? "text-[#D4AF37]" : "text-[#D4AF37]"}`}>{eyebrow}</div>}
      <h2 className={`font-serif section-title ${light ? "text-[#FFFFFF]" : "text-[#0F172A]"}`}>
        {title}
        {accent && <span className="text-[#D4AF37] italic"> {accent}</span>}
      </h2>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-[#0F172A] pt-32 pb-16 border-b border-[#D4AF37]/20">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif section-title text-[#FFFFFF]">{title}</h1>
        <p className="mt-4 text-white/70 max-w-2xl text-base md:text-lg font-sans">{subtitle}</p>
      </div>
    </section>
  );
}
