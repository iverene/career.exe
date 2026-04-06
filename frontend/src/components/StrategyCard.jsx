import React from 'react';

export default function StrategyCard({ icon, title, data }) {
  if (!data) return null;

  return (
    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-slate-700 transition-all h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h4 className="font-mono text-xs text-slate-500 uppercase tracking-[0.2em] leading-tight">
          {title}
        </h4>
      </div>
      
      <div className="space-y-5 flex-grow">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="group/item">
            <p className="text-[10px] font-mono text-sky-500/50 uppercase tracking-widest mb-1 group-hover/item:text-sky-400 transition-colors">
              {key.replace(/([A-Z])/g, '_$1')}
            </p>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              {Array.isArray(value) ? value.join(', ') : value || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}