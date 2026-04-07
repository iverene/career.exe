import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Brain, RefreshCw, Activity, ShieldCheck, Briefcase } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StrategyCard from "../components/StrategyCard";

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
    const stageInterval = setInterval(() => {
      setLoadingStage((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1200);

    const fetchResults = async () => {
      try {
        const storedData = localStorage.getItem("career_diagnostic");
        if (!storedData) {
          window.location.href = "/quiz";
          return;
        }

        const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/career/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userData: JSON.parse(storedData) }),
        });
        const data = await response.json();
        setResults(data);
        localStorage.setItem("career_results", JSON.stringify(data));
        setTimeout(() => setLoading(false), 6000); // ensure user sees loading animation
      } catch (error) {
        console.error("Diagnostic Error:", error);
      }
    };

    fetchResults();
    return () => clearInterval(stageInterval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-slate-50 font-['Plus_Jakarta_Sans'] px-4 sm:px-6 md:px-8">
        <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mb-6 sm:mb-8 md:mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-sky-500/20 rounded-full border-t-sky-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="text-sky-500 animate-pulse" size={24} />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <p className="font-mono text-sky-400 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase animate-pulse">
            {loadingMessages[loadingStage]}
          </p>
          <div className="w-48 sm:w-56 md:w-64 h-1 bg-slate-900 rounded-full overflow-hidden mx-auto">
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

      <main className="max-w-7xl mx-auto pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-18 md:pb-20 px-4 sm:px-6 md:px-8">
        {results ? (
          <>
            <header className="mb-10 sm:mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 md:gap-8">
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center gap-2 text-sky-500 font-mono text-[9px] sm:text-xs uppercase tracking-widest">
                  <ShieldCheck size={12} /> Diagnostic_Complete
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight italic">
                  YOUR_STRATEGIC_PATH
                </h1>
              </div>
              <button
                onClick={() => (window.location.href = "/diagnostic")}
                className="flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-colors font-mono text-xs sm:text-sm uppercase mt-4 md:mt-0"
              >
                <RefreshCw size={16} /> Re_Initialize_Diagnostic
              </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {/* Gap Analysis Card */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-6 md:space-y-8">
                <div className="bg-slate-900/20 border border-slate-800 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-4 md:space-y-6">
                  <h4 className="text-[9px] sm:text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-widest">
                    Skill_Delta_Scan
                  </h4>
                  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-emerald-500 mb-1 sm:mb-2">IDENTIFIED_ASSETS:</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {results.readiness.gapAnalysis.whatYouHave.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400 text-[11px] sm:text-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-rose-500 mb-1 sm:mb-2">CRITICAL_GAPS:</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {results.readiness.gapAnalysis.missing.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded-md text-rose-400 text-[11px] sm:text-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matches & Pillars Section */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-8 md:space-y-10">
                <div className="grid gap-4">
                  <h2 className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-[0.2em] px-2">
                    Optimal_Role_Matches
                  </h2>
                  {results.topMatches?.length ? (
                    results.topMatches.map((match, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/20 border border-slate-800 p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-sky-500/50 transition-all gap-3 sm:gap-0"
                      >
                        <div className="space-y-1 sm:space-y-0">
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">
                            {match.title}
                          </h4>
                          <p className="text-slate-500 text-sm sm:text-base">{match.matchReason}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-rose-400 font-mono italic mb-4 tracking-widest uppercase text-sm sm:text-base">
                        SYSTEM_ERROR: DIAGNOSTIC_FAILED_TO_LOAD
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-slate-800 rounded-full text-xs sm:text-sm font-mono text-sky-400 hover:bg-slate-700 transition-colors"
                      >
                        RETRY_SCAN
                      </button>
                    </div>
                  )}
                </div>

                {/* Strategic Pillars */}
                <section className="space-y-4 sm:space-y-6 md:space-y-8">
                  <h2 className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-[0.2em] px-2">
                    Strategic_Execution_Plan
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    <StrategyCard
                      icon={<Zap className="text-sky-400" />}
                      title="Protocol_01: Technical_Sprint"
                      data={results.strategicPlan.technicalSprint}
                    />
                    <StrategyCard
                      icon={<Brain className="text-emerald-400" />}
                      title="Protocol_02: Behavioral_Lever"
                      data={results.strategicPlan.softSkillLeverage}
                    />
                    <StrategyCard
                      icon={<Briefcase className="text-amber-400" />}
                      title="Protocol_03: Artifact_Build"
                      data={results.strategicPlan.portfolioStrategy}
                    />
                  </div>
                </section>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 px-4 sm:px-6 md:px-8">
            <p className="text-rose-400 font-mono italic">ERROR: FAILED_TO_RETRIEVE_DIAGNOSTIC_DATA</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sky-400 underline"
            >
              Retry Analysis
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}