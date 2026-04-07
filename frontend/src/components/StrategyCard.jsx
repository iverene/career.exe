import React from 'react';

export default function StrategyCard({ icon, title, data }) {
  if (!data) return null;

  return (
    <div className="bg-slate-900/40 border border-slate-800 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] hover:border-slate-700 transition-all h-full flex flex-col">
      
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h4 className="font-mono text-[10px] sm:text-xs md:text-sm text-slate-500 uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-tight">
          {title}
        </h4>
      </div>
      
      <div className="space-y-4 sm:space-y-5 grow">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="group/item">
            <p className="text-[9px] sm:text-[10px] md:text-xs font-mono text-sky-500/50 uppercase tracking-widest mb-1 group-hover/item:text-sky-400 transition-colors">
              {key.replace(/([A-Z])/g, '_$1')}
            </p>
            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
              {Array.isArray(value) ? value.join(', ') : value || "N/A"}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}