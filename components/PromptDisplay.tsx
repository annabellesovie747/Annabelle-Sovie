
import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode, Zap, Rocket, Download, Loader2, Sparkles, FolderArchive, ArrowRight, ExternalLink } from 'lucide-react';
import JSZip from 'jszip';
import { generatePortfolioSource } from '../services/geminiService';
import { PortfolioData } from '../types';

interface PromptDisplayProps {
  prompt: string;
  data: PortfolioData;
  onClose: () => void;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, data, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sourceCode, setSourceCode] = useState<{ html: string, css: string, js: string } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      const source = await generatePortfolioSource(data);
      setSourceCode(source);
    } catch (err) {
      console.error(err);
      alert("Failed to generate source code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadZip = async () => {
    if (!sourceCode) return;
    
    const zip = new JSZip();
    zip.file("index.html", sourceCode.html);
    zip.file("style.css", sourceCode.css);
    zip.file("script.js", sourceCode.js);
    
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.name.replace(/\s+/g, '_')}_AI_Portfolio.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-darkBg/95 backdrop-blur-2xl" onClick={onClose}></div>
      
      <div className="relative glass w-full max-w-6xl rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-3xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neonCyan/20 rounded-2xl text-neonCyan neon-glow">
              <Rocket className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tighter">Deployment Center</h2>
              <p className="text-sm text-slate-400 font-medium">Expert-Guided Path to a Live Portfolio</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Step 1: Prompt */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-neonCyan text-darkBg flex items-center justify-center text-sm font-black shadow-[0_0_10px_rgba(0,245,255,0.4)]">1</span>
                <h3 className="font-display font-bold text-white text-lg">Meta-Prompt</h3>
              </div>
              <div className="bg-darkBg rounded-2xl border border-white/10 p-6 flex-1 relative group overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-darkBg/50 pointer-events-none"></div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-neonCyan uppercase tracking-widest bg-neonCyan/10 px-2 py-1 rounded">Expert Persona</span>
                  <button onClick={handleCopy} className="p-2 bg-neonCyan/10 text-neonCyan rounded-lg hover:bg-neonCyan hover:text-darkBg transition-all flex items-center gap-2 text-xs font-bold">
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="text-[10px] text-slate-400 font-mono leading-relaxed h-48 overflow-y-auto custom-scrollbar pt-2 pr-2">
                  {prompt}
                </pre>
              </div>
              <p className="mt-4 text-[11px] text-slate-500 leading-relaxed italic">
                Step 1: Copy this "Meta-Prompt" to use in AI Studio for iterative brand refinement.
              </p>
            </div>

            {/* Step 2: Build Source */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-neonCyan text-darkBg flex items-center justify-center text-sm font-black shadow-[0_0_10px_rgba(0,245,255,0.4)]">2</span>
                <h3 className="font-display font-bold text-white text-lg">Architect Code</h3>
              </div>
              <div className="bg-darkBg/50 rounded-2xl border border-white/5 p-6 flex-1 flex flex-col items-center justify-center text-center gap-6 group hover:border-neonCyan/20 transition-all shadow-inner">
                {!sourceCode ? (
                  <>
                    <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-neonCyan group-hover:bg-neonCyan/10 transition-all">
                      <FileCode className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Generate Blueprint</h4>
                      <p className="text-xs text-slate-500 px-4">Let our internal architect generate the production-ready HTML, CSS, and JS files for you.</p>
                    </div>
                    <button 
                      onClick={handleGenerateCode}
                      disabled={isGenerating}
                      className="w-full py-4 bg-white/5 hover:bg-neonCyan hover:text-darkBg transition-all rounded-xl font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-md"
                    >
                      {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {isGenerating ? 'Drafting...' : 'Build Now'}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-3xl bg-neonCyan/20 flex items-center justify-center text-neonCyan neon-glow animate-pulse">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest text-neonCyan">Blueprint Compiled</h4>
                      <p className="text-xs text-slate-500 px-4">Source files are ready for export. Validated for high-end UI standards.</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <button className="w-full py-3 bg-white/10 rounded-lg text-[10px] font-bold text-white border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                        Preview Source <ExternalLink className="w-3 h-3" />
                      </button>
                      <button onClick={() => setSourceCode(null)} className="py-2 text-[9px] font-bold text-slate-600 hover:text-red-400 transition-colors uppercase tracking-widest">Reset Blueprint</button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Step 3: Download */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-neonCyan text-darkBg flex items-center justify-center text-sm font-black shadow-[0_0_10px_rgba(0,245,255,0.4)]">3</span>
                <h3 className="font-display font-bold text-white text-lg">Final Submission</h3>
              </div>
              <div className="bg-darkBg/50 rounded-2xl border border-white/5 p-6 flex-1 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden shadow-inner">
                {!sourceCode && <div className="absolute inset-0 bg-darkBg/60 backdrop-blur-[2px] z-10 flex items-center justify-center font-bold text-xs text-slate-500 uppercase tracking-widest text-center px-6">Architect Source in Step 2 to Unlock Export</div>}
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-slate-500">
                  <FolderArchive className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Download .ZIP Package</h4>
                  <p className="text-xs text-slate-500 px-4">Get your complete bundle. Push this to a GitHub Repo to launch your site immediately.</p>
                </div>
                <button 
                  onClick={handleDownloadZip}
                  disabled={!sourceCode}
                  className="w-full py-5 bg-neonCyan text-darkBg font-black rounded-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all neon-glow shadow-[0_0_30px_rgba(0,245,255,0.3)] disabled:opacity-30 disabled:scale-100 disabled:neon-glow-none uppercase text-sm tracking-tighter"
                >
                  <Download className="w-6 h-6" />
                  DOWNLOAD & SUBMIT
                </button>
              </div>
            </div>

          </div>

          {/* Next Week Teaser Banner */}
          <div className="mt-12 p-12 rounded-[3rem] bg-gradient-to-br from-blue-900/60 via-darkBg to-neonCyan/20 border border-neonCyan/20 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-1000">
              <Rocket className="w-64 h-64 text-white" />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neonCyan/10 border border-neonCyan/20 text-neonCyan text-[11px] font-black uppercase tracking-widest mb-6">
                  <Sparkles className="w-4 h-4 animate-pulse" /> Deployment Evolution
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-black text-white mb-6 leading-tight">
                  Next Week: <span className="text-neonCyan neon-text">One-Click</span> GitHub Launch
                </h3>
                <p className="text-slate-400 text-xl leading-relaxed">
                  Say goodbye to manual downloads. We are finalizing our **Auto-Deploy Engine**. Next week, you can authenticate your GitHub account and we will push your new brand page to live production in under 10 seconds.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-neonCyan/40 flex items-center justify-center animate-spin-slow">
                  <Rocket className="w-12 h-12 text-neonCyan" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-1">Coming Next Week</span>
                  <div className="h-1 w-24 bg-neonCyan rounded-full shadow-[0_0_10px_rgba(0,245,255,1)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/10 flex justify-between items-center rounded-b-3xl bg-white/5">
           <div className="text-[11px] text-slate-500 uppercase font-black tracking-[0.2em]">Step 3 Status: Finalize Brand Export & Submission.</div>
          <button onClick={onClose} className="px-12 py-4 font-bold text-slate-400 hover:text-white transition-all bg-white/5 rounded-2xl border border-transparent hover:border-white/10 uppercase text-xs tracking-widest">Close Center</button>
        </div>
      </div>
      
      <style>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .neon-glow-none { box-shadow: none !important; }
      `}</style>
    </div>
  );
};

export default PromptDisplay;
