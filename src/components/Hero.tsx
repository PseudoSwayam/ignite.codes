import React, { Suspense } from 'react';
import { ArrowDown, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation'; // typing effect
const Hero3D = React.lazy(() => import('./Hero3D'));
import Hero3DFallback from './Hero3DFallback';
import { LetterReveal } from './ScrollRevealAnimations';

const smoothScrollTo = (targetY: number, duration = 1200) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    // easeInOutQuad
    const ease = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, startY + distance * ease);
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(y, 1200);
    }
  };
  
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(y, 1200);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* 3D Background with fallback */}
      <Suspense fallback={<Hero3DFallback />}>
        <Hero3D />
      </Suspense>
      
      {/* Subtle animated particle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-transparent to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,197,173,0.08),transparent_60%)]" />
      </div>

      <div className="text-center max-w-3xl mx-auto relative z-10">
        {/* Avatar with glow + hover tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <motion.img
            src="https://avatars.githubusercontent.com/u/129137886?v=4"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-2 border-beige-400/30 shadow-xl shadow-beige-900/50"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />

          {/* 🌟 Databricks Certification Badge Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 flex justify-center"
          >
            <a
              href="https://drive.google.com/file/d/1ENanYUmpUxlbCUNIE0JycKO0DYUho6za/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-beige-400/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <img
                src="/badges/databricks-certified-analyst.png"
                alt="Databricks Certified Data Analyst"
                className="h-6 w-auto"
              />
              <span className="text-sm font-medium text-beige-100">
                Databricks Certified Data Analyst
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Heading with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
        >
          <LetterReveal text="Hi, I'm" delay={0.4} />{' '}
          <span className="bg-gradient-to-r from-beige-200 to-beige-400 bg-clip-text text-transparent">
            <LetterReveal text="Swayam Sahoo" delay={0.6} />
          </span>
        </motion.h1>

        {/* Typing animation for roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-beige-100 mb-8"
        >
          <TypeAnimation
            sequence={[
              'AI/ML & Data Science Developer',
              1500,
              'Aspiring Consultant',
              1500,
              'Engineer. Analyst. Communicator.',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-medium"
          />
          <p className="mt-2">
            <span className="bg-gradient-to-r from-beige-200 to-beige-400 bg-clip-text text-transparent font-semibold">
              Turning Real-Time AI
            </span>{' '}
            into{' '}
            <span className="bg-gradient-to-r from-beige-200 to-beige-400 bg-clip-text text-transparent font-semibold">
              Real World Impact
            </span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {/* Glassmorphism button */}
          <a
            onClick={scrollToProjects}
            className="group px-5 py-3 backdrop-blur-md bg-black/30 border border-beige-300/40 text-white rounded-full text-sm font-semibold hover:shadow-xl hover:shadow-beige-400/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
            data-cursor-text="explore"
          >
            <Eye size={16} />
            <span>View My Work</span>
          </a>

          {/* Gradient button */}
          <button
            onClick={scrollToContact}
            className="group px-5 py-3 bg-gradient-to-r from-beige-300 to-beige-500 text-black rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-beige-400/30 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            data-cursor-text="contact me"
          >
            <span>Get in touch</span>
            <ArrowDown
              size={16}
              className="group-hover:translate-y-0.5 transition-transform duration-300"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;