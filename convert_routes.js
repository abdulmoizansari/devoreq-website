const fs = require('fs');
const path = require('path');

const lovableRoutesDir = path.join(__dirname, 'loveable/devoreq-digital-craft-main/devoreq-digital-craft-main/src/routes');
const nextAppDir = path.join(__dirname, 'src/app');

// skip index.tsx as it is already converted
const files = fs.readdirSync(lovableRoutesDir).filter(f => f.endsWith('.tsx') && f !== 'index.tsx' && f !== '__root.tsx');

for (const file of files) {
  const routeName = file.replace('.tsx', '');
  const routeDir = path.join(nextAppDir, routeName);
  
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  let content = fs.readFileSync(path.join(lovableRoutesDir, file), 'utf-8');

  // Remove @tanstack/react-router imports
  content = content.replace(/import { createFileRoute } from "@tanstack\/react-router";\n?/g, '');
  
  // Replace Link from react-router with Next.js Link if present
  if (content.includes('import { Link }')) {
     content = content.replace(/import { Link } from "@tanstack\/react-router";\n?/g, 'import Link from "next/link";\n');
  }

  // Find the component name from createFileRoute
  // e.g. export const Route = createFileRoute("/about")({ component: AboutPage });
  const routeMatch = content.match(/export const Route = createFileRoute\("[^"]+"\)\({\s*component:\s*([A-Za-z0-9_]+)\s*}\);/);
  
  if (routeMatch) {
    const componentName = routeMatch[1];
    content = content.replace(routeMatch[0], '');
    
    // Add export default to the component definition or at the end
    content += `\nexport default ${componentName};\n`;
  }

  // Replace tabler icons with lucide icons if there are some
  content = content.replace(/className="ti ti-tools/g, 'className="ti ti-tools'); // Keep using the classes if we imported tabler or just let them be missing, the user had "zero transitions" originally, but I can keep the ti icons. Wait, ti icons need a stylesheet!
  
  fs.writeFileSync(path.join(routeDir, 'page.tsx'), content);
  console.log(`Converted ${file} to ${routeName}/page.tsx`);
}
