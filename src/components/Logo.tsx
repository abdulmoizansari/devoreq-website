import Image from "next/image";
import logo from "@/assets/logo.jpg";

export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  // The provided artwork is a square logo on dark navy. We render it framed; on light contexts the text label is added separately.
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image src={logo} alt="Devoreq Technology and Publishing logo" className="h-10 w-10 rounded-md object-cover ring-1 ring-white/10" />
      <div className="leading-tight">
        <div className={`font-bold tracking-wide text-sm ${variant === "light" ? "text-[#0F172A]" : "text-[#0F172A]"}`}>DEVOREQ</div>
        <div className={`text-[10px] tracking-[0.25em] ${variant === "light" ? "text-[#64748B]" : "text-[#64748B]"}`}>TECHNOLOGY</div>
      </div>
    </div>
  );
}
