import React from 'react';
import { FlaskConical, Droplets, Search, TrendingUp, BookOpen, Volume2, VolumeX, Award, Flame } from 'lucide-react';
import { sounds } from '../services/soundEffects';

export type GameTab = 'lab' | 'hydrolysis' | 'deduction' | 'trends' | 'table';

interface NavbarProps {
  activeTab: GameTab;
  onTabChange: (tab: GameTab) => void;
  totalScore: number;
  onOpenSyllabus: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  totalScore,
  onOpenSyllabus,
  soundEnabled,
  onToggleSound
}) => {
  // Determine Chemist Rank based on score
  const getRank = (score: number) => {
    if (score >= 1000) return { title: 'Cambridge Nobel Fellow', color: 'text-amber-400 border-amber-400/40 bg-amber-500/10' };
    if (score >= 600) return { title: 'A-Level Master Chemist', color: 'text-purple-400 border-purple-400/40 bg-purple-500/10' };
    if (score >= 250) return { title: 'Senior Lab Analyst', color: 'text-sky-400 border-sky-400/40 bg-sky-500/10' };
    return { title: 'AS Chemist Apprentice', color: 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10' };
  };

  const rank = getRank(totalScore);

  const tabs: { id: GameTab; label: string; icon: React.ReactNode; badge: string }[] = [
    { id: 'lab', label: 'Reaction Lab', icon: <Flame className="w-4 h-4 text-amber-400" />, badge: '9.2.1' },
    { id: 'hydrolysis', label: 'Hydrolysis & pH Arena', icon: <Droplets className="w-4 h-4 text-sky-400" />, badge: '9.2.3/5' },
    { id: 'deduction', label: 'Deduce Element X', icon: <Search className="w-4 h-4 text-purple-400" />, badge: '9.3' },
    { id: 'trends', label: 'Trend Master', icon: <TrendingUp className="w-4 h-4 text-emerald-400" />, badge: '9.1' },
    { id: 'table', label: 'Period 3 Hub & Revision', icon: <BookOpen className="w-4 h-4 text-indigo-400" />, badge: 'All' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Top brand row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-amber-500 rounded-xl shadow-lg">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Period 3 ChemQuest
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Cambridge AS & A Level (9701)
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Interactive Chemical Periodicity: Reactions, Hydrolysis, pH & Deduction
              </p>
            </div>
          </div>

          {/* Right utilities & score */}
          <div className="flex items-center gap-3">
            {/* Rank badge */}
            <div className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-semibold ${rank.color}`}>
              <Award className="w-4 h-4" />
              <span>{rank.title}</span>
            </div>

            {/* Total Points */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm font-mono shadow-inner">
              <span className="text-slate-400">Score:</span>
              <span className="font-extrabold text-amber-400">{totalScore}</span>
              <span className="text-amber-500/70 text-xs">pts</span>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={() => { sounds.playClick(); onToggleSound(); }}
              className={`p-2 rounded-xl border transition-colors ${
                soundEnabled
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
                  : 'bg-slate-800/40 border-slate-800 text-slate-500'
              }`}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Syllabus Criteria Button */}
            <button
              onClick={() => { sounds.playClick(); onOpenSyllabus(); }}
              className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Syllabus Criteria</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="mt-3 flex overflow-x-auto gap-1 sm:gap-2 no-scrollbar pb-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { sounds.playClick(); onTabChange(tab.id); }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-800 text-white border-indigo-500/50 shadow-md'
                    : 'bg-slate-950/40 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-indigo-500/30 text-indigo-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
