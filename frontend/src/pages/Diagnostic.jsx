import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, ArrowLeft, X, Target, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import data from "../data/DiagnosticData.json";
import softSkillData from "../data/SoftSkillsData.json";

export default function Diagnostic() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [stepAttempted, setStepAttempted] = useState(false);

  

  // Updated Form State to support multiple selections
  const [formData, setFormData] = useState(
    location.state?.editData || {
      industry: [],
      subField: "",
      hardSkills: [],
      softSkills: Array(15).fill(null),
      intent: ""
    }
  );

  const [customSectors, setCustomSectors] = useState([]);
  const [customNiches, setCustomNiches] = useState([]);

  // Helper to toggle items in arrays
  const toggleItem = (key, value) => {
    setFormData((prev) => {
      const existing = prev[key];
      const updated = existing.includes(value)
        ? existing.filter((i) => i !== value)
        : [...existing, value];
      return { ...prev, [key]: updated };
    });
  };

  const addSkill = (skill) => {
    if (!formData.hardSkills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        hardSkills: [...prev.hardSkills, skill],
      }));
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      hardSkills: prev.hardSkills.filter((s) => s !== skill),
    }));
  };

  // Get all sub-fields for ALL selected industries
  const getAvailableSubFields = () => {
    return data.sectors
      .filter((s) => formData.industry.includes(s.name))
      .flatMap((s) => s.subFields);
  };

  // Get all suggested skills for ALL selected sub-fields
  const getSuggestedSkills = () => {
    const availableSubs = getAvailableSubFields();
    return availableSubs
      .filter((sf) => formData.subField.includes(sf.name))
      .flatMap((sf) => sf.skills);
  };


  const canProgress = () => {
    if (step === 1) {
      // Check if at least one industry and one subfield are selected
      return formData.industry.length > 0 && formData.subField.length > 0;
    }
    if (step === 2) {
      // Check if every question in the 15-question array has a numerical value
      return formData.softSkills.every((skill) => skill !== null);
    }
    if (step === 3) {
      // Ensure the intent text area is not just whitespace
      return formData.intent.trim().length > 0;
    }
    return true;
  };

  const handleNextStep = () => {
    setStepAttempted(true);
    if (canProgress()) {
      setStepAttempted(false);
      if (step < 3) {
        setStep((s) => s + 1);
        window.scrollTo(0, 0);
      } else {
        handleComplete();
      }
    }
  };

  const handleComplete = () => {
    // Save the diagnostic results to localStorage
    localStorage.setItem("career_diagnostic", JSON.stringify(formData));
    // Redirect to the dashboard for analysis
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-['Plus_Jakarta_Sans'] relative overflow-hidden">
      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto pt-32 pb-20 px-6">
        {/* Progress Header Snippet */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-sm font-mono text-sky-400 uppercase tracking-[0.3em]">
                System_Diagnostic
              </h1>
              <p className="text-2xl font-bold mt-1">
                {step === 1 && "Protocol 01: Skill_Funnel"}
                {step === 2 && "Protocol 02: Soft_Skill_Scan"}
                {step === 3 && "Protocol 03: Intent_Mapping"}
              </p>
            </div>
            <span className="text-slate-500 font-mono text-xs">
              STEP_0{step}/03
            </span>
          </div>
          <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sky-500"
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Part 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {/* 1. Multiple Industry Sector Selection */}
              <div className="space-y-4">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  01. Industry Sectors (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-3">
                  {data.sectors.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => toggleItem("industry", s.name)}
                      className={`px-4 py-2 rounded-xl border font-medium transition-all ${
                        formData.industry.includes(s.name)
                          ? "bg-sky-500/20 border-sky-500 text-sky-400"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add other industry..."
                      className="bg-transparent border-b border-slate-800 text-sm py-1 outline-none focus:border-sky-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          toggleItem("industry", e.target.value.trim());
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Multiple Niche Sub-Field Selection */}
              {formData.industry.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                    02. Niche Sub-Fields
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {getAvailableSubFields().map((sf) => (
                      <button
                        key={sf.name}
                        onClick={() => toggleItem("subField", sf.name)}
                        className={`px-4 py-2 rounded-xl border font-medium transition-all ${
                          formData.subField.includes(sf.name)
                            ? "bg-sky-500/20 border-sky-500 text-sky-400"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        {sf.name}
                      </button>
                    ))}
                    <input
                      type="text"
                      placeholder="Add other niche..."
                      className="bg-transparent border-b border-slate-800 text-sm py-1 outline-none focus:border-sky-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          toggleItem("subField", e.target.value.trim());
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* 3. Hard Skill Selection */}
              {formData.subField.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                    03. Hard Skill Mapping
                  </label>

                  {/* Selected Skill Pills */}
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-dashed border-slate-800 rounded-xl">
                    {formData.hardSkills.length === 0 && (
                      <span className="text-slate-700 text-xs italic">
                        Selected skills will appear here...
                      </span>
                    )}
                    {formData.hardSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-sky-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2"
                      >
                        {skill}
                        <X
                          size={14}
                          className="cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </span>
                    ))}
                  </div>

                  {/* Suggested Skills */}
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.1em]">
                      Recommended based on your niches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(getSuggestedSkills())].map((skill) => (
                        <button
                          key={skill}
                          disabled={formData.hardSkills.includes(skill)}
                          onClick={() => addSkill(skill)}
                          className="px-3 py-1 border border-slate-800 rounded-full text-xs text-slate-400 hover:border-sky-500 hover:text-sky-400 disabled:opacity-30 transition-all"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Type custom skill and press Enter..."
                      className="w-full bg-transparent border-b border-slate-800 py-2 outline-none focus:border-sky-500 text-sm transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          addSkill(e.target.value.trim());
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Part 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl mb-10 text-center">
                <h3 className="text-sky-400 font-mono text-xs uppercase tracking-[0.2em] mb-3">
                  Behavioral Profile Scan
                </h3>
                <p className="text-slate-300 text-lg font-light leading-relaxed">
                  Evaluate your typical responses to professional scenarios.
                </p>
              </div>

              <div className="grid gap-6">
                {softSkillData.questions.map((q, i) => (
                  <div
                    key={q.id}
                    className={`flex flex-col p-8 bg-slate-950/50 border rounded-2xl gap-8 transition-all ${
                      formData.softSkills[i] === null && stepAttempted
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-slate-900 hover:border-slate-800"
                    }`}
                  >
                    <div className="flex gap-4">
                      <span className="font-mono text-sky-500/50 text-sm">
                        {q.id.toString().padStart(2, "0")}.
                      </span>
                      <span className="text-slate-200 text-lg leading-relaxed">
                        {q.text}
                      </span>
                    </div>

                    <div className="flex flex-col gap-6">
                      {/* Circular Scale Buttons */}
                      <div className="flex justify-between items-center max-w-md mx-auto w-full relative">
                        {/* Connecting Line behind circles */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800 -z-10" />

                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            onClick={() => {
                              const newSkills = [...formData.softSkills];
                              newSkills[i] = val;
                              setFormData({
                                ...formData,
                                softSkills: newSkills,
                              });
                            }}
                            className={`w-12 h-12 rounded-full border-2 font-mono text-sm transition-all duration-300 flex items-center justify-center ${
                              formData.softSkills[i] === val
                                ? "bg-sky-500 border-sky-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)] scale-110"
                                : "bg-slate-950 border-slate-800 text-slate-500 hover:border-sky-500/50 hover:text-sky-400"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between px-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                        <span>Strongly Disagree</span>
                        <span>Strongly Agree</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Part 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4 text-center mb-10">
                <Target className="w-12 h-12 text-sky-400 mx-auto opacity-50" />
                <h2 className="text-3xl font-bold tracking-tight">
                  Professional Intent
                </h2>
                <p className="text-slate-400">
                  Describe the specific activities or impact you envision for
                  your career.
                </p>
              </div>
              <textarea
                className="w-full bg-slate-950 border border-slate-800 p-6 rounded-3xl min-h-[250px] focus:border-sky-500 outline-none transition-all placeholder:text-slate-700 resize-none text-lg leading-relaxed text-white"
                placeholder="I want to develop sustainable energy solutions..."
                onChange={(e) =>
                  setFormData({ ...formData, intent: e.target.value })
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons Snippet */}
        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className={`flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors font-mono text-xs uppercase tracking-widest ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={handleNextStep}
            className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all ${
              canProgress()
                ? "bg-slate-50 text-slate-950 hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            {step === 3 ? "Run Diagnostic" : "Initialize Next Phase"}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </main>
    </div>
  );
}
