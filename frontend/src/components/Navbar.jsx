import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b font-['Plus_Jakarta_Sans',sans-serif] border-slate-900 bg-slate-950/30 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: Logo (Home Link) */}
        <Link to="/" className="flex items-center gap-2 group">

          <img 
            src="/favicon.png" 
            alt="career.exe logo" 
            className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-transform group-hover:scale-110"
          />
          <span className="font-mono text-xl font-bold tracking-tight text-slate-50">
            career<span className="text-sky-400">.exe_</span>
          </span>
        </Link>
        
        {/* Right: Profile Shortcut */}
        <Link 
          to="/profile"
          className="p-2 rounded-full border border-slate-800 bg-slate-900 text-slate-400 hover:text-sky-400 hover:border-sky-500/50 transition-all hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
        >
          <User size={20} />
        </Link>
      </div>
    </nav>
  );
}