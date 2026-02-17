
import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <div className="relative pt-20 pb-16 lg:pt-32 lg:pb-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonCyan/20 blur-[120px] rounded-full opacity-50"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-600/20 blur-[100px] rounded-full opacity-30"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neonCyan/10 border border-neonCyan/20 text-neonCyan text-xs font-bold tracking-widest uppercase mb-8 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-neonCyan shadow-[0_0_8px_rgba(0,245,255,1)]"></span>
          Ready for Innovation
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 tracking-tight leading-tight">
          Crafting the Future with <span className="text-neonCyan neon-text">Intelligent Code</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          I'm <span className="text-slate-900 dark:text-white font-semibold">{data.name}</span>, {data.summary}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#projects" 
            className="px-8 py-4 bg-neonCyan text-darkBg font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform neon-glow"
          >
            Explore Projects <ArrowRight className="w-5 h-5" />
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 bg-white dark:bg-darkSurface text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Get in Touch
          </a>
        </div>

        <div className="mt-16 flex justify-center gap-8 text-slate-400">
          {data.contact.github && (
            <a href={data.contact.github} className="hover:text-neonCyan transition-colors"><Github className="w-6 h-6" /></a>
          )}
          {data.contact.linkedin && (
            <a href={data.contact.linkedin} className="hover:text-neonCyan transition-colors"><Linkedin className="w-6 h-6" /></a>
          )}
          <a href={`mailto:${data.contact.email}`} className="hover:text-neonCyan transition-colors"><Mail className="w-6 h-6" /></a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
