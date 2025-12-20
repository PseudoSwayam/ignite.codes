import React from 'react';
import Hero from '../components/Hero';
import ProjectsNew from '../components/ProjectsNew';
import Internships from '../components/Internships';
import SkillsVisualization from '../components/SkillsVisualization';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <ProjectsNew />
      <Internships />
      <SkillsVisualization />
      <Contact />
    </main>
  );
};

export default Home;
