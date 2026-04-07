// frontend/src/pages/Documentation.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Documentation () {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-20 md:px-8">
        <section className="mb-12 border-l-4 border-blue-500 pl-6 py-2 bg-blue-900/10 rounded-r-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Project Documentation: career.exe</h1>
          <p className="text-blue-400 font-medium">AI-Powered Skill Mapping & Career Diagnostics</p>
          <p className="mt-4 text-sm italic text-gray-400">
            This project is created for submission in <strong>ImpactHacks by HackathonForAll</strong>. 
            ImpactHacks is a beginner-friendly online hackathon empowering students everywhere to turn bold ideas into meaningful solutions.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-blue-300">1. Executive Summary</h2>
            <p className="text-gray-400 leading-relaxed">
              career.exe is a high-performance career diagnostic tool built for students and job-seekers who feel "stuck" between their current capabilities and their professional ambitions.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-blue-300">2. Problem & Solution</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li><strong>Vague Ambitions:</strong> Matching dream jobs to current skills.</li>
              <li><strong>Hidden Strengths:</strong> Uncovering critical soft skills.</li>
              <li><strong>Analysis Paralysis:</strong> Providing direct, actionable feedback.</li>
            </ul>
          </div>
        </div>

        <section className="bg-gray-800/30 p-8 rounded-xl border border-gray-700 mb-12">
          <h2 className="text-2xl font-bold mb-6">3. Technical Architecture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
              <h3 className="font-bold text-white">Frontend</h3>
              <p className="text-xs text-gray-500">React.js & Tailwind CSS</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
              <h3 className="font-bold text-white">Backend</h3>
              <p className="text-xs text-gray-500">Next.js API Routes</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
              <h3 className="font-bold text-white">AI Engine</h3>
              <p className="text-xs text-gray-500">OpenAI (Llama-3.1-8B)</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
              <h3 className="font-bold text-white">Persistence</h3>
              <p className="text-xs text-gray-500">Browser LocalStorage</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">4. System Input & Output</h2>
          <div className="prose prose-invert max-w-none text-gray-400">
            <h3 className="text-white">The 3-Part Diagnostic</h3>
            <p>Users undergo a skill funneling process, a 15-question psychometric assessment, and a narrative intent mapping of their career goals.</p>
            
            <h3 className="text-white mt-6">The Career Report</h3>
            <p>Generates the "North Star" career match, pivot alternatives, and a three-pillar execution strategy (Technical Sprint, Behavioral Leverage, and Proof of Work).</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

