import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Function to create a simple placeholder image
function createPlaceholderImage(filePath, text, width = 800, height = 600) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, width, height);
  
  // Border
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 5;
  ctx.strokeRect(5, 5, width - 10, height - 10);
  
  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Split text into multiple lines if needed
  const lines = text.split('\n');
  const lineHeight = 35;
  const startY = (height - (lines.length * lineHeight)) / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + (index * lineHeight));
  });
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);
}

// Create directories and placeholder images
function setupPlaceholderImages() {
  // Project images
  const projects = [
    { name: 'ai-resume-matcher', count: 4, text: 'AI Resume Matcher\nScreenshot {n}' },
    { name: 'social-media', count: 4, text: 'Social Media App\nScreenshot {n}' },
    { name: 'maze-game', count: 1, text: 'Maze Game\nScreenshot' },
    { name: 'wheelchair', count: 3, text: 'Wheelchair Project\nScreenshot {n}' },
    { name: 'military-vehicle', count: 1, text: 'Military Vehicle\nScreenshot' },
  ];

  // Certificate images
  const certificates = [
    { name: 'java-udemy.jpg', text: 'Java Programming\nUdemy' },
    { name: 'cisco-data-analytics.jpg', text: 'Data Analytics\nCisco' },
    { name: 'ibm-cloud.jpg', text: 'Cloud Computing\nIBM' },
  ];

  // Create project images
  projects.forEach(project => {
    const dir = path.join(projectRoot, 'public', 'images', 'projects', project.name);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    for (let i = 1; i <= project.count; i++) {
      const fileName = `${i}.jpg`;
      const filePath = path.join(dir, fileName);
      const text = project.text.replace('{n}', i);
      
      if (!fs.existsSync(filePath)) {
        createPlaceholderImage(filePath, text, 1200, 800);
        console.log(`✅ Created: images/projects/${project.name}/${fileName}`);
      } else {
        console.log(`ℹ️  Exists: images/projects/${project.name}/${fileName}`);
      }
    }
  });

  // Create certificates directory if it doesn't exist
  const certDir = path.join(projectRoot, 'public', 'images', 'certificates');
  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir, { recursive: true });
  }

  // Create certificate images
  certificates.forEach(cert => {
    const filePath = path.join(certDir, cert.name);
    if (!fs.existsSync(filePath)) {
      createPlaceholderImage(filePath, cert.text, 850, 600);
      console.log(`✅ Created: images/certificates/${cert.name}`);
    } else {
      console.log(`ℹ️  Exists: images/certificates/${cert.name}`);
    }
  });

  console.log('\n🎉 All placeholder images have been created!');
  console.log('You can now run: node checkImages.js');
}

// Run the setup
setupPlaceholderImages();
