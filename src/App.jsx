import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHackerrank } from "@fortawesome/free-brands-svg-icons";

const HackerrankBrand = (props) => (
  <FontAwesomeIcon icon={faHackerrank} {...props} />
);

import {
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Menu,
  X,
  Award,
  Briefcase,
  GraduationCap,
  User,
  Code,
  Star,
  Trophy,
  Calendar,
  Users,
  Zap,
  Database,
  Globe,
  Server,
  Cpu,
  Brain,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaReact,
  FaPython,
  FaJava,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiLeetcode,
  SiMongodb,
  SiMysql,
  SiFlask,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiR,
  SiJavascript,
} from "react-icons/si";
import { AiOutlineBarChart } from "react-icons/ai";
import { GiArtificialIntelligence } from "react-icons/gi";
import { SiTensorflow } from "react-icons/si";
import { MdAnalytics } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import "./index.css";

import emailjs from "@emailjs/browser";

const JakirPortfolio = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_97zmgim",
        "template_8qutjzu",
        form.current,
        "jhuvNtn8OMocjFpH_"
      )
      .then(
        (result) => {
          console.log(result.text);
          setMessageSent(true);
          setError(false);
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setError(true);
          setMessageSent(false);
        }
      );
  };
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Portfolio data based on Jakir's resume
  const portfolioData = {
    personalInfo: {
      name: "Shaik Mohammad Jakir",
      title: "Thank you for spending the time viewing my portfolio.",
      email: "jakir28.shaik@gmail.com",
      phone: "+91 9390691882",
      location: "Vijayawada, Andhra Pradesh, 520007",
      linkedin: "https://www.linkedin.com/in/mohammad-jakir-shaik/",
      github: "https://github.com/Zakeer2811",
      leetcode: "https://leetcode.com/u/MD__JAKIR1128__/",
      hackerrank: "https://hackerrank.com/jakir28_shaik",
      codechef: "https://codechef.com/users/jakir_2811",
      bio: "Whether you're here out of curiosity, collaboration, or opportunity,  I hope you came across something meaningful or useful.Feel free to reach out, share your thoughts, or simply say hello—I’d love to hear from you.",
      avatar: "/api/placeholder/300/300",
      leetcodeProblems: 750,
      githubRepos: 20,
      linkedinConnections: 500,
    },
    education: [
      {
        institution: "VR Siddhartha Engineering College",
        degree: "B.Tech in Computer Science",
        startDate: "Nov 2022",
        endDate: "April 2026",
        location: "Vijayawada, India",
        gpa: "9.22/10",
        achievements: ["Active in Technical Events"],
      },
    ],
    skills: [
      {
        name: "Python",
        level: 95,
        category: "Programming",
        icon: FaPython,
        gradientColors: ["#306998", "#FFD43B"],
      },
      {
        name: "Machine Learning",
        level: 90,
        category: "AI/ML",
        icon: SiTensorflow,
        gradientColors: ["#FF6F00", "#FF6F00"],
      },
      {
        name: "Data Science",
        level: 88,
        category: "AI/ML",
        icon: AiOutlineBarChart,
        gradientColors: ["#1DA1F2", "#1DA1F2"],
      },
      {
        name: "Java",
        level: 80,
        category: "Programming",
        icon: FaJava,
        gradientColors: ["#007396", "#007396"],
      },
      {
        name: "React",
        level: 85,
        category: "Web Dev",
        icon: FaReact,
        gradientColors: ["#61DAFB", "#61DAFB"],
      },
      {
        name: "Node.js",
        level: 80,
        category: "Web Dev",
        icon: FaNodeJs,
        gradientColors: ["#339933", "#339933"],
      },
      {
        name: "SQL",
        level: 85,
        category: "Database",
        icon: SiMysql,
        gradientColors: ["#4479A1", "#4479A1"],
      },
      {
        name: "MongoDB",
        level: 75,
        category: "Database",
        icon: SiMongodb,
        gradientColors: ["#47A248", "#47A248"],
      },
      {
        name: "HTML/CSS",
        level: 90,
        category: "Web Dev",
        icon: FaHtml5,
        gradientColors: ["#E34F26", "#1572B6"],
      },
      {
        name: "Flask",
        level: 80,
        category: "Web Dev",
        icon: SiFlask,
        gradientColors: ["#000000", "#000000"],
      },
      {
        name: "Scikit-learn",
        level: 85,
        category: "AI/ML",
        icon: SiScikitlearn,
        gradientColors: ["#F7931E", "#F7931E"],
      },
      {
        name: "Pandas",
        level: 90,
        category: "Data Science",
        icon: SiPandas,
        gradientColors: ["#150458", "#150458"],
      },
      {
        name: "NumPy",
        level: 85,
        category: "Data Science",
        icon: SiNumpy,
        gradientColors: ["#013243", "#013243"],
      },
      {
        name: "R",
        level: 70,
        category: "Programming",
        icon: SiR,
        gradientColors: ["#276DC3", "#276DC3"],
      },
      {
        name: "JavaScript",
        level: 82,
        category: "Programming",
        icon: SiJavascript,
        gradientColors: ["#F7DF1E", "#000000"],
      },
    ],
    projects: [
      {
        name: "Glioma Brain Tumor Detection using YOLOv11",
        description:
          "Developed an end-to-end pipeline for preprocessing medical imaging data (MRI scans) and performing tumor detection using YOLOv11 object detection algorithm.",
        technologies: [
          "Python",
          "Flask",
          "YOLO",
          "Ultralytics",
          "nibabel",
          "HTML",
          "CSS",
          "OpenCV",
          "NumPy",
        ],
        metrics: "mAP: 0.92",
        date: "Feb 2025",
        image: "🧠",
        category: "Machine Learning",
        githubLink: "https://github.com/Zakeer2811/Glioma-Tumor-detection",
      },
      {
        name: "Weather Insight",
        description:
          "A responsive weather app that fetches real-time weather data using the OpenWeatherMap API, displaying temperature, humidity, and conditions with intuitive icons and animations.",
        technologies: [
          "HTML",
          "CSS",
          "JavaScript",
          "OpenWeatherMap API",
          "FontAwesome",
        ],
        date: "Dec 2024",
        image: "🌤️",
        category: "Web Development",
        githubLink: "https://github.com/Zakeer2811/weather_app",
      },
      {
        name: "Insomnia Detection System",
        description:
          "Developed a project combining IoT and K-means clustering to detect insomnia patterns in sleep data.",
        technologies: [
          "Python",
          "pandas",
          "seaborn",
          "matplotlib",
          "sklearn",
          "Flask",
        ],
        metrics: "Silhouette Score: 0.93",
        date: "Nov 2024",
        image: "😴",
        category: "Machine Learning",
        githubLink: "https://github.com/Zakeer2811/insomnia_alert",
      },
      {
        name: "Diabetes Prediction Web Application",
        description:
          "A web application that predicts diabetes using Machine Learning with Gradient Boosting Classifier.",
        technologies: [
          "Python",
          "Scikit-learn",
          "Pandas",
          "Matplotlib",
          "joblib",
        ],
        metrics: "ROC AUC Score: 0.98",
        date: "Oct 2024",
        image: "🏥",
        category: "Machine Learning",
        githubLink: "https://github.com/Zakeer2811/Diabetes-Prediction",
      },
      {
        name: "EisenHower TODO",
        description:
          "Built an Eisenhower Matrix-based to-do list app to prioritize tasks using urgency and importance criteria.",
        technologies: ["HTML", "CSS", "JavaScript"],
        date: "Dec 2024",
        image: "📋",
        category: "Web Development",
        githubLink: "https://github.com/Zakeer2811/EisenHowerTODO",
      },
      {
        name: "Random Forest Analysis on Boston Housing",
        description:
          "Developed a Random Forest model to predict housing prices with high accuracy.",
        technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
        metrics: "R² Score: 0.888",
        date: "Oct 2024",
        image: "🏠",
        category: "Machine Learning",
        githubLink: "https://github.com/Zakeer2811/Boston-Housing_prediction",
      },
      {
        name: "Terminal-Based AI Chatbot",
        description:
          "Developed a terminal-based AI chatbot using the Gemini API for interactive user queries.",
        technologies: ["Python", "Gemini API"],
        date: "Sep 2024",
        image: "🤖",
        category: "AI/ML",
        githubLink: "https://github.com/Zakeer2811/gemini-api-chatbot",
      },
    ],
    achievements: [
      {
        title: "LeetCode Achievements",
        organization: "LeetCode",
        date: "Mar 2025",
        description:
          "Solved 700+ problems with multiple streak badges (365, 300, 200, 100, 50 days). Authored 36 solutions with 5k+ views.",
        badge: "🏆",
      },
      {
        title: "Adobe Gen AI Hackathon - Top 5%",
        organization: "Adobe",
        date: "Aug 2024",
        description:
          "Achieved top 5 percentile out of hundreds of participants in the Adobe Gen AI Hackathon.",
        badge: "🥇",
      },
      {
        title: "NPTEL Topper - Foundations of R Software",
        organization: "NPTEL (India)",
        date: "Oct 2024",
        description:
          "Secured position in top 2% of over 1400 students with 97% score.",
        badge: "📊",
      },
      {
        title: "HackerRank 5-Star Badge",
        organization: "HackerRank",
        date: "Mar 2025",
        description:
          "Earned 5-star badge in Problem Solving, 4-star badges in SQL and Python.",
        badge: "⭐",
      },
      {
        title: "21 Days GFG Challenge Winner",
        organization: "GeeksforGeeks",
        date: "Sep 2024",
        description:
          "Completed challenge in top rank, showcasing consistency in DSA.",
        badge: "🎯",
      },
      {
        title: "Design Thinking Workshop - Top 3",
        organization: "Dot Sphere",
        date: "Mar 2024",
        description:
          "Recognized as one of the top 3 teams in competitive design thinking workshop.",
        badge: "💡",
      },
    ],
    certifications: [
      "ServiceNow CSA (Mar 2025)",
      "Foundations of R Software (Nov 2024)",
      "AWS Data Engineering (Jun 2024)",
      "AWS Machine Learning Foundations (Apr 2024)",
      "Social Networks (Jun 2024)",
      "NDG Linux (Nov 2023)",
    ],
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "achievements",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const FloatingSkillCard = ({ skill, index }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [hover, setHover] = useState(false);
    const [showPercentage, setShowPercentage] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [pulseEffect, setPulseEffect] = useState(false);
    const [c1, c2] = skill.gradientColors;
    const isDual = c1 !== c2;
    const glow1 = `${c1}55`;
    const glow2 = isDual ? `${c2}55` : "";

    // Entrance animation
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), index * 150);
      return () => clearTimeout(timer);
    }, [index]);

    const handleClick = () => {
      setShowPercentage(true);
      setPulseEffect(true);
      setTimeout(() => setShowPercentage(false), 2500);
      setTimeout(() => setPulseEffect(false), 500);
    };
    console.log("darkMode is", darkMode);
    return (
      <div
        className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
          isVisible ? "animate-slideInFromBottom" : "opacity-0 translate-y-8"
        }`}
        style={{
          marginTop: `${index * 4}px`,
          background: darkMode
            ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)" // Always white in dark mode
            : hover
            ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)" // Light mode hover white
            : "linear-gradient(135deg, #111827 0%, #1f2937 100%)", // Light mode normal dark

          boxShadow: hover
            ? `0 20px 40px rgba(0,0,0,0.4), 0 0 40px ${glow1}${
                isDual ? `, 0 0 40px ${glow2}` : ""
              }`
            : darkMode
            ? "0 10px 25px rgba(0,0,0,0.1)"
            : "0 10px 25px rgba(0,0,0,0.6)",

          transform: hover
            ? "scale(1.08) translateY(-8px) rotateY(5deg)"
            : pulseEffect
            ? "scale(1.02)"
            : "scale(1)",

          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
      >
        {/* Enhanced Neon border glow with rotation */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-80 transition-all duration-700"
          style={{
            background: isDual
              ? `conic-gradient(from 0deg, ${c1}CC, ${c2}CC, ${c1}CC, ${c2}80, ${c1}CC)`
              : `conic-gradient(from 0deg, ${c1}CC, ${c1}80, ${c1}FF, ${c1}80, ${c1}CC)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "subtract",
            WebkitMaskComposite: "subtract",
            padding: "2px",
            animation: hover
              ? darkMode
                ? "neonBorderGlow 3s linear infinite"
                : "neonBorderGlow 3s linear infinite"
              : "none",
            filter: !darkMode ? `blur(1px)` : "none", 
          }}
        />

        {}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 p-0.5"
          style={{
            background: isDual
              ? `linear-gradient(45deg, ${c1}, ${c2}, ${c1})`
              : `linear-gradient(45deg, ${c1}, ${c1}80, ${c1})`,
            filter: hover
              ? `drop-shadow(0 0 25px ${glow1})${
                  isDual ? ` drop-shadow(0 0 25px ${glow2})` : ""
                } brightness(1.1)`
              : undefined,
            animation: hover
              ? "shimmerBorder 1.5s ease-in-out infinite"
              : "none",
          }}
        >
          <div
            className={`w-full h-full rounded-2xl transition-all duration-300`}
            style={{
              backgroundColor: darkMode
                ? "#ffffff" // Dark theme -> always white cards
                : hover
                ? "#ffffff" // Light theme hover -> WHITE like dark theme
                : "#111827", // Light theme normal -> dark
              boxShadow: hover ? `inset 0 0 20px ${glow1}22` : "none",
            }}
          />
        </div>

        {/* Floating particles effect */}
        {hover && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-floatingParticles"
                style={{
                  backgroundColor: i % 2 === 0 ? c1 : isDual ? c2 : c1,
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Enhanced percentage display with morphing background */}
        {showPercentage && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-30 animate-morphIn"
            style={{
              background: darkMode
                ? `radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)` // Dark theme -> white overlay
                : hover
                ? `radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)` // Light theme hover -> WHITE overlay like dark theme
                : `radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)`, // Light theme normal -> dark overlay
              backdropFilter: "blur(15px)",
            }}
          >
            <div
              className="text-6xl font-bold mb-2 animate-countUp"
              style={{
                background: isDual
                  ? `linear-gradient(45deg, ${c1}, ${c2})`
                  : `linear-gradient(45deg, ${c1}, ${c1}80)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: `drop-shadow(0 0 15px ${
                  darkMode ? `${c1}80` : `${c1}40`
                })`,
                animation:
                  "textGlow 1s ease-in-out infinite alternate, countUp 0.8s ease-out",
              }}
            >
              {skill.level || skill.percentage || 85}%
            </div>
            <div
              className="text-sm font-medium animate-slideInUp"
              style={{
                color: darkMode
                  ? "#1F2937" // Dark theme -> always dark text (on white cards)
                  : hover
                  ? "#1F2937" // Light theme hover -> dark text (on WHITE cards like dark theme)
                  : "#E5E7EB", // Light theme normal -> light text (on dark cards)
                opacity: 0.9,
                animation: "slideInUp 0.5s ease-out 0.3s both",
              }}
            >
              Proficiency Level
            </div>

            {/* Progress ring animation */}
            <div className="absolute inset-4 rounded-full opacity-30">
              <svg
                className="w-full h-full animate-spin-slow"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={c1}
                  strokeWidth="2"
                  strokeDasharray={`${(skill.level || 85) * 2.83} 283`}
                  strokeLinecap="round"
                  className="animate-drawCircle"
                />
              </svg>
            </div>
          </div>
        )}

        <div className="relative z-10 text-center">
          {/* Enhanced icon with breathing effect */}
          <div className="relative mb-4 w-16 h-16 mx-auto rounded-full group">
            <skill.icon
              className="w-12 h-12 mx-auto transition-all duration-300 relative z-10"
              style={{
                color: c1,
                filter: hover
                  ? `drop-shadow(0 0 15px ${glow1}) brightness(1.2)${
                      isDual ? ` drop-shadow(0 0 15px ${glow2})` : ""
                    }`
                  : undefined,
                transform: hover ? "scale(1.3) rotateY(10deg)" : undefined,
                animation: hover
                  ? "iconBreathe 2s ease-in-out infinite"
                  : "none",
              }}
            />

            {/* Icon glow background */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow"
              style={{
                background: `radial-gradient(circle, ${c1}AA 0%, ${c1}55 40%, transparent 70%)`,
                transform: "scale(2.5)",
                filter: `blur(4px) drop-shadow(0 0 10px ${glow1})`,
              }}
            />
          </div>

          {/* Enhanced title with typewriter effect on hover */}
          <h3
            className="text-lg font-bold mb-2 transition-all duration-300 relative overflow-hidden"
            style={{
              color: hover
                ? c1
                : darkMode
                ? "#111827" // Dark theme -> always dark text (on white cards)
                : "#E5E7EB", // Light theme normal -> light text (on dark cards)
              transform: hover ? "translateY(-2px)" : undefined,
            }}
          >
            <span className={hover ? "animate-typewriter" : ""}>
              {skill.name}
            </span>
            {hover && (
              <span
                className="absolute bottom-0 left-0 h-0.5 bg-current animate-expandWidth"
                style={{ backgroundColor: c1 }}
              />
            )}
          </h3>

          {/* Enhanced category badge with sliding effect */}
          <span
            className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 inline-block"
            style={{
              background: isDual
                ? `linear-gradient(90deg, ${c1}22, ${c2}22)`
                : `${c1}22`,
              color: c1,
              transform: hover ? "translateY(-1px) scale(1.05)" : undefined,
              boxShadow: hover ? `0 4px 12px ${c1}30` : undefined,
            }}
          >
            {skill.category}
          </span>

          {/* Enhanced lightning bolt with rotation */}
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Zap
              className="w-4 h-4 animate-bounce-rotate"
              style={{ color: c1, filter: `drop-shadow(0 0 6px ${glow1})` }}
            />
          </div>

          {/* Enhanced ping bubbles with trail effect */}
          {hover && (
            <>
              {/* Main bubbles */}
              <div
                className="absolute top-2 left-2 w-2 h-2 rounded-full animate-bubble-trail"
                style={{ backgroundColor: c1 }}
              />
              <div
                className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full animate-bubble-trail"
                style={{
                  backgroundColor: isDual ? c2 : c1,
                  animationDelay: "0.5s",
                }}
              />
              <div
                className="absolute top-1/2 left-1 w-1 h-1 rounded-full animate-bubble-trail"
                style={{
                  backgroundColor: c1,
                  animationDelay: "1s",
                }}
              />
              <div
                className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full animate-bubble-trail"
                style={{
                  backgroundColor: isDual ? c2 : c1,
                  animationDelay: "1.5s",
                }}
              />

              {/* Trailing smaller bubbles */}
              <div
                className="absolute top-3 left-3 w-0.5 h-0.5 rounded-full animate-bubble-trail opacity-60"
                style={{ backgroundColor: c1, animationDelay: "0.2s" }}
              />
              <div
                className="absolute bottom-3 right-3 w-0.5 h-0.5 rounded-full animate-bubble-trail opacity-60"
                style={{
                  backgroundColor: isDual ? c2 : c1,
                  animationDelay: "0.7s",
                }}
              />
            </>
          )}
        </div>

        <style>{`
           @keyframes slideInFromBottom {
             0% {
               opacity: 0;
               transform: translateY(30px) scale(0.95);
             }
             100% {
               opacity: 1;
               transform: translateY(0) scale(1);
             }
           }
   
           @keyframes rotatingGlow {
             0% { transform: rotate(0deg); }
             100% { transform: rotate(360deg); }
           }
   
           @keyframes shimmerBorder {
             0%, 100% { background-position: 0% 50%; }
             50% { background-position: 100% 50%; }
           }
   
           @keyframes floatingParticles {
             0%, 100% {
               transform: translateY(0px) translateX(0px) scale(1);
               opacity: 0;
             }
             20% {
               opacity: 1;
             }
             80% {
               opacity: 1;
             }
             50% {
               transform: translateY(-20px) translateX(10px) scale(1.2);
             }
           }
   
           @keyframes morphIn {
             0% {
               opacity: 0;
               transform: scale(0.8);
               border-radius: 50%;
             }
             50% {
               opacity: 1;
               transform: scale(1.05);
               border-radius: 25%;
             }
             100% {
               opacity: 1;
               transform: scale(1);
               border-radius: 1rem;
             }
           }
   
           @keyframes countUp {
             0% {
               transform: scale(0.5) rotateX(90deg);
               opacity: 0;
             }
             50% {
               transform: scale(1.1) rotateX(0deg);
               opacity: 1;
             }
             100% {
               transform: scale(1) rotateX(0deg);
               opacity: 1;
             }
           }
           @keyframes slideInUp {
           0% {
             opacity: 0;
             transform: translateY(20px);
           }
           100% {
             opacity: 1;
             transform: translateY(0);
           }
         }
 
         @keyframes iconBreathe {
           0% {
             transform: scale(1);
           }
           50% {
             transform: scale(1.15);
           }
           100% {
             transform: scale(1);
           }
         }
 
         @keyframes drawCircle {
           0% {
             stroke-dashoffset: 283;
           }
           100% {
             stroke-dashoffset: 0;
           }
         }
 
         @keyframes textGlow {
           0% {
             filter: drop-shadow(0 0 5px rgba(255,255,255,0.3));
           }
           100% {
             filter: drop-shadow(0 0 15px rgba(255,255,255,0.6));
           }
         }
 
         @keyframes bubble-trail {
           0% {
             opacity: 0;
             transform: scale(0.5) translateY(0);
           }
           30% {
             opacity: 1;
             transform: scale(1.1) translateY(-5px);
           }
           100% {
             opacity: 0;
             transform: scale(0.3) translateY(-15px);
           }
         }
 
         @keyframes expandWidth {
           from {
             width: 0;
           }
           to {
             width: 100%;
           }
         }
 
         @keyframes typewriter {
           from {
             width: 0;
           }
           to {
             width: 100%;
           }
         }
 
         .animate-slideInFromBottom {
           animation: slideInFromBottom 0.6s ease-out forwards;
         }
 
         .animate-countUp {
           animation: countUp 0.8s ease-out forwards;
         }
 
         .animate-slideInUp {
           animation: slideInUp 0.5s ease-out forwards;
         }
 
         .animate-morphIn {
           animation: morphIn 0.6s ease-in-out forwards;
         }
 
         .animate-drawCircle {
           animation: drawCircle 1s ease-out forwards;
         }
 
         .animate-bounce-rotate {
           animation: rotatingGlow 2s linear infinite;
         }
 
         .animate-bubble-trail {
           animation: bubble-trail 2.5s ease-in-out infinite;
         }
 
         .animate-typewriter {
           display: inline-block;
           overflow: hidden;
           white-space: nowrap;
            animation: typewriter 2.5s steps(30) forwards;
         }
 
         .animate-expandWidth {
           animation: expandWidth 0.4s ease-out forwards;
         }
 
         .animate-pulse-glow {
           animation: pulseGlow 2s infinite;
         }
 
         @keyframes pulseGlow {
           0%, 100% {
             opacity: 0.3;
             transform: scale(1.9);
           }
           50% {
             opacity: 0.6;
             transform: scale(2);
           }
         }
 
         .animate-spin-slow {
           animation: spin 10s linear infinite;
         }
 
         @keyframes spin {
           0% {
             transform: rotate(0deg);
           }
           100% {
             transform: rotate(360deg);
           }
         }
       `}</style>
      </div>
    );
  };

  // Add these keyframes to your CSS

  /*
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes gradient-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes soft-bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes background-shift {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }
  */
  const SocialIcon = ({
    href,
    icon: Icon,
    platform,
    count,
    originalIcon: OriginalIcon,
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Define platform-specific colors
    const getPlatformColor = (platform) => {
      switch (platform.toLowerCase()) {
        case "email":
          return { color: "#EA4335", glow: "rgba(234, 67, 53, 0.5)" };
        case "linkedin":
          return { color: "#0077B5", glow: "rgba(0, 119, 181, 0.5)" };
        case "github":
          return { color: "#333", glow: "rgb(247, 238, 244)" };
        case "leetcode":
          return { color: "#FFA116", glow: "rgba(255, 161, 22, 0.5)" };
        case "hackerrank":
          return { color: "#2EC866", glow: "rgba(46, 200, 102, 0.5)" };
        default:
          return { color: "#6B7280", glow: "rgba(107, 114, 128, 0.5)" };
      }
    };

    const { color, glow } = getPlatformColor(platform);
    const IconToUse = OriginalIcon || Icon;

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 overflow-hidden"
        style={{
          background: darkMode
            ? "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: darkMode
            ? "0 10px 25px rgba(0,0,0,0.3)"
            : "0 10px 25px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated glowing border */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-0.5`}
          style={{
            background: isHovered
              ? `linear-gradient(45deg, transparent, ${color}, transparent)`
              : undefined,
            filter: isHovered ? `drop-shadow(0 0 20px ${glow})` : undefined,
          }}
        >
          <div
            className={`w-full h-full rounded-2xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          />
        </div>

        <div className="relative z-10 text-center">
          <IconToUse
            className={`w-8 h-8 mx-auto mb-2 transition-all duration-300`}
            style={{
              color: isHovered ? color : darkMode ? "#D1D5DB" : "#6B7280",
              filter: isHovered ? `drop-shadow(0 0 10px ${glow})` : undefined,
              transform: isHovered ? "scale(1.2)" : "scale(1)",
            }}
          />
          <p
            className={`text-sm font-medium transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
            style={{
              color: isHovered ? color : undefined,
            }}
          >
            {platform}
          </p>
          {count && (
            <p
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {count}+
            </p>
          )}
        </div>

        {/* Lightning effect on hover */}
        <div className="absolute -top-1 -right-1 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Zap className="w-4 h-4 animate-pulse" />
        </div>

        {/* Floating particles */}
        {isHovered && (
          <>
            <div
              className="absolute top-2 left-2 w-1 h-1 rounded-full animate-ping"
              style={{ backgroundColor: color }}
            />
            <div
              className="absolute bottom-2 right-2 w-1 h-1 rounded-full animate-ping"
              style={{ backgroundColor: color, animationDelay: "0.5s" }}
            />
          </>
        )}
      </a>
    );
  };

  const ProjectCard = ({ project, index, darkMode }) => (
    <a
      href={project.githubLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
        darkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-100"
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl transform hover:scale-125 transition-transform duration-300">
          {project.image}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"
          }`}
        >
          {project.category}
        </span>
      </div>

      <h3
        className={`text-xl font-bold mb-3 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {project.name}
      </h3>

      <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {project.description}
      </p>

      {project.metrics && (
        <div
          className={`mb-4 p-2 rounded ${
            darkMode
              ? "bg-green-900 text-green-200"
              : "bg-green-100 text-green-800"
          }`}
        >
          <strong>Performance: </strong>
          {project.metrics}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-xs transition-colors hover:bg-blue-500 hover:text-white ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        <Calendar className="inline w-4 h-4 mr-1" />
        {project.date}
      </div>
    </a>
  );

  const AchievementCard = ({ achievement, index }) => (
    <div
      className={`rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
        darkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-100"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl transform hover:scale-125 transition-transform duration-300">
          {achievement.badge}
        </div>
        <div className="flex-1">
          <h3
            className={`text-lg font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {achievement.title}
          </h3>
          <p
            className={`text-sm mb-2 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {achievement.organization}
          </p>
          <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {achievement.description}
          </p>
          <div
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Calendar className="inline w-4 h-4 mr-1" />
            {achievement.date}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors ${
          darkMode
            ? "bg-gray-900/80 border-gray-800"
            : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              SMJ
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                "home",
                "about",
                "skills",
                "projects",
                "achievements",
                "education",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize font-medium transition-all duration-300 hover:scale-110 ${
                    activeSection === item
                      ? "text-blue-500 scale-110"
                      : darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg transition-transform duration-300 hover:scale-110"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t transition-all duration-300 ${
              darkMode
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="px-4 py-2 space-y-2">
              {[
                "home",
                "about",
                "skills",
                "projects",
                "achievements",
                "education",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-3 py-2 rounded-md capitalize transition-all duration-300 ${
                    activeSection === item
                      ? "text-blue-500 bg-blue-50 transform scale-105"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-20 relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div
            className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Circular Photo */}
            <div className="relative inline-block mb-8">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                  <img
                    src="./smj.jpeg"
                    alt="Your Name"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating rings around photo */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" />
              <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {portfolioData.personalInfo.name}
              </span>
            </h1>
            <p
              className={`text-xl md:text-2xl mb-8 ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {portfolioData.personalInfo.title}
            </p>

            <p
              className={`text-lg mb-12 max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              {portfolioData.personalInfo.bio}
            </p>

            {/* Enhanced Social Icons */}
            <div className="flex justify-center gap-6 mb-12">
              <SocialIcon
                href={`mailto:${portfolioData.personalInfo.email}`}
                icon={Mail}
                originalIcon={AiOutlineMail}
                platform="Email"
              />
              <SocialIcon
                href={portfolioData.personalInfo.linkedin}
                icon={Linkedin}
                originalIcon={FaLinkedin}
                platform="LinkedIn"
                count={portfolioData.personalInfo.linkedinConnections}
              />
              <SocialIcon
                href={portfolioData.personalInfo.github}
                icon={Github}
                originalIcon={FaGithub}
                platform="GitHub"
                count={portfolioData.personalInfo.githubRepos}
              />
              <SocialIcon
                href={portfolioData.personalInfo.leetcode}
                icon={Code}
                originalIcon={SiLeetcode}
                platform="LeetCode"
                count={portfolioData.personalInfo.leetcodeProblems}
              />
              <SocialIcon
                href={portfolioData.personalInfo.hackerrank} // your HR URL
                icon={HackerrankBrand} // pass our wrapper
                originalIcon={HackerrankBrand}
                platform="HackerRank"
                count={portfolioData.personalInfo.hackerrankScore} // optional
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>

              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-justify">
                <p
                  className={`text-lg leading-relaxed mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  I'm a passionate Computer Science student at VR Siddhartha
                  Engineering College with a strong focus on AI, Machine
                  Learning, Data Science, and Web Development. I have a strong
                  foundation in DSA and combine academic excellence with
                  practical experience.
                </p>
                <p
                  className={`text-lg leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  My journey in tech is driven by curiosity and a desire to
                  solve real-world problems through innovative solutions. I
                  actively participate in competitive programming and have
                  solved 700+ problems on LeetCode.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-800" : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">CGPA</span>
                  </div>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    9.22/10
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-800" : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Location</span>
                  </div>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Vijayawada
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className={`p-8 rounded-2xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-xl`}
              >
                <h4 className="text-xl font-bold mb-6">Quick Stats</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>LeetCode Problems</span>
                    <span className="font-bold text-green-500">750+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>GitHub Repositories</span>
                    <span className="font-bold text-blue-500">19</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>LinkedIn Connections</span>
                    <span className="font-bold text-purple-500">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Certifications</span>
                    <span className="font-bold text-orange-500">
                      {portfolioData.certifications.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Click on any skill to see proficiency level!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolioData.skills.map((skill, index) => (
              <FloatingSkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              A showcase of my latest work in Machine Learning and Web
              Development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Achievements & Awards</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Recognition and milestones in my journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.title}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            {portfolioData.education.map((edu, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl shadow-lg mb-8 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      className={`text-lg font-medium mb-2 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <span
                        className={`flex items-center gap-1 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        {edu.startDate} - {edu.endDate}
                      </span>
                      <span
                        className={`flex items-center gap-1 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </span>
                      <span
                        className={`font-bold ${
                          darkMode ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        CGPA: {edu.gpa}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm ${
                            darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Certifications */}
            <div
              className={`p-8 rounded-xl shadow-lg ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-100"
              }`}
            >
              <h3
                className={`text-xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Award
                        className={`w-5 h-5 ${
                          darkMode ? "text-yellow-400" : "text-yellow-500"
                        }`}
                      />
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        {cert}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Let's discuss opportunities and collaborate on exciting projects
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <a
                    href={`mailto:${portfolioData.personalInfo.email}`}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-50"
                    } shadow-lg`}
                  >
                    <Mail className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {portfolioData.personalInfo.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${portfolioData.personalInfo.phone}`}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-50"
                    } shadow-lg`}
                  >
                    <Phone className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {portfolioData.personalInfo.phone}
                      </p>
                    </div>
                  </a>

                  <div
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } shadow-lg`}
                  >
                    <MapPin className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {portfolioData.personalInfo.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  <a
                    href={portfolioData.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a
                    href={portfolioData.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                      darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600 hover:shadow-gray-500/50"
                        : "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-gray-500/50"
                    }`}
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href={portfolioData.personalInfo.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50"
                  >
                    <SiLeetcode className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Updated Contact Form */}
              <div
                className={`p-8 rounded-xl shadow-lg ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Send Message
                </h3>
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />

                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    required
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />

                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Your Message"
                    required
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Send Message
                  </button>

                  {messageSent && (
                    <p className="text-green-500 mt-2 text-center">
                      Message sent successfully!
                    </p>
                  )}
                  {error && (
                    <p className="text-red-500 mt-2 text-center">
                      Failed to send message. Try again.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 border-t ${
          darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              SMJ
            </div>
            <p
              className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Building the future with code, one project at a time.
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a
                href={portfolioData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:text-blue-500 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={portfolioData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:text-gray-900 ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600"
                }`}
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={`mailto:${portfolioData.personalInfo.email}`}
                className={`transition-colors hover:text-red-500 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              © 2025 Shaik Mohammad Jakir. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const CustomCursor = ({ color = "#FFD43B", size = 12 }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    document.body.style.cursor = "none";

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("button, a, .cursor-pointer").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("button, a, .cursor-pointer").forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: pos.y - size / 2,
        left: pos.x - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        pointerEvents: "none",
        background: color,
        transform: hovering ? "scale(2)" : "scale(1)",
        transition: "transform 0.2s ease-out",
        mixBlendMode: "difference",
        zIndex: 9999,
      }}
    />
  );
};

export default JakirPortfolio;
