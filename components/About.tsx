
import React from 'react';
import { PortfolioData } from '../types';

interface AboutProps {
  data: PortfolioData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-neonCyan/10 rounded-3xl blur-2xl"></div>
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
          <img 
            src={`https://picsum.photos/seed/${data.name}/800/800`} 
            alt="Professional Portrait" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-xl border border-neonCyan/20">
          <div className="flex gap-4 items-center">
            <div className="text-neonCyan font-bold text-4xl">5+</div>
            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Years of Research & Development</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
          The <span className="text-neonCyan">Visionary</span> Journey
        </h2>
        <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {data.about.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        
        <div className="mt-10 grid grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-darkSurface border border-slate-200 dark:border-white/5">
            <div className="text-neonCyan font-bold text-2xl mb-1">Impact</div>
            <div className="text-sm opacity-60">Building scalable AI systems for global enterprises.</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-darkSurface border border-slate-200 dark:border-white/5">
            <div className="text-neonCyan font-bold text-2xl mb-1">Focus</div>
            <div className="text-sm opacity-60">LLMs, Computer Vision, and Predictive Analytics.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
