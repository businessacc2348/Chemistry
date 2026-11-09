/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, GameTab } from './components/Navbar';
import { ReactionLab } from './components/ReactionLab';
import { HydrolysisArena } from './components/HydrolysisArena';
import { DeductionGame } from './components/DeductionGame';
import { SpeedSorterGame } from './components/SpeedSorterGame';
import { PeriodicTableExplorer } from './components/PeriodicTableExplorer';
import { SyllabusModal } from './components/SyllabusModal';
import { sounds } from './services/soundEffects';
import { Award, Sparkles, BookOpen, Flame, Droplets, Search, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<GameTab>('lab');
  const [totalScore, setTotalScore] = useState<number>(() => {
    const saved = localStorage.getItem('period3_score');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [experimentsCount, setExperimentsCount] = useState<number>(0);
  const [casesSolvedCount, setCasesSolvedCount] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('period3_score', totalScore.toString());
  }, [totalScore]);

  const addPoints = (pts: number) => {
    setTotalScore((prev) => prev + pts);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  const handleStreakUpdate = (streak: number) => {
    if (streak > bestStreak) {
      setBestStreak(streak);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalScore={totalScore}
        onOpenSyllabus={() => setIsSyllabusOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Welcome / Quick Mission Hero */}
        <section className="relative overflow-hidden bg-gradient-to-r from-indigo-950/80 via-slate-900 to-amber-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cambridge 9701 AS & A-Level Chemistry • Period 3 Master Game</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Master Chemical Periodicity Through Real Reaction Gameplay
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Step into the lab to simulate Period 3 reactions with oxygen, chlorine, and water. Predict oxide & chloride hydrolysis pH, balance exam equations, and deduce mystery Element X!
              </p>
            </div>

            {/* Quick stats badges */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 shrink-0">
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl text-center">
                <span className="text-[11px] text-slate-400 block font-medium">Reactions Run</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-amber-400">{experimentsCount}</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl text-center">
                <span className="text-[11px] text-slate-400 block font-medium">Cases Solved</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-purple-400">{casesSolvedCount}</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl text-center">
                <span className="text-[11px] text-slate-400 block font-medium">Best Streak</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-sky-400">{bestStreak}🔥</span>
              </div>
            </div>
          </div>

          {/* Decorative glowing gradient circle */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* Tab Views */}
        {activeTab === 'lab' && (
          <ReactionLab
            onAddPoints={addPoints}
            onExperimentComplete={() => setExperimentsCount((prev) => prev + 1)}
          />
        )}

        {activeTab === 'hydrolysis' && (
          <HydrolysisArena
            onAddPoints={addPoints}
            onStreakUpdate={handleStreakUpdate}
          />
        )}

        {activeTab === 'deduction' && (
          <DeductionGame
            onAddPoints={addPoints}
            onSolveCase={() => setCasesSolvedCount((prev) => prev + 1)}
          />
        )}

        {activeTab === 'trends' && (
          <SpeedSorterGame
            onAddPoints={addPoints}
          />
        )}

        {activeTab === 'table' && (
          <PeriodicTableExplorer />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 font-mono">Period 3 ChemQuest</span>
            <span>•</span>
            <span>Targeting Cambridge AS & A-Level Syllabus Criteria 9.1, 9.2, and 9.3</span>
          </div>
          <button
            onClick={() => setIsSyllabusOpen(true)}
            className="text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View Full Uploaded Criteria Image</span>
          </button>
        </div>
      </footer>

      {/* Syllabus Modal */}
      <SyllabusModal
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
      />
    </div>
  );
}
