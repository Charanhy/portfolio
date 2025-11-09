import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';

const CardProject = ({ 
  mainImage,
  title,
  description,
  link,
  id, 
  techStack = [], 
  github = "#", 
  demo = "#",
  features = []
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [images, setImages] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  
  // Initialize images array when component mounts or mainImage changes
  useEffect(() => {
    if (mainImage) {
      // If mainImage is a string, convert it to an array with one item
      const imageArray = Array.isArray(mainImage) ? [...mainImage] : [mainImage];
      setImages(imageArray);
    }
  }, [mainImage]);
  
  // Auto-rotate images if there are multiple and not hovered
  useEffect(() => {
    let interval;
    if (images.length > 1 && !isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
    }
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const goToImage = (index, e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const toggleDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  const handleLiveDemo = (e) => {
    if (!demo && !link) {
      e.preventDefault();
      alert("Live demo is not available for this project");
    }
  };

  return (
    <div className="group relative w-full h-full flex flex-col">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 flex flex-col h-full hover:border-purple-500/30">
        {/* Project Image */}
        <div 
          className="relative w-full h-48 overflow-hidden group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {images.length > 0 ? (
            <div className="relative w-full h-full">
              <div className="relative w-full h-full overflow-hidden">
                <div 
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${images.length * 100}%`,
                    transform: `translateX(-${currentImageIndex * (100 / images.length)}%)`
                  }}
                >
                  {images.map((img, idx) => (
                    <div 
                      key={idx}
                      className="w-full h-full flex-shrink-0"
                      style={{ width: `${100 / images.length}%` }}
                    >
                      <img 
                        src={img} 
                        alt={`${title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                        }}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Navigation Dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => goToImage(idx, e)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? 'bg-purple-400 w-6' : 'bg-white/50 w-2'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-white/30"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-3.1-3.9a2 2 0 0 0-3.1 0L9 18" />
              </svg>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <div className="flex space-x-2">
              {github !== "#" && (
                <a 
                  href={github}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {demo !== "#" && (
                <a 
                  href={demo}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 p-1 rounded-full hover:bg-white/10 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-3 line-clamp-3 flex-grow">{description}</p>
          
          {/* Toggle Details Button */}
          <button 
            onClick={toggleDetails}
            className="flex items-center text-sm text-purple-400 hover:text-purple-300 mb-3 transition-colors w-full justify-between"
          >
            <span>View Details</span>
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {/* Expandable Details */}
          {showDetails && (
            <div className="space-y-4 mt-2 pt-3 border-t border-white/10">
              {/* Key Features */}
              {features && features.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Key Features</h4>
                  <ul className="space-y-1.5">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Technologies Used */}
              {techStack && techStack.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 bg-white/5 text-xs rounded-full text-gray-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* View Project Button */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors"
              onClick={handleLiveDemo}
            >
              View Project
              <ExternalLink className="w-3.5 h-3.5 ml-2" />
            </a>
          </div>
        </div>

        {/* Hover border effect */}
        <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-all duration-300 -z-50"></div>
      </div>
    </div>
  );
};

export default CardProject;