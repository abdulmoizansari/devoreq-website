"use client";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { SectionTitle, useReveal } from "@/components/Section";



const TIMELINE = [
  { year: "Jan 2024", text: "Devoreq founded with a single ghostwriter and a dream." },
  { year: "Mar 2024", text: "First 100 books published across 5 platforms." },
  { year: "Jun 2024", text: "Expanded into cover design and audiobook production." },
  { year: "Sep 2024", text: "Opened global ghostwriter network across 14 countries." },
  { year: "Dec 2024", text: "Launched our marketing division and PR partnerships." },
  { year: "Feb 2025", text: "Premiered our first Times Square billboard campaign." },
  { year: "Apr 2025", text: "Released AI-integrated author website platform." },
  { year: "Now", text: "Crossed 2,400 published titles across 60+ countries." },
];

const TEAM = [
  { handle: "@publishbyemirah", role: "Cover Design & Video Production", imgPath: "/profiles/publishbyemirah.jpg" },
  { handle: "@revampbypatrick", role: "Project Management", imgPath: "/profiles/revampbypatrick.jpg" },
  { handle: "@jessicastudioco", role: "Design & Web Development", imgPath: "/profiles/jessica.jpg" },
  { handle: "@portersocials", role: "Brand Strategy", imgPath: "/profiles/porter.jpg" },
  { handle: "@studiohemphill", role: "Growth Analysis", imgPath: "/profiles/Studiohemphill.jpg" },
  { handle: "@danielclarkbuilds", role: "Automation Strategy", imgPath: "/profiles/danielclark.jpg" },
  { handle: "@mellissacreative", role: "Creative Design", imgPath: "/profiles/mellissa.jpg" },
  { handle: "@stantondesignsco", role: "Visual Identity", imgPath: "/profiles/stanton.jpg" },
  { handle: "@craftedbyxavier", role: "Brand Creative", imgPath: "/profiles/craftedbyxavier.jpg" },
  { handle: "@georgehopsonstudio", role: "Creative Studio", imgPath: "/profiles/george.jpg" },
];

function AboutPage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <SiteShell>
      <div ref={ref}>
        <section className="network-bg pt-32 pb-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-[#0EA5E9] font-bold mb-4">DEVOREQ</div>
            <h1 className="reveal font-serif text-[#0F172A] text-2xl md:text-3xl leading-snug">
              Where innovation meets publishing, branding, and digital growth.
            </h1>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <div className="text-xs uppercase tracking-[0.3em] text-[#38BDF8]">Our Mission</div>
              <h2 className="font-serif text-3xl text-[#0F172A] mt-3">Help every author & business publish like the best in the world.</h2>
              <p className="mt-4 text-[#64748B]">Helping authors, creators, startups, and businesses build world-class digital brands and publishing experiences.</p>
            </div>
            <div className="reveal">
              <div className="text-xs uppercase tracking-[0.3em] text-[#0EA5E9]">Our Vision</div>
              <h2 className="font-serif text-3xl text-[#0F172A] mt-3">A world without limits.</h2>
              <p className="mt-4 text-[#64748B]">A future where powerful stories, businesses, and ideas can reach global audiences without limits.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-24">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <h2 className="font-serif text-3xl text-[#0F172A]">Who We Are</h2>
              <p className="mt-4 text-[#64748B]">Devoreq is a modern publishing and digital creative studio specializing in:</p>
              <ul className="mt-4 space-y-2 text-[#64748B]">
                <li>• eBooks & Ghostwriting</li>
                <li>• Cover Design & Branding</li>
                <li>• Author Websites & Web Development</li>
                <li>• Social Media Growth</li>
                <li>• Marketing & Automation</li>
                <li>• Local Business Branding & Digital Presence</li>
              </ul>
              <p className="mt-6 text-[#64748B]">
                Since 2024, we’ve collaborated with authors, entrepreneurs, creators, and USA local businesses through a global creative network of strategists, designers, developers, marketers, and publishing specialists.
              </p>
            </div>
            <div className="reveal">
              <h2 className="font-serif text-3xl text-[#0F172A]">What We Build</h2>
              <ul className="mt-4 space-y-2 text-[#64748B]">
                <li>• Author & Business Websites</li>
                <li>• Publishing & Content Systems</li>
                <li>• Lead Generation Funnels</li>
                <li>• Brand Identity & Social Presence</li>
                <li>• AI-Powered Business Automation</li>
                <li>• Digital Marketing & Growth Strategies</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionTitle eyebrow="Milestones" title="Our Growth" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                "Published books across major global platforms",
                "Built an international creative network",
                "Expanded into AI-powered publishing and web experiences",
                "Launched Times Square billboard campaigns",
                "Worked with creators and businesses across multiple countries"
              ].map((m, i) => (
                <div key={i} className="reveal bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
                  <i className="ti ti-check text-[#0EA5E9] text-xl mb-3" />
                  <p className="text-[#0F172A] font-medium">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-[#F8FAFC] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <SectionTitle eyebrow="Creative Network" title="Team Experience" />
              <p className="text-[#64748B] max-w-2xl mx-auto mt-4">
                Our global creative network brings combined experience across publishing, branding, development, automation, design, and digital marketing.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {TEAM.map((m) => {
                const username = m.handle.replace("@", "");
                return (
                  <a key={m.handle} href={`https://instagram.com/${username}`} target="_blank" rel="noreferrer" className="reveal text-center bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm hover:border-[#0EA5E9] transition-colors block group">
                    <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-[#E2E8F0] group-hover:border-[#0EA5E9] transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.imgPath} alt={m.handle} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = `https://unavatar.io/instagram/${username}?fallback=https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`; }} />
                    </div>
                    <h3 className="font-sans font-bold text-sm text-[#0F172A] group-hover:text-[#0EA5E9] transition-colors">{m.handle}</h3>
                    <div className="text-xs text-[#64748B] mt-2">{m.role}</div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values & Address */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
            {[
              { icon: "ti-tools", title: "Craft", desc: "We never compromise on quality." },
              { icon: "ti-bolt", title: "Innovation", desc: "We use the latest tools to give our clients an unfair advantage." },
              { icon: "ti-user-star", title: "Author-First", desc: "Your vision always leads. We execute." },
            ].map((v) => (
              <div key={v.title} className="reveal card-hover bg-[#F8FAFC] rounded-2xl p-8 border border-[#E2E8F0]">
                <i className={`ti ${v.icon} text-3xl text-[#0EA5E9]`} />
                <h3 className="font-serif text-2xl text-[#0F172A] mt-3">{v.title}</h3>
                <p className="text-[#64748B] mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center text-[#64748B] text-sm reveal border-t border-[#E2E8F0] pt-12 max-w-2xl mx-auto">
            <i className="ti ti-map-pin text-xl text-[#0EA5E9] mb-2 inline-block" />
            <br />
            108 W 13th St, Wilmington, DE 19801, USA 🇺🇸
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

export default AboutPage;
