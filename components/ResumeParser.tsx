
import React, { useState } from 'react';
import { Upload, Wand2, Sparkles, Code2 } from 'lucide-react';

interface ResumeParserProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const ResumeParser: React.FC<ResumeParserProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <div className="max-w-3xl w-full">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-neonCyan/10 rounded-3xl border border-neonCyan/20 mb-6 neon-glow">
          <Code2 className="w-10 h-10 text-neonCyan" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Portfolio <span className="text-neonCyan">Architect</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Paste your resume text below. Our AI will craft a high-end, futuristic portfolio and generate a specialized prompt for website builders.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-32 h-32 text-neonCyan" />
        </div>
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest">Resume Content</label>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-80 bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-100 focus:outline-none focus:border-neonCyan transition-colors font-mono text-sm leading-relaxed"
              placeholder="Paste your professional experience, education, and skills here..."
              required
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isLoading || !text.trim()}
            className="w-full py-5 bg-neonCyan text-darkBg font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:scale-100 neon-glow"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-4 border-darkBg/30 border-t-darkBg rounded-full animate-spin"></div>
                Architecting Your Brand...
              </div>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                Build My Portfolio
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-neonCyan font-bold mb-1">AI Optimized</div>
          <div className="text-[10px] uppercase text-slate-500 tracking-tighter">Content tailored for recruiters</div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-neonCyan font-bold mb-1">Futuristic UI</div>
          <div className="text-[10px] uppercase text-slate-500 tracking-tighter">Sleek dark theme aesthetics</div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-neonCyan font-bold mb-1">Ready to Deploy</div>
          <div className="text-[10px] uppercase text-slate-500 tracking-tighter">Export prompt for Build Apps</div>
        </div>
      </div>
    </div>
  );
};

export default ResumeParser;
