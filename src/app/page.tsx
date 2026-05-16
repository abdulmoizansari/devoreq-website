"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { SectionTitle, useReveal } from "@/components/Section";
import { HERO_STATS, SERVICE_STRIP, PROCESS, SERVICES, TESTIMONIALS, STATS_BANNER, BLOG_POSTS, BRAND } from "@/lib/site";
import { PORTFOLIO_IMAGES } from "@/lib/portfolioData";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 2000;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const ref = useReveal<HTMLDivElement>();
  const featured = SERVICES.slice(0, 6);
  const accentBg = (a: string) => a === "purple" ? "bg-[#efeaff]" : a === "teal" ? "bg-[#e6f8fb]" : "bg-[#faf3df]";

  return (
    <SiteShell>
      <div ref={ref}>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#F8FAFC]">
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
              <source src="/video1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/5 via-transparent to-[#F8FAFC]" />
          </div>
          <div className="relative mx-auto max-w-5xl px-6 text-center z-10">
            <h1 className="reveal mt-6 font-serif hero-title text-[#0F172A]" style={{ transitionDelay: "150ms" }}>
              Everything Your Book Needs. <br/><span className="text-[#0EA5E9]">Under One Roof.</span>
            </h1>
            <div className="reveal mt-6 text-[#64748B] hero-subtitle mx-auto space-y-4" style={{ transitionDelay: "300ms" }}>
              <p>From ghostwriting and publishing to branding, marketing, websites, and audiobook production, Devoreq helps modern authors turn ideas into professional publishing brands.</p>
              <p>We combine creative storytelling, premium design, publishing expertise, and modern technology to help authors launch with confidence.</p>
              <p>Whether you're publishing your first eBook, building a personal brand, or launching a full publishing business, our team delivers premium-quality execution without the traditional publishing gatekeeping.</p>
            </div>
            <div className="reveal mt-8 flex flex-col sm:flex-row gap-3 justify-center" style={{ transitionDelay: "450ms" }}>
              <button 
                onClick={() => window.dispatchEvent(new Event("openLeadModal"))}
                className="btn-gold"
              >
                Download Free Premium Sample
              </button>
              <Link href="/pricing" className="btn-ghost">View Pricing</Link>
            </div>

            <div className="reveal mt-14 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-2 md:divide-x divide-white/10" style={{ transitionDelay: "600ms" }}>
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className="px-4">
                  <div className="font-serif text-3xl md:text-4xl text-[#0EA5E9] float-slow" style={{ animationDelay: `${i * 0.4}s` }}>{s.value}</div>
                  <div className="mt-1 text-[12px] tracking-wider text-[#64748B]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE STRIP */}
        <section className="bg-[#FFFFFF] py-10 border-y border-white/5">
          <div className="mx-auto max-w-7xl px-4 grid grid-cols-4 md:grid-cols-8 gap-y-6">
            {SERVICE_STRIP.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
                <i className={`ti ${s.icon} text-2xl text-[#38BDF8]`} />
                <span className="text-[12px] text-[#0F172A] text-center px-1">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="bg-[#FFFFFF] py-24">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="text-xs uppercase tracking-[0.3em] text-[#38BDF8] mb-3">Trust</div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A]">Trusted by Modern Authors, Coaches & Storytellers</h2>
              <p className="mt-4 text-[#64748B]">
                We help authors publish professionally across major global platforms while building long-term audience growth systems around their books.
              </p>
            </div>
            <div className="reveal bg-[#F8FAFC] rounded-2xl p-8 border border-[#E2E8F0]">
              <h3 className="font-serif text-2xl text-[#0EA5E9] mb-4">What Makes Devoreq Different</h3>
              <ul className="space-y-3">
                {[
                  "Premium-quality publishing without agency-level pricing",
                  "Modern branding built for today's digital audience",
                  "Publishing, design, marketing & tech under one roof",
                  "Transparent communication and guided support",
                  "Built for indie authors, creators, and entrepreneurs"
                ].map(item => (
                  <li key={item} className="flex gap-3 text-[#64748B] text-sm items-start">
                    <i className="ti ti-check text-[#0EA5E9] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-[#F8FAFC] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionTitle eyebrow="Our Process" title="From Idea to Bestseller in Four Steps." light />
            <div className="grid md:grid-cols-4 gap-10 relative">
              <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-[#0EA5E9]/40" />
              {PROCESS.map((p) => (
                <div key={p.n} className="reveal relative">
                  <div className="font-serif text-[80px] leading-none text-[#0EA5E9]/10 absolute -top-6 -left-2 select-none">{p.n}</div>
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-[#0EA5E9] mb-4 ring-4 ring-[#F8FAFC]" />
                    <h3 className="text-[#0F172A] font-sans font-medium text-base">{p.title}</h3>
                    <p className="text-[#64748B] text-[13px] mt-2">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED SERVICES */}
        <section className="bg-[#F8FAFC] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionTitle eyebrow="What We Do" title="Featured Services" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((s) => (
                <div key={s.slug} className={`reveal card-hover rounded-xl p-6 ${accentBg(s.accent)} border border-[#E2E8F0]`}>
                  <div className="text-[11px] uppercase tracking-wider text-[#64748B] mb-3">{s.category}</div>
                  <h3 className="font-serif text-xl text-[#0F172A]">{s.name}</h3>
                  <p className="mt-2 text-[13px] text-[#64748B]">{s.short}</p>
                  <div className="mt-5 flex items-end justify-between">
                    <div className="text-[#0EA5E9] font-bold text-sm font-serif">{s.price.split(" ")[0]}</div>
                    <Link href="/services" className="text-[#0F172A] text-sm inline-flex items-center gap-1 hover:text-[#38BDF8]">
                      Learn More <i className="ti ti-arrow-right" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-[#F8FAFC] py-24 border-t border-[#E2E8F0]">
          <div className="mx-auto max-w-7xl px-6">
            <SectionTitle eyebrow="Authors We've Served" title="Loved by Authors Worldwide." />
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.slice(0, 3).map((t) => (
                <div key={t.name} className="reveal card-hover bg-white rounded-xl p-6 border border-[#E2E8F0]">
                  <div className="text-[#0EA5E9]">{"★★★★★"}</div>
                  <p className="mt-4 font-serif italic text-[15px] text-[#0F172A]">"{t.quote}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#38BDF8]/15 text-[#0F172A] grid place-items-center font-semibold text-sm">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#0F172A]">{t.name}</div>
                      <div className="text-xs text-[#64748B]">{t.role} · {t.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO SHOWCASE */}
        <section className="bg-[#F8FAFC] py-24 border-t border-[#E2E8F0] relative overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
              <source src="/video2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-[#F8FAFC]" />
          </div>
          
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <SectionTitle eyebrow="Our Portfolio" title="Creative Marketing & Publishing." light />
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0, 10, 20, 30, 40, 50, 60, 70].map(index => PORTFOLIO_IMAGES[index]).filter(Boolean).map((src, i) => (
                <div key={i} className="reveal rounded-xl overflow-hidden aspect-square border border-[#E2E8F0]" style={{ animationDelay: `${i * 0.1}s` }}>
                  <img src={src} alt="Portfolio preview" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/portfolio" className="btn-gold inline-flex">View Full Portfolio</Link>
            </div>
          </div>
        </section>

        {/* STATS BANNER */}
        <section className="bg-[#F8FAFC] py-20">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-y-8">
            {STATS_BANNER.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-4xl md:text-5xl text-[#0EA5E9]">
                  <CountUp to={s.target} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[#64748B] text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOG PREVIEW */}
        <section className="bg-[#F8FAFC] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionTitle eyebrow="From the Journal" title="Insights from the Devoreq Editorial Team." />
            <div className="grid md:grid-cols-3 gap-6">
              {BLOG_POSTS.slice(0, 3).map((p) => (
                <article key={p.title} className="reveal card-hover bg-white rounded-xl p-6 border border-[#E2E8F0]">
                  <span className="inline-block text-[11px] uppercase tracking-wider bg-[#F8FAFC] text-[#0F172A] px-2 py-1 rounded">{p.cat}</span>
                  <h3 className="mt-4 font-serif text-base text-[#0F172A] leading-snug">{p.title}</h3>
                  <p className="mt-2 text-[13px] text-[#64748B]">{p.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-[#64748B]">
                    <span className="h-7 w-7 rounded-full bg-[#0EA5E9]/15 text-[#0F172A] grid place-items-center font-semibold">{p.initials}</span>
                    {p.author} · {p.read}
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-10"><Link href="/blog" className="btn-gold">Visit the Blog</Link></div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[#F8FAFC] py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-[#0EA5E9] mb-4">Your Story Deserves More Than a Basic Upload.</div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#0F172A]">Publishing today is more than formatting a file and clicking publish.</h2>
            <div className="mt-6 text-[#64748B] space-y-4 text-base md:text-lg">
              <p>Your book deserves professional design, strategic positioning, audience-building systems, and a publishing experience built for long-term success.</p>
              <p>At Devoreq, we help authors launch professionally, build authority, and grow lasting publishing brands.</p>
            </div>
            <div className="reveal mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-gold">Start Your Project</Link>
              <Link href="/contact" className="btn-ghost">Book Free Consultation</Link>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
