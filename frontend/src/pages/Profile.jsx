import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit3, Zap, Brain, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import StrategyCard from '../components/StrategyCard';

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('answers');
  const [answers, setAnswers] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('career_diagnostic');
    const savedResults = localStorage.getItem('career_results');
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedResults) setResults(JSON.parse(savedResults));
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-['Plus_Jakarta_Sans']">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-32 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight uppercase italic font-mono">User_Profile</h1>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setActiveTab('answers')}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${activeTab === 'answers' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Protocol_Data
            </button>
            <button 
              onClick={() => setActiveTab('results')}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${activeTab === 'results' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Latest_Analysis
            </button>
          </div>
        </div>

        {activeTab === 'answers' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold">Diagnostic Inputs</h2>
                  <p className="text-slate-500 text-sm">Your raw system parameters.</p>
                </div>
                <button 
                  onClick={() => navigate('/diagnostic')}
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20 hover:bg-sky-500/20 transition-all text-xs font-mono"
                >
                  <Edit3 size={14} /> EDIT_INPUTS
                </button>
              </div>

              {answers ? (
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-2">Sectors</label>
                    <div className="flex flex-wrap gap-2">
                      {answers.industry.map(i => <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-sm">{i}</span>)}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-2">Niches & Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {answers.hardSkills.map(s => <span key={s} className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-lg text-sm">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-2">Career Intent</label>
                    <p className="text-slate-300 italic">"{answers.intent}"</p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic">No diagnostic data found.</p>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'results' && results && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
    
    {/* Readiness & Gap Summary */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-4">
        <p className="text-emerald-500 font-mono text-[10px] uppercase mb-4">Identified_Assets</p>
        <div className="flex flex-wrap gap-2">
          {results.readiness.gapAnalysis.whatYouHave.map(asset => (
            <span key={asset} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400 font-mono">
              {asset}
            </span>
          ))}
        </div>
        <p className="text-rose-400 font-mono text-[10px] uppercase mb-4">Critical_Skill_Gaps</p>
        <div className="flex flex-wrap gap-2">
          {results.readiness.gapAnalysis.missing.map(gap => (
            <span key={gap} className="px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded text-[10px] text-rose-400 font-mono">
              {gap}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Matches */}
    <div className="space-y-4">
      <h3 className="text-xs font-mono text-slate-500 uppercase px-2">Role_Match_Archive</h3>
      <div className="grid gap-4">
        {results.topMatches.map((match, idx) => (
          <div key={idx} className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl">
            <h4 className="font-bold text-white">{match.title}</h4>
            <p className="text-sm text-slate-500 mt-2">{match.description}</p>
            <div className="mt-4 pt-4 border-t border-slate-800/50 text-[10px] font-mono text-sky-500 italic">
              RATIONALE: {match.matchReason}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Full Strategic Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <StrategyCard 
         icon={<Zap size={20} className="text-sky-400" />} 
         title="Technical_Sprint" 
         data={results.strategicPlan.technicalSprint} 
       />
       <StrategyCard 
         icon={<Brain size={20} className="text-emerald-400" />} 
         title="Behavioral_Lever" 
         data={results.strategicPlan.softSkillLeverage} 
       />
       <StrategyCard 
         icon={<Briefcase size={20} className="text-amber-400" />} 
         title="Portfolio_Plan" 
         data={results.strategicPlan.portfolioStrategy} 
       />
    </div>

    
  </motion.div>
)}
      </main>
      <Footer />
    </div>
  );
}