import React, { useState } from 'react';
import { Droplets, Flame, CheckCircle, AlertCircle, Sparkles, HelpCircle, ArrowRight, ShieldCheck, Beaker } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OXIDES_DATA, CHLORIDES_DATA } from '../data/periodicityData';
import { OxideData, ChlorideData } from '../types/chem';
import { LabBeakerDiagram } from './LabBeakerDiagram';
import { sounds } from '../services/soundEffects';

interface HydrolysisArenaProps {
  onAddPoints: (pts: number) => void;
  onStreakUpdate: (streak: number) => void;
}

export const HydrolysisArena: React.FC<HydrolysisArenaProps> = ({ onAddPoints, onStreakUpdate }) => {
  const [activeTab, setActiveTab] = useState<'oxides' | 'chlorides' | 'amphoteric'>('oxides');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  
  // Game interaction states
  const [userPHGuess, setUserPHGuess] = useState<number>(7);
  const [userNatureGuess, setUserNatureGuess] = useState<string>('');
  const [userFumesGuess, setUserFumesGuess] = useState<boolean | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const currentOxide: OxideData = OXIDES_DATA[selectedIndex % OXIDES_DATA.length];
  const currentChloride: ChlorideData = CHLORIDES_DATA[selectedIndex % CHLORIDES_DATA.length];

  // Helper for universal indicator color based on pH
  const getUniversalIndicatorColor = (ph: number) => {
    if (ph <= 2) return '#ef4444'; // Red (Strong Acid)
    if (ph <= 4) return '#f97316'; // Orange (Moderate Acid)
    if (ph <= 6) return '#eab308'; // Yellow (Weak Acid)
    if (ph <= 7.5) return '#22c55e'; // Green (Neutral)
    if (ph <= 9) return '#06b6d4'; // Cyan (Weak Alkali)
    if (ph <= 11) return '#3b82f6'; // Blue (Moderate Alkali)
    return '#8b5cf6'; // Purple / Violet (Strong Alkali)
  };

  const resetQuestionState = () => {
    setUserPHGuess(7);
    setUserNatureGuess('');
    setUserFumesGuess(null);
    setIsAnswerSubmitted(false);
  };

  const handleNextCompound = () => {
    sounds.playClick();
    resetQuestionState();
    setSelectedIndex((prev) => prev + 1);
  };

  const handleSubmitOxide = () => {
    const actualPH = currentOxide.reactionWithWater.pH;
    const isPHClose = Math.abs(userPHGuess - actualPH) <= 1.5;
    const isNatureCorrect = userNatureGuess === currentOxide.acidBaseNature;

    setIsAnswerSubmitted(true);

    if (isPHClose && isNatureCorrect) {
      sounds.playSuccess();
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      onStreakUpdate(newStreak);
      onAddPoints(40 + newStreak * 10);
    } else {
      sounds.playError();
      setCurrentStreak(0);
      onStreakUpdate(0);
    }
  };

  const handleSubmitChloride = () => {
    const actualPH = currentChloride.reactionWithWater.pH;
    const isPHClose = Math.abs(userPHGuess - actualPH) <= 1.5;
    const isFumesCorrect = userFumesGuess === currentChloride.reactionWithWater.fumesOfHCl;

    setIsAnswerSubmitted(true);

    if (isPHClose && isFumesCorrect) {
      sounds.playSuccess();
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      onStreakUpdate(newStreak);
      onAddPoints(40 + newStreak * 10);
    } else {
      sounds.playError();
      setCurrentStreak(0);
      onStreakUpdate(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-2 sm:p-3 rounded-2xl">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('oxides'); resetQuestionState(); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'oxides'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Period 3 Oxides (9.2.3 & 9.2.4)
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('chlorides'); resetQuestionState(); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'chlorides'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Period 3 Chlorides (9.2.5)
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('amphoteric'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'amphoteric'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Amphoteric Duel (Al₂O₃ & Al(OH)₃)
          </button>
        </div>

        {/* Streak counter */}
        {activeTab !== 'amphoteric' && (
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Streak:</span>
            <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
              🔥 {currentStreak}
            </span>
          </div>
        )}
      </div>

      {/* Mode 1: Oxides Hydrolysis & pH */}
      {activeTab === 'oxides' && (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Compound Selection Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              Select Period 3 Oxide
            </h3>
            <div className="space-y-2">
              {OXIDES_DATA.map((ox, idx) => {
                const isSelected = selectedIndex % OXIDES_DATA.length === idx;
                return (
                  <button
                    key={ox.formula}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedIndex(idx);
                      resetQuestionState();
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400/80 shadow-md text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-mono font-bold text-base">{ox.formula}</div>
                      <div className="text-xs text-slate-400">{ox.bonding} • {ox.appearance.split(' ')[0]}</div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-amber-400 border border-slate-700">
                        {ox.oxidationNumber >= 0 ? `+${ox.oxidationNumber}` : ox.oxidationNumber}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Arena Challenge Center (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Syllabus 9.2.2 & 9.2.3 Testing
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center gap-2">
                    {currentOxide.formula}
                    <span className="text-sm font-normal text-slate-400">
                      (Oxidation state: <strong className="text-amber-400 font-mono">+{currentOxide.oxidationNumber}</strong>)
                    </span>
                  </h2>
                </div>
                <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  Bonding: <span className="text-slate-200">{currentOxide.bonding}</span>
                </div>
              </div>

              {/* Calibrated Laboratory Beaker Diagram */}
              <LabBeakerDiagram
                compoundFormula={currentOxide.formula}
                compoundType="oxide"
                testedPH={userPHGuess}
                indicatorColor={
                  isAnswerSubmitted
                    ? getUniversalIndicatorColor(currentOxide.reactionWithWater.pH)
                    : getUniversalIndicatorColor(userPHGuess)
                }
                isAnswerSubmitted={isAnswerSubmitted}
                actualPH={currentOxide.reactionWithWater.pH}
                precipitate={!currentOxide.reactionWithWater.reacts || currentOxide.formula === 'MgO'}
                precipitateLabel={
                  currentOxide.formula === 'Al₂O₃' || currentOxide.formula === 'SiO₂'
                    ? 'Insoluble White Solid'
                    : currentOxide.formula === 'MgO'
                    ? 'Sparingly Soluble Suspension'
                    : undefined
                }
              />

              {/* Challenge Inputs */}
              {!isAnswerSubmitted ? (
                <div className="space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                  {/* pH Slider Question */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs sm:text-sm font-semibold text-slate-200">
                        1. Predict the resulting pH when {currentOxide.formula} is added to water:
                      </label>
                      <span className="text-base font-mono font-bold text-amber-400">
                        pH {userPHGuess}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="14"
                      step="0.5"
                      value={userPHGuess}
                      onChange={(e) => setUserPHGuess(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                      <span>0 (Strong Acid)</span>
                      <span>7 (Neutral)</span>
                      <span>14 (Strong Alkali)</span>
                    </div>
                  </div>

                  {/* Acid/Base Nature Buttons */}
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-slate-200 block mb-2">
                      2. Classify the acid/base behaviour of {currentOxide.formula} (Syllabus 9.2.4):
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {(['Basic', 'Amphoteric', 'Acidic'] as const).map((nature) => (
                        <button
                          key={nature}
                          onClick={() => { sounds.playClick(); setUserNatureGuess(nature); }}
                          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                            userNatureGuess === nature
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                          }`}
                        >
                          {nature}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitOxide}
                    disabled={!userNatureGuess}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                      !userNatureGuess
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white'
                    }`}
                  >
                    Submit Prediction & Reveal Mark Scheme Rationale
                  </button>
                </div>
              ) : (
                /* Results & Explanation Panel */
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <h4 className="font-bold text-white text-base">Cambridge Exam Evaluation</h4>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        {currentOxide.acidBaseNature} Oxide
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block mb-1">True pH Range:</span>
                        <span className="font-mono font-bold text-sm text-amber-400">
                          {currentOxide.reactionWithWater.pHRule}
                        </span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block mb-1">Oxidation Number:</span>
                        <span className="font-mono font-bold text-sm text-slate-200">
                          +{currentOxide.oxidationNumber} ({currentOxide.whyOxidationState})
                        </span>
                      </div>
                    </div>

                    <div className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-900/50">
                      <span className="text-xs font-semibold text-indigo-300 block mb-1">Reaction with Water:</span>
                      <code className="font-mono text-sm font-bold text-white block">
                        {currentOxide.reactionWithWater.equation}
                      </code>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {currentOxide.reactionWithWater.observations}
                      </p>
                    </div>

                    {/* Acid/Base equation if applicable */}
                    {currentOxide.reactionsWithAcidBase.acidReaction && (
                      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
                        <span className="font-semibold text-emerald-400 block mb-1">Reaction with Acid:</span>
                        <code className="font-mono text-xs text-slate-200 block mb-1">
                          {currentOxide.reactionsWithAcidBase.acidReaction.equation}
                        </code>
                        <span className="text-slate-400">{currentOxide.reactionsWithAcidBase.acidReaction.observation}</span>
                      </div>
                    )}

                    {currentOxide.reactionsWithAcidBase.baseReaction && (
                      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
                        <span className="font-semibold text-sky-400 block mb-1">Reaction with Base (NaOH):</span>
                        <code className="font-mono text-xs text-slate-200 block mb-1">
                          {currentOxide.reactionsWithAcidBase.baseReaction.equation}
                        </code>
                        <span className="text-slate-400">{currentOxide.reactionsWithAcidBase.baseReaction.observation}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleNextCompound}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl text-white transition-all flex items-center justify-center gap-2"
                  >
                    <span>Next Oxide Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Chlorides Hydrolysis & Steamy Fumes */}
      {activeTab === 'chlorides' && (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Chloride Selection Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              Select Period 3 Chloride (9.2.5)
            </h3>
            <div className="space-y-2">
              {CHLORIDES_DATA.map((ch, idx) => {
                const isSelected = selectedIndex % CHLORIDES_DATA.length === idx;
                return (
                  <button
                    key={ch.formula}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedIndex(idx);
                      resetQuestionState();
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400/80 shadow-md text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-mono font-bold text-base">{ch.formula}</div>
                      <div className="text-xs text-slate-400">{ch.bonding}</div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-sky-400 border border-slate-700">
                        +{ch.oxidationNumber}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chloride Arena Center (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                    Syllabus 9.2.5 Hydrolysis Testing
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center gap-2">
                    {currentChloride.formula}
                    <span className="text-sm font-normal text-slate-400">
                      ({currentChloride.reactionWithWater.type})
                    </span>
                  </h2>
                </div>
                <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  Bonding: <span className="text-slate-200">{currentChloride.bonding}</span>
                </div>
              </div>

              {/* Calibrated Laboratory Beaker Diagram for Chloride Hydrolysis */}
              <LabBeakerDiagram
                compoundFormula={currentChloride.formula}
                compoundType="chloride"
                testedPH={userPHGuess}
                indicatorColor={
                  isAnswerSubmitted
                    ? getUniversalIndicatorColor(currentChloride.reactionWithWater.pH)
                    : getUniversalIndicatorColor(userPHGuess)
                }
                isAnswerSubmitted={isAnswerSubmitted}
                actualPH={currentChloride.reactionWithWater.pH}
                hasFumes={
                  isAnswerSubmitted
                    ? currentChloride.reactionWithWater.fumesOfHCl
                    : userFumesGuess === true
                }
                precipitate={currentChloride.formula === 'SiCl₄' || currentChloride.formula === 'AlCl₃'}
                precipitateLabel={
                  currentChloride.formula === 'SiCl₄'
                    ? 'White Hydrated SiO₂ Precipitate'
                    : currentChloride.formula === 'AlCl₃'
                    ? 'Gelatinous Al(OH)₃ Precipitate'
                    : undefined
                }
              />

              {/* Challenge Inputs */}
              {!isAnswerSubmitted ? (
                <div className="space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs sm:text-sm font-semibold text-slate-200">
                        1. Predict the resulting pH when {currentChloride.formula} is added to water:
                      </label>
                      <span className="text-base font-mono font-bold text-sky-400">
                        pH {userPHGuess}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="14"
                      step="0.5"
                      value={userPHGuess}
                      onChange={(e) => setUserPHGuess(parseFloat(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-slate-200 block mb-2">
                      2. Are steamy acidic white fumes of HCl gas evolved? (Syllabus Key Criterion)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => { sounds.playClick(); setUserFumesGuess(true); }}
                        className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                          userFumesGuess === true
                            ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        Yes, steamy HCl fumes form
                      </button>
                      <button
                        onClick={() => { sounds.playClick(); setUserFumesGuess(false); }}
                        className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                          userFumesGuess === false
                            ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        No fumes (dissolves / hydrates)
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitChloride}
                    disabled={userFumesGuess === null}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                      userFumesGuess === null
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white'
                    }`}
                  >
                    Verify Hydrolysis Prediction
                  </button>
                </div>
              ) : (
                /* Results */
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <h4 className="font-bold text-white text-base">Cambridge Hydrolysis Evaluation</h4>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                        {currentChloride.reactionWithWater.type}
                      </span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                      <span className="text-slate-400 block mb-1">Key Observation & Mark Scheme Phrasing:</span>
                      <p className="text-slate-200 text-sm leading-relaxed font-medium">
                        {currentChloride.reactionWithWater.observations}
                      </p>
                    </div>

                    <div className="bg-sky-950/40 p-3 rounded-lg border border-sky-900/50">
                      <span className="text-xs font-semibold text-sky-300 block mb-1">Hydrolysis Equation:</span>
                      <code className="font-mono text-sm font-bold text-white block">
                        {currentChloride.reactionWithWater.equation}
                      </code>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-300">Why this happens (Electronegativity & Charge Density):</strong>{' '}
                      {currentChloride.reactionWithWater.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextCompound}
                    className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 font-semibold rounded-xl text-white transition-all flex items-center justify-center gap-2"
                  >
                    <span>Next Chloride Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Amphoteric Duel (Al₂O₃ & Al(OH)₃) */}
      {activeTab === 'amphoteric' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Cambridge Syllabus 9.2.4 Essential Focus
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              The Amphoteric Duel: Aluminium Oxide & Hydroxide
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Aluminium is unique in Period 3: its oxide (Al₂O₃) and hydroxide (Al(OH)₃) react with <strong className="text-white">both acids and bases</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Acting as a Base */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Acting as a BASE</h3>
                  <p className="text-xs text-slate-400">Reacts with dilute hydrochloric acid (HCl)</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-rose-400 font-semibold block mb-1">Al₂O₃ with acid:</span>
                  <code className="font-mono text-sm font-bold text-slate-100 block">
                    Al₂O₃(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂O(l)
                  </code>
                  <p className="text-slate-400 mt-1">Insoluble white solid dissolves to give a colourless solution containing hydrated Al³⁺ ions.</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-rose-400 font-semibold block mb-1">Al(OH)₃ with acid:</span>
                  <code className="font-mono text-sm font-bold text-slate-100 block">
                    Al(OH)₃(s) + 3HCl(aq) → AlCl₃(aq) + 3H₂O(l)
                  </code>
                  <p className="text-slate-400 mt-1">White gelatinous precipitate dissolves into a clear solution.</p>
                </div>
              </div>
            </div>

            {/* Acting as an Acid */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Acting as an ACID</h3>
                  <p className="text-xs text-slate-400">Reacts with hot concentrated NaOH (Base)</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-sky-400 font-semibold block mb-1">Al₂O₃ with base:</span>
                  <code className="font-mono text-sm font-bold text-slate-100 block">
                    Al₂O₃(s) + 2NaOH(aq) + 3H₂O(l) → 2Na[Al(OH)₄](aq)
                  </code>
                  <p className="text-slate-400 mt-1">Dissolves to form colourless sodium tetrahydroxoaluminate!</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-sky-400 font-semibold block mb-1">Al(OH)₃ with base:</span>
                  <code className="font-mono text-sm font-bold text-slate-100 block">
                    Al(OH)₃(s) + NaOH(aq) → Na[Al(OH)₄](aq)
                  </code>
                  <p className="text-slate-400 mt-1">Gelatinous white precipitate dissolves in excess NaOH to form aluminate complex.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
