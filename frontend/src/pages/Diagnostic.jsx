import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, X, Target, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import data from '../data/DiagnosticData.json';

export default function Diagnostic() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [customSector, setCustomSector] = useState(false);
  const [customSubField, setCustomSubField] = useState(false);

  const [formData, setFormData] = useState({
    industry: '',
    subField: '',
    hardSkills: [],
    softSkills: Array(15).fill(3),
    intent: ''
  });

  const currentSectorData = data.sectors.find(s => s.name === formData.industry);
  const currentNicheData = currentSectorData?.subFields.find(sf => sf.name === formData.subField);

  const addSkill = (skill) => {
    if (!formData.hardSkills.includes(skill)) {
      setFormData(prev => ({ ...prev, hardSkills: [...prev.hardSkills, skill] }));
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({ ...prev, hardSkills: prev.hardSkills.filter(s => s !== skill) }));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-['Plus_Jakarta_Sans'] relative overflow-hidden">
      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto pt-32 pb-20 px-6">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-sm font-mono text-sky-400 uppercase tracking-[0.3em]">System_Diagnostic</h1>
              <p className="text-2xl font-bold mt-1">
                {step === 1 && "Protocol 01: Skill_Funnel"}
                {step === 2 && "Protocol 02: Soft_Skill_Scan"}
                {step === 3 && "Protocol 03: Intent_Mapping"}
              </p>
            </div>
            <span className="text-slate-500 font-mono text-xs">STEP_0{step}/03</span>
          </div>
          <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-sky-500" 
              initial={{ width: "33%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Part 1 */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              {/* 1. Industry Sector Selection */}
              <div className="space-y-4">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">01. Industry Sector</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-sky-500 outline-none transition-colors"
                  value={customSector ? "others" : formData.industry}
                  onChange={(e) => {
                    if (e.target.value === "others") {
                      setCustomSector(true);
                      setFormData(prev => ({ ...prev, industry: '', subField: '', hardSkills: [] }));
                    } else {
                      setCustomSector(false);
                      setFormData(prev => ({ ...prev, industry: e.target.value, subField: '', hardSkills: [] }));
                    }
                  }}
                >
                  <option value="">Select Industry...</option>
                  {data.sectors.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  <option value="others">Other (Specify...)</option>
                </select>
                {customSector && (
                  <motion.input 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    type="text" placeholder="Specify your industry..."
                    className="w-full bg-slate-950 border border-sky-900/50 p-4 rounded-xl focus:border-sky-500 outline-none"
                    onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  />
                )}
              </div>

              {/* 2. Niche Sub-Field Selection */}
              {(formData.industry) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">02. Niche Sub-Field</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-sky-500 outline-none"
                    value={customSubField ? "others" : formData.subField}
                    onChange={(e) => {
                      if (e.target.value === "others") {
                        setCustomSubField(true);
                        setFormData(prev => ({ ...prev, subField: '', hardSkills: [] }));
                      } else {
                        setCustomSubField(false);
                        setFormData(prev => ({ ...prev, subField: e.target.value, hardSkills: [] }));
                      }
                    }}
                  >
                    <option value="">Select Sub-field...</option>
                    {currentSectorData?.subFields.map(sf => <option key={sf.name} value={sf.name}>{sf.name}</option>)}
                    <option value="others">Other (Specify...)</option>
                  </select>
                  {customSubField && (
                    <motion.input 
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                      type="text" placeholder="Specify your niche..."
                      className="w-full bg-slate-950 border border-sky-900/50 p-4 rounded-xl focus:border-sky-500 outline-none"
                      onChange={(e) => setFormData(prev => ({ ...prev, subField: e.target.value }))}
                    />
                  )}
                </motion.div>
              )}

              {/* 3. Hard Skill Selection */}
              {formData.subField && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">03. Hard Skill Mapping</label>
                  
                  {/* Selected Skill Pills */}
                  <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {formData.hardSkills.map(skill => (
                      <span key={skill} className="bg-sky-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                        {skill}
                        <X size={14} className="cursor-pointer hover:scale-125 transition-transform" onClick={() => removeSkill(skill)} />
                      </span>
                    ))}
                  </div>

                  {/* Suggested Skills & Manual Input */}
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-6">
                    {!customSubField && currentNicheData && (
                      <div className="space-y-3">
                        <p className="text-[10px] font-mono text-slate-600 uppercase">Suggested for {formData.subField}:</p>
                        <div className="flex flex-wrap gap-2">
                          {currentNicheData.skills.map(skill => (
                            <button 
                              key={skill}
                              disabled={formData.hardSkills.includes(skill)}
                              onClick={() => addSkill(skill)}
                              className="px-3 py-1 border border-slate-800 rounded-full text-xs text-slate-400 hover:border-sky-500 hover:text-sky-400 disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-slate-400 transition-all"
                            >
                              + {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Type manual skill and press Enter..." 
                        className="w-full bg-transparent border-b border-slate-800 py-2 outline-none focus:border-sky-500 text-sm transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            addSkill(e.target.value.trim());
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Part 2 */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
               <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl mb-8">
                <p className="text-sm text-slate-400 italic font-light">Rate your natural tendency in professional environments from 1 (Low) to 5 (High).</p>
              </div>
              {[...Array(15)].map((_, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-950/50 border border-slate-900 rounded-xl gap-4">
                  <span className="text-sm text-slate-300">Assessment Protocol {i + 1}: Rate your comfort with complex problem solving.</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        onClick={() => {
                           const newSkills = [...formData.softSkills];
                           newSkills[i] = val;
                           setFormData({ ...formData, softSkills: newSkills });
                        }}
                        className={`w-10 h-10 rounded-lg border font-mono text-xs transition-all ${
                          formData.softSkills[i] === val 
                          ? "bg-sky-500 border-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.3)]" 
                          : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Part 3 */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
               <div className="space-y-4 text-center mb-10">
                <Target className="w-12 h-12 text-sky-400 mx-auto opacity-50" />
                <h2 className="text-3xl font-bold tracking-tight">Professional Intent</h2>
                <p className="text-slate-400">Describe the specific activities or impact you envision for your career.</p>
              </div>
              <textarea 
                className="w-full bg-slate-950 border border-slate-800 p-6 rounded-3xl min-h-[250px] focus:border-sky-500 outline-none transition-all placeholder:text-slate-700 resize-none text-lg leading-relaxed"
                placeholder="I want to develop sustainable energy solutions..."
                onChange={(e) => setFormData({...formData, intent: e.target.value})}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <button 
            onClick={() => setStep(s => Math.max(1, s - 1))}
            className={`flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors font-mono text-xs uppercase tracking-widest ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <button 
            onClick={() => step < 3 ? setStep(s => s + 1) : navigate('/dashboard')}
            className="group flex items-center gap-3 bg-slate-50 text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-sky-400 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          >
            {step === 3 ? "Run Diagnostic" : "Initialize Next Phase"}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
}