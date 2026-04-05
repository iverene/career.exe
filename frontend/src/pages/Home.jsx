import React, { useState } from 'react';
import { ArrowRight, Cpu, Target, Zap, ShieldCheck, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Tracks mouse position to drive the background gradient
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="bg-[#020617] min-h-screen text-slate-50 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-sky-500/30 relative"
    >
      {/* Interactive Spotlight Gradient 
          This moves with the cursor across the entire background.
      */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.06), transparent 70%)`
        }}
      />

      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        
        {/* Static Animated Blobs (keeping these for baseline depth) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <div className="font-mono text-sky-400 text-lg md:text-xl mb-10 overflow-hidden border-r-2 border-sky-400 whitespace-nowrap animate-typing w-fit mx-auto pr-1">
            initializing career.exe...
          </div>

          <h1 className="text-7xl md:text-7xl font-extrabold leading-[0.9] tracking-tighter text-white">
            EXECUTE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-400 via-indigo-400 to-emerald-400">
              CAREER_PATH
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            A specialized career diagnostic engine designed to calculate your professional readiness and execute a high-impact career trajectory toward your ideal professional alignment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Link 
              to="/quiz"
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300"
            >
              <div className="relative flex items-center bg-slate-950 px-10 py-4 rounded-full border border-slate-800 group-hover:border-sky-500 group-hover:text-sky-400 transition-all duration-300 shadow-lg">
                Run Diagnostic
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
            <div className="w-1 h-10 bg-gradient-to-b from-sky-500 to-transparent rounded-full"></div>
        </div>
      </section>

      {/* --- DIAGNOSTIC PROCESS --- */}
      <section className="py-32 relative z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Diagnostic_Protocols</h2>
            </div>
            <div className="text-sky-500 font-mono text-sm hidden md:block">STATUS: CORE_LOADED</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProcessCard 
              icon={<Cpu size={24} />} 
              title="Skill_Synthesis" 
              desc="Deep-scan of your technical repertoire to identify high-value skill clusters."
            />
            <ProcessCard 
              icon={<BarChart3 size={24} />} 
              title="Metric_Analysis" 
              desc="Quantitative evaluation of professional aptitude through psychometric benchmarks."
            />
            <ProcessCard 
              icon={<Zap size={24} />} 
              title="Neural_Match" 
              desc="Real-time alignment of personal intent with live industry demand vectors."
            />
          </div>
        </div>
      </section>

      {/* --- TRUST FOOTER --- */}
      <section className="py-20 border-y border-slate-900/50 bg-slate-900/10 backdrop-blur-3xl relative z-40">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 opacity-40 grayscale contrast-125">
             <div className="flex items-center gap-2 font-mono font-bold text-xl"><ShieldCheck /> SECURE_DATA</div>
             <div className="flex items-center gap-2 font-mono font-bold text-xl"><Target /> PRECISION_AI</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const ProcessCard = ({ icon, title, desc }) => (
  <div className="relative group p-[1px] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-sky-900 group-hover:to-slate-800 transition-all duration-500"></div>
    
    <div className="relative bg-slate-950/95 backdrop-blur-xl p-10 rounded-[23px] h-full flex flex-col">
      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 mb-8 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 font-mono uppercase tracking-tighter text-white">{title}</h3>
      <p className="text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">{desc}</p>
    </div>
  </div>
);