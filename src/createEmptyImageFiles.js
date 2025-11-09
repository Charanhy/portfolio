import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Function to create an empty file
function createEmptyFile(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    return true;
  }
  return false;
}

// Create project images
const projects = [
  { name: 'ai-resume-matcher', count: 4 },
  { name: 'social-media', count: 4 },
  { name: 'maze-game', count: 1 },
  { name: 'wheelchair', count: 3 },
  { name: 'military-vehicle', count: 1 },
];

// Create certificate images
const certificates = [
  'java-udemy.jpg',
  'cisco-data-analytics.jpg',
  'ibm-cloud.jpg'
];

console.log('📂 Creating project image files...');
projects.forEach(project => {
  for (let i = 1; i <= project.count; i++) {
    const filePath = path.join(projectRoot, 'public', 'images', 'projects', project.name, `${i}.jpg`);
    const created = createEmptyFile(filePath);
    console.log(`${created ? '✅ Created' : 'ℹ️  Exists'}: images/projects/${project.name}/${i}.jpg`);
  }
});

console.log('\n📜 Creating certificate image files...');
certificates.forEach(cert => {
  const filePath = path.join(projectRoot, 'public', 'images', 'certificates', cert);
  const created = createEmptyFile(filePath);
  console.log(`${created ? '✅ Created' : 'ℹ️  Exists'}: images/certificates/${cert}`);
});

console.log('\n🎉 All placeholder files have been created!');
console.log('\n⚠️  Note: These are empty files. Please replace them with your actual images.');
console.log('You can now run: node checkImages.js');
