import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const dir = path.join(publicDir, 'slike');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Read all files
let media = [];
try {
  const files = fs.readdirSync(dir);
  media = files.filter(f => f.match(/\.(jpg|jpeg|png|gif|webp|mov|mp4|webm|avi|mkv)$/i));
} catch (e) {
  console.log('Error reading directory:', e.message);
}

// Write the JSON file into public so Netlify / Vite serves it statically
fs.writeFileSync(
  path.join(publicDir, 'media-list.json'),
  JSON.stringify(media)
);
console.log(`Generiran media-list.json sa ${media.length} medijskih fajlova.`);
