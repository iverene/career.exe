import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Brain,
  RefreshCw,
  ChevronRight,
  Activity,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [results, setResults] = useState(null);

  const loadingMessages = [
    "INITIALIZING_NEURAL_ENGINE...",
    "SCANNING_TRAIT_MATRICES...",
    "MAPPING_SKILL_DELTAS...",
    "SYNTHESIZING_STRATEGIC_BLUEPRINT...",
    "FINALIZING_REPORT...",
  ];

  useEffect(() => {
    // 1. Simulate "System Analysis" loading sequence
    const stageInterval = setInterval(() => {
      setLoadingStage((prev) =>
        prev < loadingMessages.length - 1 ? prev + 1 : prev,
      );
    }, 1200);

    // 2. Fetch results from backend (Matching LoveHue pattern)
    const fetchResults = async () => {
      try {
        const storedData = localStorage.getItem("career_diagnostic");
        if (!storedData) {
          window.location.href = "/quiz";
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/career/analyze",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userData: JSON.parse(storedData) }),
          },
        );

        const data = await response.json();
        setResults(data);

        // Artificial delay to ensure user sees the "Analysis" feel
        setTimeout(() => setLoading(false), 6000);
      } catch (error) {
        console.error("Diagnostic Error:", error);
      }
    };

    fetchResults();
    return () => clearInterval(stageInterval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-slate-50 font-['Plus_Jakarta_Sans']">
        <div className="relative w-24 h-24 mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-sky-500/20 rounded-full border-t-sky-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="text-sky-500 animate-pulse" size={32} />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <p className="font-mono text-sky-400 text-sm tracking-[0.3em] uppercase animate-pulse">
            {loadingMessages[loadingStage]}
          </p>
          <div className="w-64 h-1 bg-slate-900 rounded-full overflow-hidden mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(loadingStage + 1) * 20}%` }}
              className="h-full bg-sky-500"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-['Plus_Jakarta_Sans']">
      <Navbar />

      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        {results ? (
        <>
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sky-500 font-mono text-xs uppercase tracking-widest">
              <ShieldCheck size={14} /> Diagnostic_Complete
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight italic">
              YOUR_STRATEGIC_PATH
            </h1>
          </div>
          <button
            onClick={() => (window.location.href = "/quiz")}
            className="flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-colors font-mono text-sm uppercase"
          >
            <RefreshCw size={16} /> Re_Initialize_Diagnostic
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Readiness Gauge Card */}
          <div className="lg:col-span-1 bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-md flex flex-col items-center">
            <h3 className="text-slate-500 font-mono text-xs uppercase mb-10 tracking-[0.2em]">
              Readiness_Score
            </h3>
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-800"
                />
                <motion.circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={628}
                  initial={{ strokeDashoffset: 628 }}
                  animate={{
                    strokeDashoffset: 628 * (1 - results.readiness.score / 100),
                  }}
                  className="text-sky-400"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-6xl font-black tracking-tighter">
                  {results?.readiness?.score || 0}%
                </span>
                <span className="text-[10px] font-mono text-sky-500 uppercase tracking-widest">
                  {results?.readiness?.label || 'Calculating...'}
                </span>
              </div>
            </div>

            {/* NEW: Gap Analysis List inside the readiness card */}
            <div className="w-full mt-10 space-y-6">
              <div>
                <p className="text-[10px] font-mono text-emerald-500 uppercase mb-2 tracking-widest">
                  Verified_Assets
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.readiness.gapAnalysis.whatYouHave.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-mono text-rose-500 uppercase mb-2 tracking-widest">
                  Critical_Gaps
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.readiness.gapAnalysis.missing.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] bg-rose-500/10 text-rose-400 px-2 py-1 rounded border border-rose-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Matches & Pillars Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Match Highlight */}
            <div className="grid gap-4">
              <h2 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] px-2">
                Optimal_Role_Matches
              </h2>
              {results && results.topMatches ? (
              results.topMatches.map((match, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/20 border border-slate-800 p-6 rounded-3xl flex items-center justify-between hover:border-sky-500/50 transition-all group"
                >
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                      {match.title}
                    </h4>
                    <p className="text-slate-500 text-sm">
                      {match.matchReason}
                    </p>
                  </div>
                  <ChevronRight className="text-slate-700 group-hover:text-sky-400 transition-colors" />
                </div>
              ))
                ) : (
  <div className="text-center py-20">
      <p className="text-rose-400 font-mono italic mb-4 tracking-widest uppercase text-sm">
        SYSTEM_ERROR: DIAGNOSTIC_FAILED_TO_LOAD
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-6 py-2 bg-slate-800 rounded-full text-xs font-mono text-sky-400 hover:bg-slate-700 transition-colors"
      >
        RETRY_SCAN
      </button>
    </div>
)}
              
            </div>

            {/* Strategic Pillars */}
            <div className="space-y-4">
              <h2 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] px-2">
                Execution_Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StrategyCard
                  icon={<Zap className="text-sky-400" />}
                  title="Technical_Sprint"
                  action={results.strategicPlan.technicalSprint.action}
                  impact={results.strategicPlan.technicalSprint.impact}
                />
                <StrategyCard
                  icon={<Brain className="text-emerald-400" />}
                  title="Behavioral_Lever"
                  action={results.strategicPlan.softSkillLeverage.exercise}
                  impact={results.strategicPlan.softSkillLeverage.powerSkill}
                />
              </div>
            </div>
          </div>
        </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-rose-400 font-mono italic">ERROR: FAILED_TO_RETRIEVE_DIAGNOSTIC_DATA</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-sky-400 underline">Retry Analysis</button>
        </div>
      )}
      </main>
      <Footer />
    </div>
  );
}

function StrategyCard({ icon, title, action, impact }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-slate-700 transition-all">
      <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h4 className="font-mono text-xs text-sky-500 uppercase mb-4 tracking-widest">
        {title}
      </h4>
      <p className="text-slate-200 font-bold mb-2">{action}</p>
      <p className="text-slate-500 text-xs leading-relaxed italic">
        Objective: {impact}
      </p>
    </div>
  );
}
