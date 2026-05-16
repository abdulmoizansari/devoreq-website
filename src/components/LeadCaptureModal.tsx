"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/site";
import { supabase } from "@/lib/supabase";

export function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only trigger once per session
    if (hasTriggered) return;

    // Trigger 1: Time delay (8 seconds)
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasTriggered(true);
    }, 8000);

    // Trigger 2: Scroll depth (40%)
    const handleScroll = () => {
      if (hasTriggered) return;
      const scrollDepth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollDepth > 0.4) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    // Trigger 3: Exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered) return;
      if (e.clientY <= 0) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener("openLeadModal", handleOpenModal);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("openLeadModal", handleOpenModal);
    };
  }, [hasTriggered]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 1. Capture the lead in our DB
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "hero-popup" }),
      });

      // 2. Auth the user via Magic Link (creates account if new)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + "/portal",
        }
      });

      if (error) throw error;
      
      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 3000);
      
    } catch (err) {
      console.error("Lead capture error:", err);
      setStatus("idle");
      // Even if auth fails (e.g. Supabase misconfig), we close it
      setIsOpen(false);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/portal",
      }
    });
  };

  const modalContent = (
    <>
      <AnimatePresence>
        {isOpen && mounted && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4" style={{ position: 'fixed' }}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E2E8F0]"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              <i className="ti ti-x text-xl" />
            </button>

            {/* Header Content */}
            <div className="p-8 text-center border-b border-[#E2E8F0] bg-gradient-to-b from-[#F8FAFC] to-white">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] mb-4">
                <i className="ti ti-book-2 text-2xl" />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#0EA5E9] font-bold mb-2">Free Premium Resource</div>
              <h3 className="font-serif text-2xl text-[#0F172A] mb-2">The Complete Author Blueprint</h3>
              <p className="text-sm text-[#64748B] max-w-[280px] mx-auto">
                Discover the exact frameworks we use to launch best-selling publishing brands.
              </p>
            </div>

            {/* Form & Auth */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] transition-all text-sm"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] transition-all text-sm"
                  />
                </div>
                <button disabled={status !== "idle"} type="submit" className="w-full btn-gold justify-center mt-2 relative overflow-hidden">
                  {status === "loading" ? "Processing..." : status === "success" ? "Check Your Email!" : "Unlock Free Access"}
                </button>
              </form>

              <div className="mt-6 flex items-center gap-4">
                <div className="h-px bg-[#E2E8F0] flex-1" />
                <span className="text-xs text-[#64748B] uppercase tracking-wider font-medium">Or</span>
                <div className="h-px bg-[#E2E8F0] flex-1" />
              </div>

              <button 
                onClick={handleGoogleLogin}
                className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] transition-colors text-sm font-medium"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>
            
            <div className="bg-[#F8FAFC] py-3 text-center border-t border-[#E2E8F0]">
              <p className="text-[11px] text-[#64748B]">We protect your privacy. No spam, ever.</p>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && hasTriggered && mounted && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 left-8 z-[9999] btn-gold shadow-2xl"
          >
            <i className="ti ti-book-download text-xl" />
            <span className="hidden sm:inline font-semibold">Get Free Ebook</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}
