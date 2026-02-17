
import React, { useState, useEffect } from 'react';
import { parseResume, generateAIPrompt } from './services/geminiService';
import { PortfolioData } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ResumeParser from './components/ResumeParser';
import PromptDisplay from './components/PromptDisplay';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleResumeSubmit = async (text: string) => {
    setLoading(true);
    try {
      const parsedData = await parseResume(text);
      setData(parsedData);
    } catch (error) {
      console.error("Error parsing resume:", error);
      alert("Failed to parse resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (!data) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center p-6">
        <ResumeParser onSubmit={handleResumeSubmit} isLoading={loading} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-darkBg transition-colors duration-300">
      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onShowPrompt={() => setShowPrompt(true)} 
        isDataAvailable={!!data}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section id="hero">
          <Hero data={data} />
        </section>
        
        <section id="about" className="py-20 border-t border-slate-200 dark:border-slate-800">
          <About data={data} />
        </section>
        
        <section id="skills" className="py-20 border-t border-slate-200 dark:border-slate-800">
          <Skills skills={data.skills} />
        </section>
        
        <section id="projects" className="py-20 border-t border-slate-200 dark:border-slate-800">
          <Projects projects={data.projects} />
        </section>
        
        <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-800">
          <Contact data={data} />
        </section>
      </main>

      <footer className="py-10 text-center text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
        <p>© {new Date().getFullYear()} {data.name} — Built with AI Portfolio Architect</p>
      </footer>

      {showPrompt && (
        <PromptDisplay 
          prompt={generateAIPrompt(data)} 
          data={data}
          onClose={() => setShowPrompt(false)} 
        />
      )}
    </div>
  );
};

export default App;
