
import React from 'react';
import { Project } from '../types';
import { ExternalLink, Code2 } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div>
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold">
          Featured <span className="text-neonCyan">Innovations</span>
        </h2>
        <p className="hidden md:block text-slate-500 max-w-md text-right">
          A collection of research, engineering, and architectural triumphs in the field of AI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-darkSurface border border-slate-200 dark:border-white/5 hover:border-neonCyan/30 transition-all duration-500">
            <div className="h-64 overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${project.title}/800/600`} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold group-hover:text-neonCyan transition-colors">{project.title}</h3>
                <div className="flex gap-3">
                  {project.link && (
                    <a href={project.link} className="p-2 rounded-lg bg-white/5 hover:bg-neonCyan/20 text-slate-400 hover:text-neonCyan transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-neonCyan/20 text-slate-400 hover:text-neonCyan transition-all">
                    <Code2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs font-bold rounded-full bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-transparent dark:border-white/10">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
