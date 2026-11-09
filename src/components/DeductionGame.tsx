import React, { useState } from 'react';
import { Search, Flame, Droplets, FlaskConical, Award, HelpCircle, CheckCircle, AlertTriangle, ArrowRight, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MYSTERY_CASES, ELEMENTS_DATA, REACTIONS_DATA, CHLORIDES_DATA, OXIDES_DATA } from '../data/periodicityData';
import { MysteryCase, ElementSymbol } from '../types/chem';
import { sounds } from '../services/soundEffects';

interface DeductionGameProps {
  onAddPoints: (pts: number) => void;
  onSolveCase: () => void;
}

export const DeductionGame: React.FC<DeductionGameProps> = ({ onAddPoints, onSolveCase }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [revealedCluesCount, setRevealedCluesCount] = useState<number>(2);
  const [activeForensicTest, setActiveForensicTest] = useState<'flame' | 'water' | 'naoh' | 'chloride' | null>(null);
  const [selectedGuess, setSelectedGuess] = useState<ElementSymbol | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const activeCase: MysteryCase = MYSTERY_CASES[currentCaseIndex % MYSTERY_CASES.length];
  const targetElement = ELEMENTS_DATA[activeCase.targetElement];

  const handleRevealNextClue = () => {
    sounds.playClick();
    if (revealedCluesCount < activeCase.clues.length) {
      setRevealedCluesCount((prev) => prev + 1);
    }
  };

  const handleSelectGuess = (sym: ElementSymbol) => {
    sounds.playClick();
    if (hasSubmitted) return;
    setSelectedGuess(sym);
  };

  const handleSubmitDeduction = () => {
    if (!selectedGuess) return;

    const correct = selectedGuess === activeCase.targetElement;
    setHasSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playSuccess();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Points scaled by clues used
      const earned = Math.max(50, activeCase.points - (revealedCluesCount - 2) * 20);
      onAddPoints(earned);
      onSolveCase();
    } else {
      sounds.playError();
    }
  };

  const handleNextCase = () => {
    sounds.playClick();
    setCurrentCaseIndex((prev) => prev + 1);
    setRevealedCluesCount(2);
    setActiveForensicTest(null);
    setSelectedGuess(null);
    setHasSubmitted(false);
    setIsCorrect(false);
  };

  // Forensic test outputs for target element
  const getForensicResult = (test: 'flame' | 'water' | 'naoh' | 'chloride') => {
    const sym = activeCase.targetElement;
    if (test === 'flame') {
      if (sym === 'Na') return 'Persistent golden-yellow flame with dense white smoke.';
      if (sym === 'Mg') return 'Intense, blinding brilliant white flame leaving white ash.';
      if (sym === 'Al') return 'White sparks with bright glow when strongly heated.';
      if (sym === 'P') return 'Spontaneously ignites with bright yellow flame & voluminous white smoke.';
      if (sym === 'S') return 'Melts to red liquid, burns with gentle pale blue flame.';
      return 'No characteristic burning flame observed under standard bunsen burner.';
    }
    if (test === 'water') {
      if (sym === 'Na') return 'Violent reaction! Melts to ball, darts on water surface with effervescence; pH 14.';
      if (sym === 'Mg') return 'Very slow with cold water (pH ~9); burns vigorously in steam to give white solid!';
      if (sym === 'P' || sym === 'S') return 'Insoluble in water; oxides produce strongly acidic solutions (pH 1-2).';
      return 'Insoluble in cold water without heating.';
    }
    if (test === 'naoh') {
      if (sym === 'Al') return 'POSITIVE: Oxide dissolves in hot conc NaOH forming colourless aluminate [Al(OH)₄]⁻ (Amphoteric)!';
      if (sym === 'Si') return 'Slowly dissolves in hot conc NaOH to give soluble silicate Na₂SiO₃.';
      if (sym === 'Na' || sym === 'Mg') return 'Basic oxide; no reaction with alkaline sodium hydroxide.';
      return 'Acidic non-metal oxides neutralize NaOH to form soluble salts.';
    }
    if (test === 'chloride') {
      const ch = CHLORIDES_DATA.find((c) => c.element === sym);
      if (!ch) return 'Does not form stable simple chloride.';
      if (ch.reactionWithWater.fumesOfHCl) {
        return `Vigorous/violent hydrolysis: Copious steamy white acidic fumes of HCl gas (pH ${ch.reactionWithWater.pH})!`;
      }
      return `Dissolves without fuming: Solution pH ${ch.reactionWithWater.pH} (neutral/slight hydrolysis).`;
    }
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Dossier Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Syllabus 9.3.2 Forensic Deduction
            </span>
            <span className="text-xs text-slate-400">
              Case {((currentCaseIndex % MYSTERY_CASES.length) + 1)} of {MYSTERY_CASES.length}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-indigo-400" />
            <span>Mystery File: {activeCase.title}</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1 bg-slate-950 rounded-xl text-amber-400 border border-slate-800 font-bold">
            Difficulty: {activeCase.difficulty}
          </span>
          <span className="text-xs font-mono px-3 py-1 bg-slate-950 rounded-xl text-emerald-400 border border-slate-800 font-bold">
            Bounty: {activeCase.points} pts
          </span>
        </div>
      </div>

      {/* Main Deduction Workbench */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Clues Dossier & Forensic Tests (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-amber-400" />
                <span>Forensic Evidence Dossier</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {revealedCluesCount} of {activeCase.clues.length} Clues Unlocked
              </span>
            </div>

            {/* Revealed Clues List */}
            <div className="space-y-3">
              {activeCase.clues.slice(0, revealedCluesCount).map((clue, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-sm animate-in fade-in duration-300"
                >
                  <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                    Clue #{idx + 1} • {clue.category}
                  </span>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {clue.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Unlock More Clues Button */}
            {revealedCluesCount < activeCase.clues.length && !hasSubmitted && (
              <button
                onClick={handleRevealNextClue}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Request Next Forensic Clue (-20 pts bounty)</span>
              </button>
            )}

            {/* Run Forensic Reagent Tests */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Perform Rapid Forensic Reagent Tests on Mystery Sample:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => { sounds.playClick(); setActiveForensicTest('flame'); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    activeForensicTest === 'flame'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Flame className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  Flame Test
                </button>
                <button
                  onClick={() => { sounds.playClick(); setActiveForensicTest('water'); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    activeForensicTest === 'water'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Droplets className="w-4 h-4 mx-auto mb-1 text-sky-400" />
                  Water Test
                </button>
                <button
                  onClick={() => { sounds.playClick(); setActiveForensicTest('naoh'); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    activeForensicTest === 'naoh'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <FlaskConical className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                  Hot NaOH
                </button>
                <button
                  onClick={() => { sounds.playClick(); setActiveForensicTest('chloride'); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    activeForensicTest === 'chloride'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Shield className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                  Chloride Fumes
                </button>
              </div>

              {/* Forensic test result box */}
              {activeForensicTest && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-indigo-500/30 text-xs text-indigo-200 animate-in fade-in duration-200">
                  <strong className="text-white block mb-0.5 capitalize font-mono">
                    Lab Observation ({activeForensicTest} Test):
                  </strong>
                  {getForensicResult(activeForensicTest)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Accusation / Deduction Board (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Select Suspect Element X</h3>
              <p className="text-xs text-slate-400">Match the observations to its position in Period 3:</p>
            </div>

            {/* 8 Element Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {(['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'] as ElementSymbol[]).map((sym) => {
                const el = ELEMENTS_DATA[sym];
                const isSelected = selectedGuess === sym;
                return (
                  <button
                    key={sym}
                    onClick={() => handleSelectGuess(sym)}
                    disabled={hasSubmitted}
                    className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg scale-105'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750 hover:text-white'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-mono">{el.atomicNumber}</span>
                    <span className="text-xl font-mono font-bold">{sym}</span>
                    <span className="text-[10px] text-slate-400 truncate max-w-full">{el.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit Deduction */}
            {!hasSubmitted ? (
              <button
                onClick={handleSubmitDeduction}
                disabled={!selectedGuess}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  !selectedGuess
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white hover:scale-[1.01]'
                }`}
              >
                Confirm Deduction: Element X is {selectedGuess ? ELEMENTS_DATA[selectedGuess].name : '...'}
              </button>
            ) : (
              /* Case Solved / Debrief Card */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div
                  className={`p-4 rounded-xl border ${
                    isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                    )}
                    <h4 className="font-bold text-base text-white">
                      {isCorrect ? 'Case Solved Correctly!' : 'Incorrect Deduction'}
                    </h4>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-200 mb-2">
                    <strong>Identity:</strong> Element X was{' '}
                    <strong className="text-amber-400 font-mono">
                      {targetElement.name} ({targetElement.symbol}, Group {targetElement.group})
                    </strong>
                  </p>

                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <strong className="text-white block mb-1">Cambridge Syllabus Rationale:</strong>
                    {activeCase.explanation}
                  </div>
                </div>

                <button
                  onClick={handleNextCase}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Next Mystery File</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
