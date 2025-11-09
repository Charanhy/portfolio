import { db, collection, addDoc } from './firebase.js';

const addProjects = async () => {
  const projects = [
    {
      title: "AI Resume and Job Matching System",
      description: "An intelligent system that leverages Large Language Models (LLMs) to analyze and match resumes with job descriptions. The application uses semantic similarity to rank candidates based on their skills, experience, and qualifications. Built with Python, Streamlit, and ChromaDB, it provides an intuitive interface for recruiters to find the best candidates efficiently.",
      mainImage: "/images/projects/ai-resume-matcher/1.jpg",
      images: [
        "/images/projects/ai-resume-matcher/1.jpg",
        "/images/projects/ai-resume-matcher/2.jpg",
        "/images/projects/ai-resume-matcher/3.jpg",
        "/images/projects/ai-resume-matcher/4.jpg"
      ],
      link: "https://github.com/Charanhy/Ai_Resume-And-Job-Matcher",
      techStack: ["Python", "Streamlit", "LLM", "ChromaDB", "NLP", "Hugging Face", "Pandas", "NLTK"],
      github: "https://github.com/Charanhy/Ai_Resume-And-Job-Matcher",
      demo: "#",
      features: [
        "Resume parsing and information extraction",
        "Job description analysis and keyword extraction",
        "Semantic matching using sentence transformers",
        "Interactive web interface with Streamlit",
        "Vector database for efficient similarity search"
      ]
    },
    {
      title: "Social Media Platform",
      description: "A full-stack social networking application built with Java, Swing, and MySQL. The platform includes user authentication, profile management, post creation, comments, likes, and friend requests. The application follows MVC architecture and implements secure password hashing for user authentication.",
      mainImage: "/images/projects/social-media/1.jpg",
      images: [
        "/images/projects/social-media/1.jpg",
        "/images/projects/social-media/2.jpg",
        "/images/projects/social-media/3.jpg",
        "/images/projects/social-media/4.jpg"
      ],
      link: "https://github.com/charanhy/social-media-platform",
      techStack: ["Java", "Swing", "MySQL", "MVC", "JDBC", "Swing"],
      github: "https://github.com/charanhy/social-media-platform",
      demo: "#",
      features: [
        "User registration and authentication",
        "Create, edit, and delete posts",
        "Comment on posts and like functionality",
        "Friend request system",
        "Real-time notifications"
      ]
    },
    {
      title: "Retro Maze Chase Game",
      description: "A Pac-Man inspired arcade game developed using Java Swing. The game features multiple levels, different types of ghosts with unique AI behaviors, power-ups, and a scoring system. The project demonstrates object-oriented programming principles, game loop implementation, and collision detection.",
      mainImage: "/images/projects/maze-game/1.jpg",
      images: [
        "/images/projects/maze-game/1.jpg",
        "/images/projects/maze-game/2.jpg"
      ],
      link: "https://github.com/charanhy/java_project/tree/main/pac_man_style_game",
      techStack: ["Java", "Swing", "Game Development", "Object-Oriented Programming"],
      github: "https://github.com/charanhy/java_project/tree/main/pac_man_style_game",
      demo: "#",
      features: [
        "Multiple levels with increasing difficulty",
        "Different ghost behaviors (chase, scatter, frightened)",
        "Score tracking and high scores",
        "Sound effects and animations",
        "Pause and resume functionality"
      ]
    },
    {
      title: "Voice-Controlled Wheelchair",
      description: "An assistive technology project that enables individuals with mobility impairments to control a wheelchair using voice commands. The system uses an Arduino Uno, VC-02 voice recognition module, and L298N motor driver. It supports multiple voice commands for movement and includes safety features like obstacle detection.",
      mainImage: "/images/projects/wheelchair/1.jpg",
      images: [
        "/images/projects/wheelchair/1.jpg",
        "/images/projects/wheelchair/2.jpg",
        "/images/projects/wheelchair/3.jpg",
        "/images/projects/wheelchair/4.jpg"
      ],
      link: "#",
      techStack: ["Arduino", "Embedded C", "Voice Recognition", "Motor Control", "Ultrasonic Sensors"],
      github: "#",
      demo: "#",
      features: [
        "Voice command recognition in multiple languages",
        "Obstacle detection and collision avoidance",
        "Manual override with joystick control",
        "Battery level monitoring",
        "Emergency stop functionality"
      ]
    },
    {
      title: "Secure RTOS-Based Military Vehicle Communication",
      description: "A secure communication system designed for military vehicles using Real-Time Operating System (RTOS) on ESP32. The system implements MQTT over TLS for secure data transmission and CAN protocol for in-vehicle communication. It includes features like real-time monitoring, secure firmware updates, and encrypted data logging.",
      mainImage: "/images/projects/military-vehicle/1.jpg",
      images: [
        "/images/projects/military-vehicle/1.jpg",
        "/images/projects/military-vehicle/2.jpg"
      ],
      link: "#",
      techStack: ["RTOS", "ESP32", "MQTT", "TLS", "CAN Protocol", "IoT Security", "C/C++"],
      github: "#",
      demo: "#",
      features: [
        "Secure end-to-end encrypted communication",
        "Real-time vehicle telemetry monitoring",
        "Over-the-air (OTA) firmware updates",
        "Intrusion detection system",
        "Secure boot and secure firmware update"
      ]
    }
  ];

  try {
    // First, clear existing projects if needed
    // Note: In production, you might want to check for existing projects first
    // and update them instead of clearing all
    
    // Add all projects
    for (const project of projects) {
      await addDoc(collection(db, 'projects'), {
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log(`✅ Added project: ${project.title}`);
    }
    
    console.log('🎉 All projects added successfully!');
  } catch (error) {
    console.error('❌ Error adding projects: ', error);
  }
};

// Run the function
addProjects().catch(console.error);