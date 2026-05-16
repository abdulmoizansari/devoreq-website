const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const publicDir = path.resolve('public');
const portfolioDir = path.join(publicDir, 'portfolio');
const sourceVideosDir = path.resolve('./Portfolio/Vedios');
const destVideosDir = path.join(portfolioDir, 'videos');

// Ensure destination video directory exists
if (!fs.existsSync(destVideosDir)) {
  fs.mkdirSync(destVideosDir, { recursive: true });
}

// Copy videos if they exist
if (fs.existsSync(sourceVideosDir)) {
  const vids = fs.readdirSync(sourceVideosDir);
  for (const vid of vids) {
    if (vid.endsWith('.mp4') || vid.endsWith('.webm')) {
      fs.copyFileSync(path.join(sourceVideosDir, vid), path.join(destVideosDir, vid));
    }
  }
}

let items = [];
let seenHashes = new Set();

function getHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      walk(path.join(dir, file.name));
    } else if (file.isFile() && /\.(png|jpe?g|webp|gif|svg|mp4|webm)$/i.test(file.name)) {
      const fullPath = path.join(dir, file.name);
      
      const hash = getHash(fullPath);
      if (seenHashes.has(hash)) {
        console.log("Found duplicate, skipping: " + file.name);
        // Optionally, we could delete the duplicate file: fs.unlinkSync(fullPath);
        continue;
      }
      seenHashes.add(hash);
      
      // Calculate relative path from public directory
      let relPath = fullPath.substring(publicDir.length).replace(/\\/g, '/');
      if (!relPath.startsWith('/')) relPath = '/' + relPath;
      
      items.push({ path: relPath, isVideo: /\.(mp4|webm)$/i.test(file.name) });
    }
  }
}

walk(portfolioDir);

// Sort: Behance folders first ("good ones"), then everything else
items.sort((a, b) => {
  const aGood = a.path.toLowerCase().includes('behance');
  const bGood = b.path.toLowerCase().includes('behance');
  if (aGood && !bGood) return -1;
  if (!aGood && bGood) return 1;
  // If both good or both normal, sort alphabetically
  return a.path.localeCompare(b.path);
});

// Create new file content. For backwards compatibility with string array, we can just export an array of strings,
// but since we need to render videos differently, maybe we should export an array of objects.
// Wait, the user already uses PORTFOLIO_IMAGES as an array of strings. 
// If we change it to strings, we can just check if string ends with .mp4 in the page.tsx!

const content = `export const PORTFOLIO_IMAGES = [
${items.map(i => `  "${i.path}"`).join(',\n')}
];
`;

fs.writeFileSync(path.resolve('src/lib/portfolioData.ts'), content);
console.log(`Successfully generated portfolioData.ts with ${items.length} unique items.`);
