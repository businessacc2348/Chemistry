import React, { useState } from 'react';
import { ArrowUpDown, Check, RefreshCw, BarChart3, Info, Sparkles, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SORTING_CHALLENGES, ELEMENTS_DATA } from '../data/periodicityData';
import { ClearTrendChart } from './ClearTrendChart';
import { ElementSymbol } from '../types/chem';
import { sounds } from '../services/soundEffects';

interface SpeedSorterGameProps {
  onAddPoints: (pts: number) => void;
}

export const SpeedSorterGame: React.FC<SpeedSorterGameProps> = ({ onAddPoints }) => {
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState<number>(0);
  const activeChallenge = SORTING_CHALLENGES[selectedChallengeIdx];

  // Scramble order initially
  const [currentOrder, setCurrentOrder] = useState<ElementSymbol[]>(() => {
    return [...activeChallenge.correctOrder].sort(() => Math.random() - 0.5);
  });
  const [selectedForSwap, setSelectedForSwap] = useState<number | null>(null);
  const [hasVerified, setHasVerified] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const resetChallenge = (idx: number) => {
    setSelectedChallengeIdx(idx);
    const challenge = SORTING_CHALLENGES[idx];
    setCurrentOrder([...challenge.correctOrder].sort(() => Math.random() - 0.5));
    setSelectedForSwap(null);
    setHasVerified(false);
    setIsCorrect(false);
  };

  const handleElementClick = (index: number) => {
    sounds.playClick();
    if (hasVerified) return;

    if (selectedForSwap === null) {
      setSelectedForSwap(index);
    } else {
      // Swap elements
      const newOrder = [...currentOrder];
      const temp = newOrder[selectedForSwap];
      newOrder[selectedForSwap] = newOrder[index];
      newOrder[index] = temp;
      setCurrentOrder(newOrder);
      setSelectedForSwap(null);
    }
  };

  const verifyOrder = () => {
    const correct = currentOrder.every((sym, idx) => sym === activeChallenge.correctOrder[idx]);
    setHasVerified(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playSuccess();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
      onAddPoints(100);
    } else {
      sounds.playError();
    }
  };

  // Helper to get real values for graph
  const getElementValue = (sym: ElementSymbol) => {
    const el = ELEMENTS_DATA[sym];
    if (activeChallenge.id === 'sort-mp') return el.meltingPoint;
    if (activeChallenge.id === 'sort-radius') return el.atomicRadius;
    if (activeChallenge.id === 'sort-conductivity') return el.electricalConductivity;
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-2 sm:p-3 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          {SORTING_CHALLENGES.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => { sounds.playClick(); resetChallenge(idx); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedChallengeIdx === idx
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {ch.category} (9.1)
            </button>
          ))}
        </div>

        <button
          onClick={() => resetChallenge(selectedChallengeIdx)}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Shuffle & Retry</span>
        </button>
      </div>

      {/* Main Sorter Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Cambridge 9.1 Physical Trends Challenge
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">{activeChallenge.title}</h2>
          <p className="text-sm text-slate-300 mt-1">{activeChallenge.subtitle}</p>
          <p className="text-xs text-slate-400 mt-1">
            Tip: Click one element, then click another to swap their positions.
          </p>
        </div>

        {/* Sorting Slots */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 py-2">
          {currentOrder.map((sym, idx) => {
            const el = ELEMENTS_DATA[sym];
            const isSelected = selectedForSwap === idx;
            const isSlotCorrect = hasVerified && sym === activeChallenge.correctOrder[idx];
            const isSlotWrong = hasVerified && sym !== activeChallenge.correctOrder[idx];

            return (
              <button
                key={`${sym}-${idx}`}
                onClick={() => handleElementClick(idx)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between relative group ${
                  isSelected
                    ? 'ring-2 ring-amber-400 bg-amber-500/20 border-amber-400 scale-105 shadow-lg'
                    : isSlotCorrect
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-white'
                    : isSlotWrong
                    ? 'bg-rose-950/60 border-rose-500/60 text-white'
                    : 'bg-slate-950/80 border-slate-700/80 hover:border-slate-500 text-slate-200'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400 mb-1">
                  Position #{idx + 1}
                </div>
                <div className="text-2xl font-mono font-extrabold my-1">{sym}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-full">{el.name}</div>

                {hasVerified && (
                  <div className="mt-2 text-[10px] font-mono font-bold">
                    {isSlotCorrect ? (
                      <span className="text-emerald-400">✓ Correct</span>
                    ) : (
                      <span className="text-rose-400">
                        Should be: {activeChallenge.correctOrder[idx]}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Verification Button */}
        {!hasVerified ? (
          <button
            onClick={verifyOrder}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            Check Order Against Cambridge Experimental Trend (+100 pts)
          </button>
        ) : (
          /* Graph & Explanations Panel */
          <div className="space-y-5 animate-in fade-in duration-300">
            <div
              className={`p-4 rounded-xl border ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-white text-base">
                  {isCorrect ? 'Outstanding! Trend Mastered!' : 'Experimental Curve Analysis'}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeChallenge.keyTakeaway}
              </p>
            </div>

            {/* High-Clarity Scientific Trend Diagram */}
            <ClearTrendChart
              trendType={
                activeChallenge.id === 'sort-mp'
                  ? 'mp'
                  : activeChallenge.id === 'sort-radius'
                  ? 'radius'
                  : 'conductivity'
              }
            />

            {/* Individual Explanations Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
              {Object.entries(activeChallenge.explanations).map(([sym, exp]) => (
                <div key={sym} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <strong className="text-amber-400 font-mono mr-1">{sym}:</strong>
                  <span className="text-slate-300">{exp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
