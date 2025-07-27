import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Clouds, Sky } from '@react-three/drei';
import { motion } from 'framer-motion';
import './App.css';

function StarBackground({ theme }) {
  return (
    <div className="canvas-container">
      <Canvas className="background-canvas">
        {theme === 'dark' ? (
          <>
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              fade
              speed={2}
              saturation={1}
              color="#ffffff"
            />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} enableRotate={true} />
          </>
        ) : (
          <>
            <Sky 
              sunPosition={[100, 20, 100]} 
              turbidity={10} 
              rayleigh={3} 
              mieCoefficient={0.0010} 
              mieDirectionalG={3} 
              inclination={1} 
              azimuth={1} 
              exposure={0.9} 
            />
            
           <Clouds 
              opacity={0.25} 
              speed={5}               // slower speed for smooth motion
              width={10} 
              depth={30} 
              segments={60}             // more segments = more detail
              position={[0, 10, 0]}
              color="#ffffff"
              bounds={[2, 5, 0]}      // adds more spread randomness
              concentrate=""      // randomize cloud concentration
            />

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={15} enableRotate={true} />
          </>
        )}
      </Canvas>
    </div>
  );
}

function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <video autoPlay muted className="splash-video">
        <source src="/video/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

function morphChineseToEnglish(name) {
  const chineseChars = ['我', '你', '他', '的', '是', '了', '不', '在', '有', '和'];
  const letters = name.split('');
  return letters.map((char, index) => {
    const randomChinese = chineseChars[Math.floor(Math.random() * chineseChars.length)];
    return { id: index, char, morph: randomChinese };
  });
}

