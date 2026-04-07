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

  const handleEdit = () => {
    if (answers) {
      navigate('/diagnostic', { state: { editData: answers } });
    } else {
      navigate('/diagnostic');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-['Plus_Jakarta_Sans']">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-18 md:pb-20 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-10 gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight uppercase italic font-mono">
            User_Profile
          </h1>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setActiveTab('answers')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all ${activeTab === 'answers' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Protocol_Data
            </button>
            <button 
              onClick={() => setActiveTab('results')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all ${activeTab === 'results' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Latest_Analysis
            </button>
          </div>
        </div>

        {activeTab === 'answers' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Diagnostic Inputs</h2>
                  <p className="text-slate-500 text-xs sm:text-sm">Your raw system parameters.</p>
                </div>
                <button 
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20 hover:bg-sky-500/20 transition-all text-[9px] sm:text-xs font-mono"
                >
                  <Edit3 size={14} /> EDIT_INPUTS
                </button>
              </div>

              {answers ? (
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-1 sm:mb-2">Sectors</label>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {answers.industry.map(i => (
                        <span key={i} className="px-2 sm:px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[10px] sm:text-sm">{i}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-1 sm:mb-2">Niches & Skills</label>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {answers.hardSkills.map(s => (
                        <span key={s} className="px-2 sm:px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-lg text-[10px] sm:text-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-1 sm:mb-2">Career Intent</label>
                    <p className="text-slate-300 italic text-[10px] sm:text-sm">"{answers.intent}"</p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic">No diagnostic data found.</p>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'results' && results && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 sm:space-y-10 md:space-y-12">
            
            {/* Readiness & Gap Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4">
                <p className="text-emerald-500 font-mono text-[9px] sm:text-[10px] uppercase mb-2 sm:mb-4">Identified_Assets</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {results.readiness.gapAnalysis.whatYouHave.map(asset => (
                    <span key={asset} className="px-2 py-1 text-[9px] sm:text-[10px] bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 font-mono">{asset}</span>
                  ))}
                </div>
                <p className="text-rose-400 font-mono text-[9px] sm:text-[10px] uppercase mb-2 sm:mb-4">Critical_Skill_Gaps</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {results.readiness.gapAnalysis.missing.map(gap => (
                    <span key={gap} className="px-2 py-1 text-[9px] sm:text-[10px] bg-rose-500/10 border border-rose-500/20 rounded text-rose-400 font-mono">{gap}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Matches */}
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-mono text-slate-500 uppercase px-2">Role_Match_Archive</h3>
              <div className="grid grid-cols-1 gap-4">
                {results.topMatches.map((match, idx) => (
                  <div key={idx} className="bg-slate-900/20 border border-slate-800 p-4 sm:p-6 md:p-6 rounded-2xl">
                    <h4 className="font-bold text-white text-sm sm:text-base md:text-lg">{match.title}</h4>
                    <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">{match.description}</p>
                    <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-slate-800/50 text-[9px] sm:text-[10px] font-mono text-sky-500 italic">
                      RATIONALE: {match.matchReason}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Strategic Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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