import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Msg = { role: "bot" | "user"; text: string };

const KB = `Devoreq Technology and Publishing is an AI-powered eBook publishing and author services agency. Services include Ghostwriting (avg $5,500), Cover Design ($150–$2,000+), Publishing to 13 platforms ($500–$2,500), Times Square + USA marketing (from $1,200/day), Audiobook production ($2,000–$2,500), Comic design ($1,500+), Book trailers ($500–$1,500+), Author websites (standard + AI), Automations, Social media marketing, and eBook editing. Plans: Starter $999, Author $2,499, Professional $4,999 (most popular), Enterprise custom. Tagline: Where Stories Meet Technology.`;

function extractEmail(text: string): string | null {
  const match = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  return match ? match[0] : null;
}

function reply(input: string, interactionCount: number): string {
  const t = input.toLowerCase();
  
  if (/price|cost|budget|how much/.test(t)) return "Our plans start at $999 (Starter), $2,499 (Author), $4,999 (Professional) and Enterprise. What's your best email so a strategist can send you the full pricing deck?";
  if (/times square|billboard|marketing/.test(t)) return "Times Square billboards start at $1,200 per day. We also do USA-wide digital and PR. Could you share your email so we can send you our marketing case studies?";
  if (/ghost|writ/.test(t)) return "Ghostwriting is fully custom and NDA-protected (avg $5,500). What's your email address so we can schedule a free discovery call to discuss your book?";
  if (/audio/.test(t)) return "Audiobook production runs $2,000–$2,500. Drop your email here and we'll send you some audio samples!";
  if (/cover|design/.test(t)) return "Covers start at $150 up to $2,000+ for premium illustrated. If you leave your email, our design lead will reach out to you.";
  if (/platform|publish|amazon|kindle|kdp/.test(t)) return "We publish to all 13 major platforms (Amazon, Apple, B&N, etc). Share your email and we'll send you the full distribution list.";
  if (/website|ai/.test(t)) return "We build both standard and AI-integrated author websites. Can I get your email to send you our portfolio?";
  if (/hello|hi|hey/.test(t)) return "Hi! I'm the Devoreq Publishing Assistant. What kind of book project are you working on?";
  if (/book|call|discovery|contact/.test(t)) return "Wonderful. Please share your email address here and our team will reach out within 2 business hours.";
  
  if (interactionCount > 1) {
    return "I'd love to connect you with our senior publishing strategist to answer this properly. What is your best email address?";
  }
  
  return "That's an interesting question! What kind of publishing project are you working on right now?";
}
void KB;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm the Devoreq Publishing Assistant. What kind of book project do you have?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    const user = input.trim();
    setMsgs((m) => [...m, { role: "user", text: user }]);
    setInput("");
    
    // Check if user provided an email
    const email = extractEmail(user);
    if (email) {
      setTimeout(() => {
        setMsgs((m) => [...m, { role: "bot", text: "Got it! I've saved your email. Our team will reach out to you shortly. You can also track your project by checking your inbox for the client portal link!" }]);
      }, 500);

      // Save lead silently
      try {
        const conversationContext = msgs.map(m => `${m.role}: ${m.text}`).join(" | ");
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            name: "Chatbot Lead", 
            email: email, 
            interest: `Chat History: ${conversationContext} | Final Message: ${user}`, 
            source: "chatbot" 
          }),
        });
        await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + "/portal" } });
      } catch (err) {
        console.error("Chatbot lead error:", err);
      }
      return;
    }

    setInteractionCount(c => c + 1);
    setTimeout(() => setMsgs((m) => [...m, { role: "bot", text: reply(user, interactionCount) }]), 500);
  }

  const chatbotContent = (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Devoreq Assistant"
          className="fixed bottom-5 right-5 z-[9999] h-14 w-14 rounded-full bg-[#F8FAFC] border-2 border-[#38BDF8] text-[#38BDF8] text-2xl flex items-center justify-center shadow-xl pulse-glow"
        >
          <MessageSquare size={24} />
        </button>
      )}
      {open && (
        <div className="fixed bottom-5 right-5 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-2rem)] flex flex-col rounded-xl overflow-hidden bg-white border border-[#38BDF8]/40 shadow-2xl">
          <div className="bg-[#F8FAFC] text-[#0F172A] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
              <span className="text-sm font-semibold">Devoreq Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="flex items-center justify-center"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] text-sm px-3 py-2 rounded-lg ${m.role === "bot" ? "bg-white text-[#0F172A] border border-[#E2E8F0]" : "bg-[#F8FAFC] text-[#0F172A] ml-auto"}`}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="p-3 border-t bg-white flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about pricing, services..." className="flex-1 text-sm rounded-md border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:border-[#38BDF8]" />
            <button className="btn-gold px-3 py-2 text-sm">Send</button>
          </form>
        </div>
      )}
    </>
  );

  if (!mounted) return null;
  return createPortal(chatbotContent, document.body);
}
