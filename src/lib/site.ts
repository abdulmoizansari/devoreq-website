export const BRAND = {
  name: "Devoreq Technology and Publishing",
  short: "Devoreq",
  tagline: "Where Stories Meet Technology.",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export const HERO_STATS = [
  { value: "2,400+", label: "eBooks Published" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "60+", label: "Countries Served" },
  { value: "12", label: "Years of Excellence" },
];

export const SERVICE_STRIP = [
  { icon: "ti-feather", label: "Ghostwriting" },
  { icon: "ti-palette", label: "Cover Design" },
  { icon: "ti-book-2", label: "Publishing" },
  { icon: "ti-speakerphone", label: "Marketing" },
  { icon: "ti-headphones", label: "Audiobook" },
  { icon: "ti-brush", label: "Comic Design" },
  { icon: "ti-movie", label: "Book Trailer" },
  { icon: "ti-code", label: "Web Development" },
];

export type Service = {
  slug: string;
  name: string;
  category: "Writing" | "Design" | "Publishing" | "Marketing" | "Tech";
  short: string;
  description: string;
  included: string[];
  price: string;
  priceNote?: string;
  accent: "purple" | "teal" | "gold";
};

export const SERVICES: Service[] = [
  {
    slug: "ghostwriting", name: "Ghostwriting", category: "Writing", accent: "purple",
    short: "Turn your ideas into professionally written books.",
    description: "Turn your ideas into professionally written books crafted to match your voice, audience, and publishing goals.",
    included: ["Discovery consultation", "Voice & tone matching", "Genre-focused writers", "Chapter-by-chapter delivery", "Editing & proofreading", "NDA & confidentiality agreement"],
    price: "Starting at $2,500",
  },
  {
    slug: "ebook-editing", name: "eBook Editing", category: "Writing", accent: "teal",
    short: "Professional editing to strengthen clarity and flow.",
    description: "Professional editing designed to strengthen clarity, flow, readability, structure, and overall publishing quality.",
    included: ["Developmental editing", "Line & copy editing", "Proofreading", "Tracked revisions", "Final manuscript polish"],
    price: "Starting at $399",
  },
  {
    slug: "author-biography", name: "Author Biography & Branding Copy", category: "Writing", accent: "gold",
    short: "Professional author bios and branding content.",
    description: "Professional author bios, media kit copy, Amazon author pages, and branding content designed to build trust and authority.",
    included: ["Short & long author bios", "Media kit copy", "Amazon Author Central setup", "Press release templates", "Branding positioning"],
    price: "Starting at $299",
  },
  {
    slug: "cover-design", name: "Custom Cover Design", category: "Design", accent: "purple",
    short: "Professionally designed covers crafted to compete.",
    description: "Professionally designed covers crafted to compete in today's publishing market while matching your genre and audience expectations.",
    included: ["Custom cover concepts", "Paperback wrap design", "Hardcover support", "3D marketing mockups", "Print-ready delivery"],
    price: "Starting at $149",
  },
  {
    slug: "interior-formatting", name: "Interior Formatting & Typography", category: "Design", accent: "teal",
    short: "Clean, professional formatting optimized for all platforms.",
    description: "Clean, professional formatting optimized for Kindle, paperback, hardcover, and major publishing platforms.",
    included: ["eBook formatting", "Paperback formatting", "Chapter styling", "EPUB & PDF exports", "Platform optimization"],
    price: "Starting at $199",
  },
  {
    slug: "comic-editing", name: "Comic Book Editing & Visual Story", category: "Design", accent: "gold",
    short: "Professional editing for visual storytelling projects.",
    description: "Professional editing for comics, manga, graphic novels, and visual storytelling projects.",
    included: ["Story structure review", "Dialogue refinement", "Panel pacing optimization", "Character consistency editing", "Script formatting for artists", "Continuity checks"],
    price: "Starting at $599",
  },
  {
    slug: "comic-illustration", name: "Comic Illustration & Production", category: "Design", accent: "purple",
    short: "Fully illustrated comics, manga, and graphic storytelling.",
    description: "Fully illustrated comics, manga, and graphic storytelling built for digital and print publishing.",
    included: ["Character design", "Storyboarding", "Full-color illustration", "Professional lettering", "Cover design", "Print & digital exports"],
    price: "Starting at $1,999",
  },
  {
    slug: "publishing", name: "Publishing on Major Platforms", category: "Publishing", accent: "teal",
    short: "Professional publishing and distribution setup.",
    description: "Professional publishing and distribution setup across the world's leading publishing platforms including Amazon KDP, Barnes & Noble Press, Apple Books, Kobo, Google Play Books, Draft2Digital, and IngramSpark.",
    included: ["Publishing setup", "Metadata optimization", "Keyword research", "ISBN guidance", "Pricing strategy", "File uploads & validation"],
    price: "Starting at $399",
  },
  {
    slug: "pod-setup", name: "Global Print-On-Demand Setup", category: "Publishing", accent: "gold",
    short: "Expand your reach with professional print-on-demand setup.",
    description: "Expand your reach with professional print-on-demand setup for global bookstores, libraries, and online retailers.",
    included: ["KDP Print setup", "IngramSpark setup", "Wholesale pricing strategy", "Print validation", "Global distribution setup"],
    price: "Starting at $299",
  },
  {
    slug: "audiobook", name: "Audiobook Production", category: "Publishing", accent: "purple",
    short: "Professional audiobook production optimized for all platforms.",
    description: "Professional audiobook production optimized for Audible, ACX, and major listening platforms.",
    included: ["Human narration", "Audio mastering", "Chapter markers", "Audible-ready exports", "ACX optimization"],
    price: "Starting at $1,299",
  },
  {
    slug: "book-trailer", name: "Book Video Trailer", category: "Marketing", accent: "teal",
    short: "Cinematic promotional trailers designed for launches.",
    description: "Cinematic promotional trailers designed for launches, Amazon pages, social media campaigns, and paid advertising.",
    included: ["Scriptwriting", "Motion graphics", "Voiceover", "Licensed music", "Multi-format delivery"],
    price: "Starting at $349",
  },
  {
    slug: "social-media", name: "Social Media Marketing", category: "Marketing", accent: "gold",
    short: "Content strategy and audience growth systems.",
    description: "Content strategy and audience growth systems built specifically for authors and publishing brands.",
    included: ["Content planning", "Reels & graphics", "Scheduling & posting", "Community engagement", "Monthly reporting"],
    price: "Starting at $399/month",
  },
  {
    slug: "premium-campaigns", name: "Premium Campaigns", category: "Marketing", accent: "purple",
    short: "High-visibility campaigns designed to maximize exposure.",
    description: "High-visibility campaigns designed to maximize exposure, audience reach, and brand awareness.",
    included: ["Times Square billboard placement", "USA-wide digital campaigns", "Amazon Ads management", "Influencer outreach", "Podcast sponsorships", "PR campaigns"],
    price: "Custom Pricing Available",
  },
  {
    slug: "author-website", name: "Standard Author Website", category: "Tech", accent: "teal",
    short: "A clean, modern website to showcase your books.",
    description: "A clean, modern website designed to showcase your books, story, and professional author presence.",
    included: ["Mobile-responsive design", "Book showcase", "Author bio section", "Contact form", "Newsletter integration", "Blog setup"],
    price: "Starting at $699",
  },
  {
    slug: "ai-author-website", name: "AI-Powered Author Website", category: "Tech", accent: "gold",
    short: "Advanced author platforms powered by AI.",
    description: "Advanced author platforms powered by automation, AI tools, and audience engagement systems.",
    included: ["AI chatbot integration", "Personalized recommendations", "Email automation", "Analytics dashboard", "Reader engagement tools", "CMS integration"],
    price: "Starting at $2,499",
  },
  {
    slug: "automations", name: "Automation Systems", category: "Tech", accent: "purple",
    short: "Custom automations to streamline your business.",
    description: "Custom automations designed to streamline marketing, launch campaigns, email systems, and audience management.",
    included: ["Email automation", "Launch sequences", "Reader funnels", "CRM integrations", "Marketing workflows"],
    price: "Starting at $499",
  }
];

export const PROCESS = [
  { n: "01", title: "Discovery Call", desc: "We learn your vision, goals, and genre." },
  { n: "02", title: "Strategy & Brief", desc: "We build your publishing roadmap." },
  { n: "03", title: "Creation & Review", desc: "Our experts craft and refine every detail." },
  { n: "04", title: "Launch & Market", desc: "We publish and promote your work globally." },
];

export const TESTIMONIALS = [
  { quote: "Devoreq turned my notes into a #1 launch on Amazon. They handled everything, writing, cover, marketing.", name: "Amelia Brooks", role: "Memoir Author", country: "United Kingdom" },
  { quote: "The Times Square campaign sold out my first print run in 11 days. I have never felt so supported by a team.", name: "Marcus Okafor", role: "Business Author", country: "United States" },
  { quote: "Their AI tools and human craft are an unfair advantage. I would not publish a single book without them.", name: "Sofia Hernández", role: "Children's Author", country: "Spain" },
  { quote: "From ghostwriter to audiobook narrator, every person on the team is world class.", name: "Rahul Mehta", role: "Self-Help Author", country: "India" },
  { quote: "Beautiful covers. Faultless distribution. Honest feedback. I cannot recommend them enough.", name: "Clara Yamamoto", role: "Literary Fiction", country: "Japan" },
  { quote: "They publish to platforms I had never heard of, and my royalty checks doubled.", name: "Daniel Schmidt", role: "Thriller Author", country: "Germany" },
];

export const STATS_BANNER = [
  { target: 2400, suffix: "+", label: "eBooks Published" },
  { target: 150, suffix: "+", label: "Authors Served" },
  { target: 13, suffix: "", label: "Platforms We Publish To" },
  { target: 98, suffix: "%", label: "Satisfaction Rate" },
];

export const BLOG_POSTS = [
  { cat: "Marketing", title: "Why a Times Square Billboard Sells More Books Than You Think", excerpt: "The most viewed advertising location on earth is changing how indie authors launch. Here is why.", author: "Editorial Team", initials: "ET", read: "6 min" },
  { cat: "Writing", title: "How AI Tools Are Quietly Reshaping the Ghostwriting Industry", excerpt: "Ghostwriting is more in demand than ever. The smartest authors are leaning into hybrid workflows.", author: "Lena Park", initials: "LP", read: "8 min" },
  { cat: "Publishing", title: "A Practical Guide to Publishing on All 13 Major Platforms", excerpt: "Beyond Amazon: a checklist for going truly global with your eBook, paperback, and audiobook.", author: "James Hale", initials: "JH", read: "10 min" },
  { cat: "Design", title: "What Makes a Cover Sell: 7 Patterns We Have Learned in 12 Years", excerpt: "Typography, contrast, and silhouette. A look inside the design choices that move readers to click.", author: "Mara Iqbal", initials: "MI", read: "7 min" },
  { cat: "Audiobook", title: "Choosing the Right Narrator for Your Audiobook", excerpt: "Voice is identity. Here is how we cast narrators that match every author's tone.", author: "Editorial Team", initials: "ET", read: "5 min" },
  { cat: "Business", title: "Royalties Demystified: A Plain-English Guide for New Authors", excerpt: "What you actually take home from Amazon, Apple, Kobo, and the rest, explained without jargon.", author: "James Hale", initials: "JH", read: "9 min" },
];

export const PRICING_PLANS = [
  {
    name: "Starter", price: 599, popular: false,
    desc: "Perfect for first-time authors.",
    features: ["Professional eBook formatting", "Standard custom cover design", "Amazon KDP publishing setup", "Publishing to up to 3 platforms", "Metadata optimization", "ISBN guidance", "Basic 3D mockups", "1 revision round", "Email support"],
  },
  {
    name: "Author", price: 1499, popular: true,
    desc: "Built for serious indie authors.",
    features: ["Premium custom cover design", "eBook + paperback formatting", "Publishing to up to 8 platforms", "Author bio & branding copy", "Amazon keyword optimization", "Social media launch kit", "Basic book trailer", "2 revision rounds", "Priority support"],
  },
  {
    name: "Professional", price: 2999, popular: false,
    desc: "Complete publishing & branding solution.",
    features: ["Everything in Author", "Advanced editing support", "Premium cover design", "Hardcover formatting", "Publishing on all major platforms", "Audiobook production guidance", "Cinematic book trailer", "2 weeks social media marketing", "Professional author website", "Email capture integration", "Launch consultation", "Priority revisions"],
  },
  {
    name: "Enterprise", price: null as null | number, popular: false,
    desc: "Fully customized publishing ecosystem.",
    features: ["Everything in Professional", "Full ghostwriting projects", "AI-powered author website", "Marketing automations", "Advanced funnel systems", "Dedicated project manager", "Ongoing social media management", "Amazon Ads management", "PR & influencer outreach", "National marketing campaigns", "Long-term growth strategy"],
  },
];

export const PORTFOLIO = [
  { title: "The Quiet Algorithm", author: "Adrian Cole", genre: "Fiction", tags: ["Written", "Designed", "Published"] },
  { title: "Burn the Blueprint", author: "Renee Kapoor", genre: "Business", tags: ["Designed", "Published", "Marketed"] },
  { title: "Soft Storms", author: "Mira Ahn", genre: "Memoir", tags: ["Written", "Designed", "Published"] },
  { title: "The Lantern Keeper", author: "Yuki Tanaka", genre: "Children's", tags: ["Written", "Designed"] },
  { title: "Velocity Mindset", author: "Tom Reyes", genre: "Self-Help", tags: ["Designed", "Published"] },
  { title: "Iron & Ink", author: "Sasha Vega", genre: "Comic", tags: ["Designed", "Published"] },
  { title: "Lessons From the Lab", author: "Dr. Amari Osei", genre: "Academic", tags: ["Written", "Published"] },
  { title: "Paper Birds", author: "Ines Olivera", genre: "Fiction", tags: ["Written", "Designed", "Published", "Marketed"] },
  { title: "Founder's Compass", author: "Will Schmidt", genre: "Business", tags: ["Written", "Designed"] },
];

export const FAQS = [
  {
    group: "General Questions", items: [
      { q: "What is Devoreq Technology and Publishing?", a: "We are a premium AI-powered eBook publishing and author services agency. We handle ghostwriting, design, distribution, and marketing end to end." },
      { q: "Do you work with first-time authors?", a: "Absolutely. Most of our clients are first-time authors. We guide every step of the journey." },
    ],
  },
  {
    group: "Ghostwriting", items: [
      { q: "Who owns the rights to my book?", a: "You do. 100%. Our ghostwriters sign full NDAs and assign all rights to you." },
      { q: "How long does a typical ghostwriting project take?", a: "Between 6 and 16 weeks depending on length, genre, and complexity." },
    ],
  },
  {
    group: "Cover Design", items: [
      { q: "Can I request revisions?", a: "Yes. Each tier includes a defined number of revision rounds. Premium tier is unlimited until approval." },
      { q: "Do you provide print-ready files?", a: "Yes, full paperback wrap, hardcover case, and source PSD/AI files are included from Professional tier upward." },
    ],
  },
  {
    group: "Publishing", items: [
      { q: "Which platforms do you publish to?", a: "All 13: Amazon KDP, B&N Press, Apple Books, Kobo, Google Play Books, Smashwords, Draft2Digital, IngramSpark, Scribd, Lulu, Blurb, PublishDrive, StreetLib." },
      { q: "Do I need an ISBN?", a: "We procure ISBNs for you, or you can supply your own." },
    ],
  },
  {
    group: "Marketing", items: [
      { q: "How much does a Times Square campaign cost?", a: "From $1,200 per day. Multi-day packages reduce the per-day rate substantially." },
      { q: "Do you guarantee bestseller status?", a: "No reputable agency can. We do guarantee strategy, execution, and reporting at the highest standard." },
    ],
  },
  {
    group: "Pricing and Payments", items: [
      { q: "Do you offer payment plans?", a: "Yes, 50/50 and milestone-based plans are available on most engagements." },
      { q: "What currencies do you accept?", a: "USD, EUR, GBP, AUD, CAD, and INR." },
    ],
  },
  {
    group: "Timelines and Deadlines", items: [
      { q: "Can you rush a project?", a: "Yes. Rush delivery applies a clearly disclosed surcharge depending on scope." },
    ],
  },
  {
    group: "Revisions and Refunds", items: [
      { q: "What is your refund policy?", a: "We offer milestone-based refunds before work begins on the next phase. Details are in our Refund Policy." },
    ],
  },
];
