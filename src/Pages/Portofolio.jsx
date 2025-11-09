import React, { useEffect, useState, useCallback } from "react";
import { Github, Linkedin, Twitter, Instagram, Code, Award, Boxes, Mail, Phone, MapPin, Send } from 'lucide-react';
import Swal from 'sweetalert2';
import { db, collection } from "../firebase";
import { getDocs, query, orderBy } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingState from "../components/LoadingState";
import TechStackIcon from "../components/TechStackIcon";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { name: 'Java', icon: '/images/tech-stack/java.png' },
  { name: 'Python', icon: '/images/tech-stack/python.png' },
  { name: 'Java Swing', icon: '/images/tech-stack/java-swing.png' },
  { name: 'Node.js', icon: '/images/tech-stack/nodejs.png' },
  { name: 'Git', icon: '/images/tech-stack/git.png' },
  { name: 'MySQL', icon: '/images/tech-stack/mysql.png' },
  { name: 'Firebase', icon: '/images/tech-stack/firebase.png' },
  { name: 'Communication', icon: '/images/tech-stack/communication.png' },
];

export default function FullWidthTabs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      Swal.fire({
        title: 'Message Sent!',
        text: 'Thank you for reaching out. I will get back to you soon!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 3000
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send message. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    }
  };

  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[DEBUG] Starting data fetch from Firebase...');
      
      // Check if Firebase is properly initialized
      if (!db) {
        const errorMsg = 'Firebase is not properly initialized';
        console.error(`[ERROR] ${errorMsg}`);
        setError(errorMsg);
        // Try to get data from localStorage as fallback
        try {
          const cachedProjects = localStorage.getItem("projects");
          const cachedCertificates = localStorage.getItem("certificates");
          if (cachedProjects) setProjects(JSON.parse(cachedProjects));
          if (cachedCertificates) setCertificates(JSON.parse(cachedCertificates));
        } catch (e) {
          console.error('[ERROR] Error loading from localStorage:', e);
        }
        return;
      }
      
      // First try to get data from localStorage for faster initial load
      const cachedProjects = localStorage.getItem("projects");
      const cachedCertificates = localStorage.getItem("certificates");
      
      if (cachedProjects && cachedCertificates) {
        console.log('[DEBUG] Using cached data from localStorage');
        try {
          const parsedProjects = JSON.parse(cachedProjects);
          const parsedCerts = JSON.parse(cachedCertificates);
          console.log(`[DEBUG] Loaded ${parsedProjects.length} projects and ${parsedCerts.length} certificates from cache`);
          setProjects(parsedProjects);
          setCertificates(parsedCerts);
        } catch (cacheError) {
          console.error('[ERROR] Error parsing cached data:', cacheError);
          // Clear invalid cache
          localStorage.removeItem("projects");
          localStorage.removeItem("certificates");
        }
      }

      // Always try to fetch fresh data in the background
      console.log('[DEBUG] Setting up Firestore queries...');
      
      // Declare variables in the function scope
      let projectSnapshot;
      let certificateSnapshot;
      let querySuccess = false;
      
      try {
        const projectsQuery = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc")
        );
        
        const certificatesQuery = query(
          collection(db, "certificates"),
          orderBy("date", "desc")
        );

        console.log('[DEBUG] Executing Firestore queries...');
        
        [projectSnapshot, certificateSnapshot] = await Promise.all([
          getDocs(projectsQuery).catch(e => {
            console.error('[ERROR] Error fetching projects:', e);
            throw e;
          }),
          getDocs(certificatesQuery).catch(e => {
            console.error('[ERROR] Error fetching certificates:', e);
            throw e;
          }),
        ]);
        
        querySuccess = true;
        console.log(`[DEBUG] Received ${projectSnapshot.docs.length} projects and ${certificateSnapshot.docs.length} certificates`);
        console.log('Raw project docs:', projectSnapshot.docs.length);
        console.log('Raw certificate docs:', certificateSnapshot.docs.length);
      } catch (queryError) {
        console.error('[ERROR] Error in Firestore queries:', queryError);
        // Don't re-throw here, we'll handle it below
      }

      // Process projects if queries were successful
      const projectData = [];
      if (querySuccess && projectSnapshot) {
        projectSnapshot.forEach((doc) => {
          try {
            const data = doc.data();
            console.log(`[DEBUG] Processing project: ${data.title || 'Untitled'}`);
            projectData.push({
              id: doc.id,
              ...data,
              techStack: Array.isArray(data.techStack) ? data.techStack : [],
              images: Array.isArray(data.images) ? data.images : [],
              github: data.github || "#",
              demo: data.demo || data.link || "#",
              mainImage: data.mainImage || "/images/placeholder-project.jpg"
            });
          } catch (projectError) {
            console.error(`[ERROR] Error processing project ${doc.id}:`, projectError);
          }
        });
        
        console.log(`[DEBUG] Processed ${projectData.length} projects`);
      } else {
        console.log('[DEBUG] Using cached projects due to query error');
        return; // Don't update state if we couldn't fetch fresh data
      }

      // Process certificates if queries were successful
      const certificateData = [];
      if (querySuccess && certificateSnapshot) {
        certificateSnapshot.forEach((doc) => {
          try {
            const data = doc.data();
            certificateData.push({
              id: doc.id,
              ...data,
              image: data.image || "/images/placeholder-certificate.jpg"
            });
          } catch (certError) {
            console.error(`[ERROR] Error processing certificate ${doc.id}:`, certError);
          }
        });
        
        console.log(`[DEBUG] Processed ${certificateData.length} certificates`);
      } else {
        console.log('[DEBUG] Using cached certificates due to query error');
        return; // Don't update state if we couldn't fetch fresh data
      }

      // Update state with fresh data
      console.log('[DEBUG] Updating state with fresh data...');
      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage for offline use
      try {
        localStorage.setItem("projects", JSON.stringify(projectData));
        localStorage.setItem("certificates", JSON.stringify(certificateData));
        console.log('[DEBUG] Data saved to localStorage');
      } catch (storageError) {
        console.error('[ERROR] Error saving to localStorage:', storageError);
      }
      
      console.log('[DEBUG] Data fetch and update complete');
    } catch (error) {
      const errorMsg = `Error fetching data: ${error.message}`;
      console.error(errorMsg, error);
      setError(errorMsg);
      
      // If there's an error, use cached data if available
      try {
        const cachedProjects = localStorage.getItem("projects");
        const cachedCertificates = localStorage.getItem("certificates");
        
        if (cachedProjects) setProjects(JSON.parse(cachedProjects));
        if (cachedCertificates) setCertificates(JSON.parse(cachedCertificates));
      } catch (e) {
        console.error('[ERROR] Error loading from localStorage:', e);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
            <Tab
              icon={<Mail className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Contact"
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg mb-4 w-full">
                  <p className="font-semibold">Error loading data</p>
                  <p className="text-sm opacity-80">{error}</p>
                  <p className="text-xs mt-2">Showing cached data if available.</p>
                </div>
              )}
              {loading ? (
                <LoadingState 
                  message="Loading projects..." 
                  showSpinner={true} 
                />
              ) : projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {displayedProjects.map((project, index) => (
                    <CardProject
                      key={project.id || index}
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      mainImage={project.mainImage}
                      images={project.images || []}
                      techStack={project.techStack || []}
                      github={project.github}
                      demo={project.demo}
                      link={project.link}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full">
                  <div className="text-center py-12">
                    <p className="text-gray-400">No projects found.</p>
                    {!loading && (
                      <button
                        onClick={fetchData}
                        className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-md transition-colors"
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              {loading ? (
                <LoadingState 
                  message="Loading certificates..." 
                  showSpinner={true} 
                />
              ) : (
                <div className="w-full">
                  {error && (
                    <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg mb-4">
                      <p className="font-semibold">Error loading data</p>
                      <p className="text-sm opacity-80">{error}</p>
                      <p className="text-xs mt-2">Showing cached data if available.</p>
                    </div>
                  )}
                  {certificates.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                      {displayedCertificates.map((cert, index) => (
                        <div
                          key={`${cert.id || cert.title}-${index}`}
                          className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.target.src = "/images/placeholder-certificate.jpg";
                            }}
                          />
                          <div className="p-4">
                            <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
                            <p className="text-xs text-gray-500 mt-2">Issued: {cert.date}</p>
                            {cert.link && cert.link !== "#" && (
                              <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 mt-3"
                              >
                                View Certificate
                                <ExternalLink className="w-3.5 h-3.5 ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-400">No certificates found.</p>
                      <button
                        onClick={fetchData}
                        className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-md transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full px-4">
                {techStacks.map((tech, index) => (
                  <TechStackIcon 
                    key={index}
                    TechStackIcon={tech.icon}
                    Language={tech.language}
                  />
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="container mx-auto flex flex-col items-center justify-center min-h-[50vh] py-12 px-4">
              <div className="max-w-3xl w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-purple-500/10 rounded-full">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Email</h3>
                      <a 
                        href="mailto:charanyograj@gmail.com" 
                        className="text-purple-300 hover:text-purple-200 transition-colors"
                      >
                        charanyograj@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-500/10 rounded-full">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Phone</h3>
                      <a 
                        href="tel:+917411202499" 
                        className="text-blue-300 hover:text-blue-200 transition-colors"
                      >
                        +91 7411202499
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-green-500/10 rounded-full">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Location</h3>
                      <p className="text-gray-300">Bengaluru, Karnataka, India</p>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-6">Send me a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Your message..."
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                      >
                        <Send className="w-5 h-5" />
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-medium text-gray-300 mb-4">Let's Connect</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/charanhy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <Github className="w-6 h-6 text-gray-300 hover:text-white" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/charan-hy-3711a6276" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-6 h-6 text-blue-400 hover:text-blue-300" />
                    </a>
                    <a 
                      href="https://twitter.com/charan_hy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-300" />
                    </a>
                    <a 
                      href="https://www.instagram.com/charan_hy/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}