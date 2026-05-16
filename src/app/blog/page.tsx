"use client";
import { SiteShell } from "@/components/SiteShell";
import { PageHeader, useReveal } from "@/components/Section";
import { BLOG_POSTS } from "@/lib/site";



function BlogPage() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <SiteShell>
      <div ref={ref}>
        <PageHeader title="The Devoreq Journal." subtitle="Publishing insights, craft notes, and stories from inside the agency." />
        <section className="bg-[#F8FAFC] py-16">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((p) => (
              <article key={p.title} className="reveal card-hover bg-white rounded-xl p-6 border border-[#E2E8F0]">
                <span className="inline-block text-[11px] uppercase tracking-wider bg-[#F8FAFC] text-[#0F172A] px-2 py-1 rounded">{p.cat}</span>
                <h3 className="mt-4 font-serif text-lg text-[#0F172A] leading-snug">{p.title}</h3>
                <p className="mt-2 text-[13px] text-[#64748B]">{p.excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-xs text-[#64748B]">
                  <span className="h-7 w-7 rounded-full bg-[#0EA5E9]/15 text-[#0F172A] grid place-items-center font-semibold">{p.initials}</span>
                  {p.author} · {p.read}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h3 className="font-serif text-3xl text-[#0EA5E9]">Enjoying this? Get weekly publishing tips from Devoreq.</h3>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="you@email.com" className="flex-1 rounded-md bg-white border border-[#E2E8F0] px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#38BDF8]" />
              <button className="btn-gold">Subscribe</button>
            </form>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

export default BlogPage;
