
import React from 'react';
import { PortfolioData } from '../types';
import { Mail, Send, MapPin, Download } from 'lucide-react';

interface ContactProps {
  data: PortfolioData;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Let's <span className="text-neonCyan">Connect</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Currently open to high-impact collaborations, research opportunities, and leadership roles in AI/ML.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div className="flex gap-6 items-center">
            <div className="w-14 h-14 rounded-2xl bg-neonCyan/10 flex items-center justify-center text-neonCyan shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Email Me</div>
              <a href={`mailto:${data.contact.email}`} className="text-lg font-medium hover:text-neonCyan transition-colors">{data.contact.email}</a>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <div className="w-14 h-14 rounded-2xl bg-neonCyan/10 flex items-center justify-center text-neonCyan shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Location</div>
              <div className="text-lg font-medium">Remote / Hybrid (Global)</div>
            </div>
          </div>

          <div className="pt-8">
            <button className="w-full py-4 border-2 border-dashed border-neonCyan/30 hover:border-neonCyan hover:bg-neonCyan/5 rounded-2xl flex items-center justify-center gap-3 transition-all group">
              <Download className="w-5 h-5 text-neonCyan group-hover:scale-110 transition-transform" />
              <span className="font-bold text-neonCyan">Download Full Resume</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-3 glass p-8 rounded-3xl border border-white/5">
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                <input type="text" className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neonCyan transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                <input type="email" className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neonCyan transition-colors" placeholder="john@company.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Message</label>
              <textarea rows={4} className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neonCyan transition-colors" placeholder="How can we collaborate?"></textarea>
            </div>
            <button className="w-full py-4 bg-neonCyan text-darkBg font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform neon-glow">
              Send Message <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
