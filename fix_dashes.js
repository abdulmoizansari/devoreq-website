const fs = require('fs');
const path = require('path');

const replace = (f) => {
  let c = fs.readFileSync(f, 'utf8');
  if (f.includes('pricing\\page.tsx') || f.includes('pricing/page.tsx')) {
    c = c.replace(/"—"/g, '"-"');
    c = c.replace(/Yes —/g, 'Yes,');
  } else if (f.includes('about\\page.tsx') || f.includes('about/page.tsx')) {
    c = c.replace(/2012 — 2025/g, '2012 till Now');
    c = c.replace(/talent — not access — decides/g, 'talent, not access, decides');
    c = c.replace(/readers — with/g, 'readers, with');
  } else {
    c = c.replace(/ — /g, ', ');
    c = c.replace(/—/g, ',');
  }
  fs.writeFileSync(f, c);
};

const walk = (dir) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((i) => {
    const p = path.join(dir, i.name);
    if (i.isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      replace(p);
    }
  });
};

walk('e:/Devoreq Publishing/devoreq-website/src');
