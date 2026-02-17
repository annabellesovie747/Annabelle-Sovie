
import React, { useEffect, useState } from 'react';
import { Skill } from '../types';
import { Cpu, Database, Layout, Box, GitBranch, Zap, BarChart3, Users, Clock, MessageSquare } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

const IconMap: Record<string, any> = {
  'Backend': Database,
  'Frontend': Layout,
  'AI/ML': Cpu,
  'DevOps': GitBranch,
  'Infrastructure': Box,
  'Management': Users,
  'Business': BarChart3,
  'Communication': MessageSquare,
  'Default': Zap
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [isVisible, setIsVisible] = useState(false);
  const categories = Array.from(new Set(skills.map(s => s.category))) as string[];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="skills-section">
      <style>{`
        @keyframes neon-pulse {
          0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 2px #00F5FF); }
          50% { opacity: 1; filter: drop-shadow(0 0 12px #00F5FF); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .progress-glow {
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #00F5FF;
          border-radius: 50%;
          box-shadow: 0 0 15px #00F5FF, 0 0 30px #00F5FF;
          animation: neon-pulse 2s ease-in-out infinite;
        }
        .skill-bar-container {
          position: relative;
          overflow: hidden;
        }
        .skill-bar-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.1), transparent);
          animation: shimmer 3s infinite;
        }
      `}</style>

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Technical <span className="text-neonCyan neon-text">Arsenal</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          A visual overview of my technical expertise, ranging from core engineering to strategic business management.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map(cat => {
          const catSkills = skills.filter(s => s.category === cat);
          // Try exact match, then partial match, then default
          const Icon = IconMap[cat] || 
                      IconMap[Object.keys(IconMap).find(k => cat.toLowerCase().includes(k.toLowerCase())) || 'Default'];
          
          return (
            <div key={cat} className="glass p-8 rounded-[2rem] border border-white/5 relative group hover:border-neonCyan/30 transition-all duration-500 bg-gradient-to-br from-white/5 to-transparent">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-20 h-20 text-neonCyan" />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-neonCyan/10 flex items-center justify-center text-neonCyan group-hover:neon-glow group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-display font-black text-white uppercase tracking-[0.2em]">{cat}</h3>
              </div>
              
              <div className="space-y-8">
                {catSkills.map(skill => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between mb-3 text-sm font-bold tracking-tight">
                      <span className="text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-neonCyan/70 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5 skill-bar-container">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 via-neonCyan to-white rounded-full transition-all duration-[2000ms] ease-out relative" 
                        style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                      >
                        {isVisible && <div className="progress-glow"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Mastery Level</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full ${i <= 4 ? 'bg-neonCyan/40' : 'bg-slate-800'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
