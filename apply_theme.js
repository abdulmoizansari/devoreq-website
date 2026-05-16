const fs = require('fs');
const path = require('path');

const replaceColors = (f) => {
  let c = fs.readFileSync(f, 'utf8');

  // Replace backgrounds
  c = c.replace(/bg-\[#0d0d1a\]/g, 'bg-[#F8FAFC]');
  c = c.replace(/bg-\[#0a0a0f\]/g, 'bg-[#F8FAFC]');
  c = c.replace(/bg-\[#050508\]/g, 'bg-[#F8FAFC]');
  c = c.replace(/bg-\[#11111e\]/g, 'bg-[#FFFFFF]');
  c = c.replace(/bg-\[#1a1a2e\]/g, 'bg-[#F8FAFC]');
  c = c.replace(/bg-\[#f8f7f4\]/g, 'bg-[#F8FAFC]');
  c = c.replace(/bg-white\/5/g, 'bg-white');
  c = c.replace(/bg-white\/\[0\.02\]/g, 'bg-white');

  // Replace text colors
  c = c.replace(/text-white\/60/g, 'text-[#64748B]');
  c = c.replace(/text-white\/65/g, 'text-[#64748B]');
  c = c.replace(/text-white\/55/g, 'text-[#64748B]');
  c = c.replace(/text-white\/50/g, 'text-[#64748B]');
  c = c.replace(/text-white\/40/g, 'text-[#64748B]');
  c = c.replace(/text-white\/75/g, 'text-[#0F172A]');
  c = c.replace(/text-white\/\[0\.06\]/g, 'text-[#0EA5E9]/10');
  c = c.replace(/text-white/g, 'text-[#0F172A]');
  
  c = c.replace(/text-\[#0d0d1a\]/g, 'text-[#0F172A]');
  c = c.replace(/text-\[#6b6b8a\]/g, 'text-[#64748B]');
  c = c.replace(/text-\[#3b3b54\]/g, 'text-[#64748B]');

  // Replace Gold (#c9a84c) with Primary Brand Blue (#0EA5E9)
  c = c.replace(/#c9a84c/g, '#0EA5E9');

  // Replace Teal (#00c8ff) with Secondary Accent (#38BDF8)
  c = c.replace(/#00c8ff/g, '#38BDF8');

  // Replace Borders
  c = c.replace(/border-white\/10/g, 'border-[#E2E8F0]');
  c = c.replace(/border-white\/20/g, 'border-[#E2E8F0]');
  c = c.replace(/border-black\/5/g, 'border-[#E2E8F0]');
  c = c.replace(/border-black\/\[0\.04\]/g, 'border-[#E2E8F0]');
  c = c.replace(/border-black\/10/g, 'border-[#E2E8F0]');
  
  // Replace glows and gradients
  c = c.replace(/from-\[#0a0a0f\]\/40/g, 'from-[#F8FAFC]/40');
  c = c.replace(/to-\[#0a0a0f\]/g, 'to-[#F8FAFC]');
  c = c.replace(/from-\[#050508\]\/40/g, 'from-[#F8FAFC]/40');
  c = c.replace(/to-\[#050508\]/g, 'to-[#F8FAFC]');
  c = c.replace(/from-\[#0d0d1a\]/g, 'from-[#F8FAFC]');
  c = c.replace(/via-transparent/g, 'via-transparent'); // keep
  c = c.replace(/bg-black\/90/g, 'bg-[#F8FAFC]/90');
  c = c.replace(/bg-black\/95/g, 'bg-[#F8FAFC]/95');
  c = c.replace(/bg-\[#050508\]\/95/g, 'bg-[#F8FAFC]/95');

  fs.writeFileSync(f, c);
};

const walk = (dir) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((i) => {
    const p = path.join(dir, i.name);
    if (i.isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.css')) {
      replaceColors(p);
    }
  });
};

walk('e:/Devoreq Publishing/devoreq-website/src');
