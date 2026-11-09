import React, { useState } from 'react';
import { Flame, Droplets, Wind, ShieldAlert, Sparkles, CheckCircle2, FlaskConical, Info } from 'lucide-react';
import { ElementSymbol, ElementData } from '../types/chem';
import { ELEMENTS_DATA, REACTIONS_DATA, EQUATION_CHALLENGES } from '../data/periodicityData';
import { EquationBalancer } from './EquationBalancer';
import { LabApparatusDiagram } from './LabApparatusDiagram';
import { sounds } from '../services/soundEffects';

interface ReactionLabProps {
  onAddPoints: (pts: number) => void;
  onExperimentComplete: () => void;
}

export const ReactionLab: React.FC<ReactionLabProps> = ({ onAddPoints, onExperimentComplete }) => {
  const [selectedElement, setSelectedElement] = useState<ElementSymbol>('Na');
  const [selectedReagent, setSelectedReagent] = useState<'O2' | 'Cl2' | 'H2O_cold' | 'H2O_steam'>('O2');
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [reactionTriggered, setReactionTriggered] = useState<boolean>(false);

  const element: ElementData = ELEMENTS_DATA[selectedElement];
  const reaction = REACTIONS_DATA[selectedElement]?.[selectedReagent];

  const handleSelectElement = (sym: ElementSymbol) => {
    sounds.playClick();
    setSelectedElement(sym);
    setReactionTriggered(false);
    // If element doesn't have current reagent, fallback to O2
    if (!REACTIONS_DATA[sym]?.[selectedReagent]) {
      setSelectedReagent('O2');
    }
  };

  const handleSelectReagent = (reagent: 'O2' | 'Cl2' | 'H2O_cold' | 'H2O_steam') => {
    sounds.playClick();
    setSelectedReagent(reagent);
    setReactionTriggered(false);
  };

  const triggerReaction = () => {
    setIsReacting(true);
    setReactionTriggered(true);

    if (selectedReagent === 'O2' || selectedReagent === 'H2O_steam') {
      sounds.playReactionIgnite();
    } else if (selectedReagent === 'H2O_cold') {
      sounds.playBubbling();
    } else if (selectedReagent === 'Cl2') {
      sounds.playAcidFumes();
    }

    setTimeout(() => {
      setIsReacting(false);
      onAddPoints(20);
      onExperimentComplete();
    }, 1200);
  };

  // Find matching equation challenge if available
  const matchingEquation = EQUATION_CHALLENGES.find((eq) => {
    if (selectedElement === 'Na' && selectedReagent === 'O2') return eq.id === 'eq-1';
    if (selectedElement === 'Mg' && selectedReagent === 'H2O_steam') return eq.id === 'eq-2';
    if (selectedElement === 'P' && selectedReagent === 'O2') return eq.id === 'eq-3';
    return false;
  });

  return (
    <div className="space-y-6">
      {/* Element Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base sm:text-lg">Step 1: Choose Period 3 Element</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">Cambridge Syllabus 9.2.1</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {(['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'] as ElementSymbol[]).map((sym) => {
            const el = ELEMENTS_DATA[sym];
            const isSelected = selectedElement === sym;
            return (
              <button
                key={sym}
                onClick={() => handleSelectElement(sym)}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-600/30 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-white scale-105'
                    : 'bg-slate-800/80 border-slate-700/70 hover:bg-slate-750 text-slate-300 hover:text-white'
                }`}
              >
                <span className="text-xs font-mono text-slate-400">{el.atomicNumber}</span>
                <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight">{sym}</span>
                <span className="text-[10px] text-slate-400 truncate max-w-full">{el.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Bench Grid: Reagents & Chamber */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Reagent selection & Element Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Element Quick Dossier */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Target Sample</span>
                <h2 className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
                  {element.name} <span className="text-base text-slate-400">({element.symbol})</span>
                </h2>
              </div>
              <div className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono text-amber-400 border border-slate-700">
                {element.electronConfig}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Valence Electrons:</span>
                <span className="font-bold text-slate-200 font-mono text-sm">{element.valenceElectrons}e⁻ (Group {element.group})</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Structure & Bonding:</span>
                <span className="font-semibold text-slate-200 truncate block">{element.structure.split(' ')[0]} {element.bonding.split(' ')[0]}</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-slate-200">Physical Appearance:</strong> {element.appearance}
            </p>
          </div>

          {/* Reagent Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold text-white text-sm sm:text-base mb-3 flex items-center gap-2">
              <Wind className="w-4 h-4 text-emerald-400" />
              <span>Step 2: Introduce Reagent</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleSelectReagent('O2')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedReagent === 'O2'
                    ? 'bg-amber-500/20 border-amber-400/80 text-white shadow-md'
                    : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm">Oxygen (O₂)</span>
                </div>
                <span className="text-[11px] text-slate-400">Combustion & oxide formation</span>
              </button>

              <button
                onClick={() => handleSelectReagent('Cl2')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedReagent === 'Cl2'
                    ? 'bg-emerald-500/20 border-emerald-400/80 text-white shadow-md'
                    : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm">Chlorine (Cl₂)</span>
                </div>
                <span className="text-[11px] text-slate-400">Halogenation & chloride formation</span>
              </button>

              <button
                onClick={() => handleSelectReagent('H2O_cold')}
                disabled={selectedElement !== 'Na' && selectedElement !== 'Mg'}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedReagent === 'H2O_cold'
                    ? 'bg-sky-500/20 border-sky-400/80 text-white shadow-md'
                    : selectedElement === 'Na' || selectedElement === 'Mg'
                    ? 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-750'
                    : 'opacity-40 bg-slate-800/30 border-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-sm">Cold H₂O</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {selectedElement === 'Na' || selectedElement === 'Mg' ? 'Hydroxide + H₂ gas' : 'Syllabus: Na & Mg only'}
                </span>
              </button>

              <button
                onClick={() => handleSelectReagent('H2O_steam')}
                disabled={selectedElement !== 'Mg'}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedReagent === 'H2O_steam'
                    ? 'bg-cyan-500/20 border-cyan-400/80 text-white shadow-md'
                    : selectedElement === 'Mg'
                    ? 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-750'
                    : 'opacity-40 bg-slate-800/30 border-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-sm">Steam (H₂O(g))</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {selectedElement === 'Mg' ? 'Forms MgO + H₂' : 'Crucial Mg exam contrast'}
                </span>
              </button>
            </div>

            {/* Ignite / Trigger Reaction Button */}
            <div className="mt-5">
              <button
                onClick={triggerReaction}
                disabled={isReacting || !reaction}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
                  !reaction
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : isReacting
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white hover:scale-[1.01]'
                }`}
              >
                <Flame className={`w-5 h-5 ${isReacting ? 'animate-bounce' : ''}`} />
                <span>{isReacting ? 'Simulating Reaction...' : 'Ignite & Observe Reaction'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Reaction Chamber & Observation Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Clear Scientific Laboratory Apparatus Diagram */}
          <LabApparatusDiagram
            element={selectedElement}
            reagent={selectedReagent}
            isReacting={isReacting}
            hasReacted={reactionTriggered}
          />

          {/* Observation & Cambridge Criteria Card */}
          {reaction ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    Official Cambridge Lab Observations
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase font-mono ${
                    reaction.vigorLevel === 'violent'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : reaction.vigorLevel === 'vigorous'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  }`}>
                    {reaction.vigorLevel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {reaction.heatEvolution}
                  </span>
                </div>
              </div>

              {/* Exact Cambridge Mark Scheme Phrasing */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-slate-200 text-sm leading-relaxed">
                <strong className="text-amber-400 block text-xs uppercase tracking-wider mb-1">Mark Scheme Description:</strong>
                {reaction.observations}
              </div>

              {/* Chemical Equation */}
              <div className="bg-indigo-950/30 border border-indigo-800/50 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-indigo-400 font-semibold block uppercase">Balanced Chemical Equation:</span>
                  <code className="text-sm sm:text-base font-mono font-bold text-indigo-200">
                    {reaction.equation}
                  </code>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Product: <strong className="text-slate-200">{reaction.products}</strong>
                </div>
              </div>

              {/* Scientific Rationale */}
              <p className="text-xs text-slate-400 flex items-start gap-1.5">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{reaction.explanation}</span>
              </p>
            </div>
          ) : (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
              <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium">No direct reaction occurs for this element and reagent combination.</p>
              <p className="text-xs text-slate-500 mt-1">Syllabus 9.2.1 focuses on O₂, Cl₂, and water reactions with Na & Mg.</p>
            </div>
          )}

          {/* Integrated Interactive Equation Balancer */}
          {matchingEquation && (
            <EquationBalancer
              equationTitle={matchingEquation.title}
              reactants={matchingEquation.reactants}
              products={matchingEquation.products}
              targetCoefficients={matchingEquation.targetCoefficients}
              notes={matchingEquation.notes}
              onSuccess={() => onAddPoints(50)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