function AnimatedName({ name }) {
  const [displayLetters, setDisplayLetters] = useState([]);

  useEffect(() => {
    const animated = morphChineseToEnglish(name);
    setDisplayLetters(animated.map(item => item.morph));

    const timers = animated.map((item, index) =>
      setTimeout(() => {
        setDisplayLetters(prev => {
          const updated = [...prev];
          updated[index] = item.char;
          return updated;
        });
      }, 300 + index * 200)
    );

    return () => timers.forEach(clearTimeout);
  }, [name]);

  return (
    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
      {displayLetters.map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </h1>
  );
}

function Home() {
  const letters = [
    { chinese: '艾', english: 'M' },
    { chinese: '尤', english: 'O' },
    { chinese: '德', english: 'H' },
    { chinese: '艾', english: 'A' },
    { chinese: '穆', english: 'M' },
    { chinese: '默', english: 'M' },
    { chinese: '艾', english: 'A' },
    { chinese: '德', english: 'D' },
    { chinese: ' ', english: ' ' },
    { chinese: '艾', english: 'A' },
    { chinese: '尤', english: 'Y' },
    { chinese: '安', english: 'A' },
    { chinese: '艾', english: 'A' },
    { chinese: '恩', english: 'N' },
  ];

  const [displayLetters, setDisplayLetters] = useState(Array(letters.length).fill(''));
  const [phase, setPhase] = useState('chinese');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= letters.length) {
      if (phase === 'chinese') {
        setTimeout(() => {
          setPhase('english');
          setIndex(0);
        }, 400);
      }
      return;
    }

    const interval = setInterval(() => {
      setDisplayLetters((prev) => {
        const updated = [...prev];
        updated[index] = phase === 'chinese' ? letters[index].chinese : letters[index].english;
        return updated;
      });
      setIndex((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [index, phase]);

  return (
    <motion.section className="home-layout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="home-left">
        <h1 className="top-name">{displayLetters.join('')}</h1>
        <p>B.Tech 3rd Year | Gamer | Anime Fan | Python & Full Stack Developer</p>
        <p>"Crafting elegant solutions with code & creativity."</p>
      </div>
      <div className="home-right">
        <img className="profile-img circle-img" src="/image/myimage.jpg" alt="Ayaan" />
      </div>
    </motion.section>
  );
}

function About() {
  return (
    <motion.section className="content-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h2>About Me</h2>
      <p>
        Hi! I'm Ayaan, currently in my 3rd year of B.Tech in Computer Science Engineering. I enjoy playing Dota 2, watching anime, and building smart web apps.
      </p>
      <p><strong>Languages:</strong> Python, Java, JavaScript</p>
      <p><strong>Frameworks:</strong> React, Flask, FastAPI</p>
      <p><strong>Tools:</strong> Git, Docker, Firebase, IBM Watson, VS Code</p>
      <p><strong>Hobbies:</strong> Gaming 🎮, Anime 🎌, UI/UX Design 🎨</p>
    </motion.section>
  );
}

function Connect() {
  return (
    <motion.section
      className="content-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>Connect</h2>
      <ul className="connect-list">
        <li>
          <img src="/icons/email.png" alt="Email" className="icon" />
          <a href="mailto:mohammadmuzu445@gmail.com">mohammadmuzu445@gmail.com</a>
        </li>
        <li>
          <img src="/icons/github.png" alt="GitHub" className="icon" />
          <a href="https://github.com/Ayaan48" target="_blank" rel="noreferrer">Ayaan48</a>
        </li>
        <li>
          <img src="/icons/linkedin.png" alt="LinkedIn" className="icon" />
          <a href="https://linkedin.com/in/mohammad-ayaan-169a76317" target="_blank" rel="noreferrer">LinkedIn</a>
        </li>
        <li>
          <img src="/icons/steam.png" alt="Steam" className="icon" />
          <a href="https://steamcommunity.com/profiles/76561198837902186/" target="_blank" rel="noreferrer">Steam</a>
        </li>
        <li>
          <img src="/icons/reddit.png" alt="Reddit" className="icon" />
          <a href="https://www.reddit.com/user/Feisty_One_1724/" target="_blank" rel="noreferrer">Feisty_One_1724</a>
        </li>
      </ul>
      <p>Let’s build something amazing together. Reach out for collaborations or just a friendly tech talk!</p>
    </motion.section>
  );
}


function Contact() {
  return (
    <motion.section className="content-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h2>Contact</h2>
      <p>You can contact me anytime at my email or through social profiles listed above.</p>
    </motion.section>
  );
}

function Projects() {
  return (
    <motion.section className="content-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h2>Projects</h2>
      <div className="project-grid">
        <div className="project-card">
          <h3>CleanTech</h3>
          <p>Transforming Waste Management using Transfer Learning (CNN).</p>
          <a href="https://github.com/Ayaan48/CleanTech-Transforming-Waste-Management-with-Transfer-Learning" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <div className="project-card">
          <h3>HematoVision</h3>
          <p>Deep Learning for Blood Cell Classification using Transfer Learning</p>
          <a href="#">GitHub</a>
        </div>
        <div className="project-card">
          <h3>SmartSDLC</h3>
          <p>AI-Enhanced SDLC Automation using LangChain + IBM Watson</p>
          <a href="#">GitHub</a>
        </div>
        <div className="project-card">
          <h3>Liver Cirrhosis Predictor</h3>
          <p>ML-based diagnostic tool built during internship</p>
          <a href="#">GitHub</a>
        </div>
      </div>
    </motion.section>
  );
}

function Resume() {
  return (
    <motion.section className="content-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h2>Resume</h2>
      <div className="resume-button">
        <a href="/resume/Ayaan_Resume.pdf" download>📄 Download Resume</a>
      </div>
    </motion.section>
  );
}

function Navbar({ toggleTheme, theme }) {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/connect">Connect</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/resume">Resume</Link>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer fixed-footer">
      <span className="footer-text">© 2025 Shaik Mohammad Murtuzaa Ayaan</span>
    </footer>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <Router>
      <div className="app-wrapper">
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <>
            <StarBackground theme={theme} />
            <Navbar toggleTheme={toggleTheme} theme={theme} />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/connect" element={<Connect />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/resume" element={<Resume />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}
