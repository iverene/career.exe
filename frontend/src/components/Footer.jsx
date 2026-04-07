import React from 'react';
import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-2 space-y-4 sm:space-y-6">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group w-fit">
              <img 
                src="/favicon.png" 
                alt="career.exe logo" 
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-transform group-hover:scale-110"
              />
              <span className="font-mono text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-50">
                career<span className="text-sky-400">.exe_</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm max-w-xs leading-relaxed">
              Advancing professional potential through high-precision AI diagnostics and strategic skill mapping.
            </p>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-slate-50 font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6">
              Platform
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-400">
              <li><Link to="/diagnostic" className="hover:text-sky-400 transition-colors">Run Diagnostic</Link></li>
              <li><Link to="/profile" className="hover:text-sky-400 transition-colors">User Profile</Link></li>
              <li><Link to="/docs" className="hover:text-sky-400 transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* System Column */}
          <div>
            <h4 className="text-slate-50 font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6">
              System
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>v1.0.0 Stable</span>
              </li>
              <li className="flex items-center gap-2">
                <Terminal size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-sky-400" />
                <span>Next.js + OpenAI</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono text-slate-600 text-center md:text-left">
          <p>© {currentYear} career.exe. All systems operational.</p>
        </div>

      </div>
    </footer>
  );
}