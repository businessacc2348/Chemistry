import React, { useState, useEffect } from 'react';
import { Check, RotateCcw, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../services/soundEffects';

interface EquationBalancerProps {
  equationTitle: string;
  reactants: string[];
  products: string[];
  targetCoefficients: number[];
  notes?: string;
  onSuccess?: () => void;
}

export const EquationBalancer: React.FC<EquationBalancerProps> = ({
  equationTitle,
  reactants,
  products,
  targetCoefficients,
  notes,
  onSuccess
}) => {
  const totalCount = reactants.length + products.length;
  const [coeffs, setCoeffs] = useState<number[]>(() => Array(totalCount).fill(1));
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  // Reset when equation changes
  useEffect(() => {
    setCoeffs(Array(totalCount).fill(1));
    setIsCorrect(false);
    setHasChecked(false);
  }, [equationTitle, totalCount]);

  const updateCoeff = (index: number, delta: number) => {
    sounds.playClick();
    setCoeffs((prev) => {
      const next = [...prev];
      const newVal = Math.max(1, Math.min(12, next[index] + delta));
      next[index] = newVal;
      return next;
    });
    setHasChecked(false);
  };

  const checkAnswer = () => {
    const correct = coeffs.every((val, idx) => val === targetCoefficients[idx]);
    setHasChecked(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      if (onSuccess) onSuccess();
    } else {
      sounds.playError();
    }
  };

  const resetCoeffs = () => {
    sounds.playClick();
    setCoeffs(Array(totalCount).fill(1));
    setHasChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 sm:p-5 mt-4 text-slate-100 shadow-xl">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h4 className="font-semibold text-sm sm:text-base text-white">Equation Mastery Challenge: {equationTitle}</h4>
        </div>
        <button
          onClick={resetCoeffs}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-800 hover:bg-slate-750"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 mb-4">
        Adjust stoichiometric coefficients to correctly balance the Cambridge Periodicity equation:
      </p>

      {/* Interactive Equation Builder */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4 px-3 bg-slate-950/80 rounded-xl border border-slate-800">
        {/* Reactants */}
        {reactants.map((reactant, rIdx) => {
          const coeffIndex = rIdx;
          return (
            <React.Fragment key={`r-${rIdx}`}>
              {rIdx > 0 && <span className="text-lg font-bold text-slate-400">+</span>}
              <div className="flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => updateCoeff(coeffIndex, 1)}
                    className="w-6 h-4 text-xs font-bold bg-slate-700 hover:bg-indigo-600 rounded flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => updateCoeff(coeffIndex, -1)}
                    className="w-6 h-4 text-xs font-bold bg-slate-700 hover:bg-indigo-600 rounded flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    ▼
                  </button>
                </div>
                <div className="w-7 text-center font-mono font-bold text-lg text-amber-400">
                  {coeffs[coeffIndex]}
                </div>
                <span className="font-mono text-sm sm:text-base font-medium px-1 text-slate-200">
                  {reactant}
                </span>
              </div>
            </React.Fragment>
          );
        })}

        {/* Reaction Arrow */}
        <span className="text-xl font-bold text-indigo-400 px-1">→</span>

        {/* Products */}
        {products.map((product, pIdx) => {
          const coeffIndex = reactants.length + pIdx;
          return (
            <React.Fragment key={`p-${pIdx}`}>
              {pIdx > 0 && <span className="text-lg font-bold text-slate-400">+</span>}
              <div className="flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => updateCoeff(coeffIndex, 1)}
                    className="w-6 h-4 text-xs font-bold bg-slate-700 hover:bg-indigo-600 rounded flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => updateCoeff(coeffIndex, -1)}
                    className="w-6 h-4 text-xs font-bold bg-slate-700 hover:bg-indigo-600 rounded flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    ▼
                  </button>
                </div>
                <div className="w-7 text-center font-mono font-bold text-lg text-emerald-400">
                  {coeffs[coeffIndex]}
                </div>
                <span className="font-mono text-sm sm:text-base font-medium px-1 text-slate-200">
                  {product}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Verification & Feedback */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={checkAnswer}
          className={`w-full sm:w-auto px-5 py-2 font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${
            isCorrect
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-default'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {isCorrect ? (
            <>
              <Check className="w-4 h-4" />
              <span>Balanced Perfectly! (+25 pts)</span>
            </>
          ) : (
            <>
              <Award className="w-4 h-4" />
              <span>Verify Stoichiometry</span>
            </>
          )}
        </button>

        {hasChecked && !isCorrect && (
          <div className="text-xs sm:text-sm text-rose-400 font-medium">
            Not quite balanced yet! Check atom counts on both sides.
          </div>
        )}

        {isCorrect && notes && (
          <div className="text-xs sm:text-sm text-emerald-300 font-medium bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
            ✓ {notes}
          </div>
        )}
      </div>
    </div>
  );
};
