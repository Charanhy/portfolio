import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Project data from addProjects.js
const projects = [
  {
    name: "AI Resume and Job Matching System",
    images: [
      "/images/projects/ai-resume-matcher/1.jpg",
      "/images/projects/ai-resume-matcher/2.jpg",
      "/images/projects/ai-resume-matcher/3.jpg",
      "/images/projects/ai-resume-matcher/4.jpg"
    ]
  },
  {
    name: "Social Media Platform",
    images: [
      "/images/projects/social-media/1.jpg",
      "/images/projects/social-media/2.jpg",
      "/images/projects/social-media/3.jpg",
      "/images/projects/social-media/4.jpg"
    ]
  },
  {
    name: "Retro Maze Chase Game",
    images: [
      "/images/projects/maze-game/1.jpg"
    ]
  },
  {
    name: "Voice-Controlled Wheelchair",
    images: [
      "/images/projects/wheelchair/1.jpg",
      "/images/projects/wheelchair/2.jpg",
      "/images/projects/wheelchair/3.jpg"
    ]
  },
  {
    name: "Secure RTOS-Based Military Vehicle",
    images: [
      "/images/projects/military-vehicle/1.jpg"
    ]
  }
];

// Certificate data from addCertificates.js
const certificates = [
  {
    name: "Java Programming",
    image: "/images/certificates/java-udemy.jpg"
  },
  {
    name: "Data Analytics Essential",
    image: "/images/certificates/cisco-data-analytics.jpg"
  },
  {
    name: "Introduction to Cloud",
    image: "/images/certificates/ibm-cloud.jpg"
  }
];

// Function to check if a file exists
function checkFileExists(filePath) {
  const fullPath = path.join(projectRoot, 'public', filePath);
  return fs.existsSync(fullPath);
}

// Check project images
console.log('\n🔍 Checking project images...');
let allImagesExist = true;

projects.forEach(project => {
  console.log(`\n📂 Project: ${project.name}`);
  
  project.images.forEach(imgPath => {
    const exists = checkFileExists(imgPath);
    console.log(`   ${exists ? '✅' : '❌'} ${imgPath}`);
    if (!exists) allImagesExist = false;
  });
});

// Check certificate images
console.log('\n📜 Checking certificate images...');
certificates.forEach(cert => {
  const exists = checkFileExists(cert.image);
  console.log(`   ${exists ? '✅' : '❌'} ${cert.image} (${cert.name})`);
  if (!exists) allImagesExist = false;
});

// Final result
console.log('\n🎯 Check complete!');
if (allImagesExist) {
  console.log('✅ All images are in place!');
  console.log('You can now run: node addProjects.js && node addCertificates.js');
} else {
  console.log('❌ Some images are missing. Please check the paths above.');
  console.log('Make sure all images are in the correct directories before running the scripts.');
}

// Create a sample directory structure
console.log('\n📁 Expected directory structure:');
console.log('public/');
console.log('├── images/');
console.log('│   ├── projects/');
console.log('│   │   ├── ai-resume-matcher/');
console.log('│   │   │   ├── 1.jpg');
console.log('│   │   │   ├── 2.jpg');
console.log('│   │   │   ├── 3.jpg');
console.log('│   │   │   └── 4.jpg');
console.log('│   │   ├── social-media/');
console.log('│   │   │   ├── 1.jpg');
console.log('│   │   │   ├── 2.jpg');
console.log('│   │   │   ├── 3.jpg');
console.log('│   │   │   └── 4.jpg');
console.log('│   │   ├── maze-game/');
console.log('│   │   │   └── 1.jpg');
console.log('│   │   ├── wheelchair/');
console.log('│   │   │   ├── 1.jpg');
console.log('│   │   │   ├── 2.jpg');
console.log('│   │   │   └── 3.jpg');
console.log('│   │   └── military-vehicle/');
console.log('│   │       └── 1.jpg');
console.log('│   └── certificates/');
console.log('│       ├── java-udemy.jpg');
console.log('│       ├── cisco-data-analytics.jpg');
console.log('│       └── ibm-cloud.jpg');
