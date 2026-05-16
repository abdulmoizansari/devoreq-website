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
    return () => io.disconnect();
  }, []);
  return ref;
}

export function SectionTitle({ eyebrow, title, light = false, accent }: { eyebrow?: string; title: string; light?: boolean; accent?: string }) {
  return (
    <div className="mb-12 reveal">
      {eyebrow && <div className={`text-xs uppercase tracking-[0.3em] mb-3 ${light ? "text-[#38BDF8]" : "text-[#38BDF8]"}`}>{eyebrow}</div>}
      <h2 className={`font-serif section-title ${light ? "text-[#0F172A]" : "text-[#0F172A]"}`}>
        {title}
        {accent && <span className="text-[#0EA5E9]"> {accent}</span>}
      </h2>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-[#F8FAFC] pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif section-title text-[#0F172A]">{title}</h1>
        <p className="mt-4 text-[#64748B] max-w-2xl text-base md:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
