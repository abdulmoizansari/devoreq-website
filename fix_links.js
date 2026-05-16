const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('page.tsx')) results.push(file);
    }
  });
  return results;
}

const nextAppDir = path.join(__dirname, 'src/app');
const pages = walk(nextAppDir);

for (const file of pages) {
  if (file.includes('page.tsx') && !file.endsWith('app\\page.tsx') && !file.endsWith('app/page.tsx')) {
    let content = fs.readFileSync(file, 'utf-8');

    // Remove any remaining @tanstack/react-router
    content = content.replace(/import\s+{.*}\s+from\s+["']@tanstack\/react-router["'];?\n?/g, '');
    
    // Check if next/link is already imported
    if (!content.includes('import Link from "next/link"')) {
      if (content.includes('<Link ')) {
         content = content.replace(/"use client";\n/g, '"use client";\nimport Link from "next/link";\n');
      }
    }

    // Replace Link to with Link href
    content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');
    
    // Replace React Router Link active class logic if it exists (usually needs usePathname, but for now just remove the active logic)
    // Actually, in subpages the Links usually don't have active logic unless it's in Navbar.

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
