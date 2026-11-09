import React, { useState } from 'react';
import { Layers, ShieldCheck, Flame, Droplets, Info, Sparkles, BookOpen } from 'lucide-react';
import { ELEMENTS_DATA, OXIDES_DATA, CHLORIDES_DATA } from '../data/periodicityData';
import { StructureBondingDiagram } from './StructureBondingDiagram';
import { ElementSymbol, ElementData } from '../types/chem';
import { sounds } from '../services/soundEffects';

export const PeriodicTableExplorer: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementSymbol>('Na');
  const [activePropertyView, setActivePropertyView] = useState<'physical' | 'oxides' | 'chlorides' | 'examWhy'>('physical');

  const element: ElementData = ELEMENTS_DATA[selectedElement];
  const oxide = OXIDES_DATA.find((o) => o.element === selectedElement);
  const chloride = CHLORIDES_DATA.find((c) => c.element === selectedElement);

  return (
    <div className="space-y-6">
      {/* Period 3 Interactive Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Interactive Period 3 Periodic Table
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Period 3 (Sodium to Argon)</h2>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            Electronic Shell: n = 3 (Valence electrons fill 3s & 3p)
          </div>
        </div>

        {/* 8 Elements Row */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {(['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'] as ElementSymbol[]).map((sym) => {
            const el = ELEMENTS_DATA[sym];
            const isSelected = selectedElement === sym;
            return (
              <button
                key={sym}
                onClick={() => { sounds.playClick(); setSelectedElement(sym); }}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600/30 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-white scale-105'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{el.atomicNumber}</span>
                  <span>G{el.group}</span>
                </div>
                <div className="text-2xl font-mono font-bold my-1">{sym}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-full">{el.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Element Detail View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
        {/* Header Strip with View Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold">Atomic # {element.atomicNumber}</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center gap-2">
              {element.name} ({element.symbol})
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Configuration: <strong className="text-indigo-400">{element.electronConfig}</strong> ({element.valenceElectrons} valence e⁻)
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { sounds.playClick(); setActivePropertyView('physical'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePropertyView === 'physical'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              Physical Properties (9.1)
            </button>
            <button
              onClick={() => { sounds.playClick(); setActivePropertyView('oxides'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePropertyView === 'oxides'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              Oxides (9.2.2/3/4)
            </button>
            <button
              onClick={() => { sounds.playClick(); setActivePropertyView('chlorides'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePropertyView === 'chlorides'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              Chlorides (9.2.2/5)
            </button>
            <button
              onClick={() => { sounds.playClick(); setActivePropertyView('examWhy'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePropertyView === 'examWhy'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              Exam Mark Scheme "Why?"
            </button>
          </div>
        </div>

        {/* View 1: Physical Properties */}
        {activePropertyView === 'physical' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Atomic Radius (9.1.1):</span>
              <div className="text-2xl font-mono font-bold text-amber-400 mb-2">{element.atomicRadius} pm</div>
              <p className="text-xs text-slate-400 leading-relaxed">{element.whyRadius}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Melting Point (9.1.2):</span>
              <div className="text-2xl font-mono font-bold text-sky-400 mb-2">
                {element.meltingPoint} K <span className="text-sm text-slate-500 font-normal">({element.meltingPointC} °C)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{element.whyMeltingPoint}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Electrical Conductivity (9.1.2):</span>
              <div className="text-2xl font-mono font-bold text-emerald-400 mb-2">
                {element.electricalConductivity} <span className="text-sm text-slate-500 font-normal">MS/m</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{element.whyConductivity}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Ionic Radius (9.1.1):</span>
              <div className="text-2xl font-mono font-bold text-purple-400 mb-2">
                {element.ionicRadius ? `${element.ionicRadius} pm` : 'N/A'}
                {element.ionicSpecies && <span className="text-xs ml-1 text-slate-400 font-mono">({element.ionicSpecies})</span>}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{element.whyIonicRadius || 'Does not form stable simple ions.'}</p>
            </div>

            {/* Structure & Bonding Molecular Schematic Diagram */}
            <div className="md:col-span-2 lg:col-span-4 mt-2">
              <StructureBondingDiagram element={selectedElement} />
            </div>
          </div>
        )}

        {/* View 2: Oxides */}
        {activePropertyView === 'oxides' && (
          <div>
            {oxide ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono font-bold text-xl text-white">{oxide.formula}</h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      Oxidation State: +{oxide.oxidationNumber}
                    </span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-300">
                    <p><strong className="text-slate-400">Structure:</strong> {oxide.structure}</p>
                    <p><strong className="text-slate-400">Bonding:</strong> {oxide.bonding}</p>
                    <p><strong className="text-slate-400">Nature:</strong> <span className="font-bold text-indigo-400">{oxide.acidBaseNature}</span></p>
                  </div>
                  <div className="text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                    <strong className="text-amber-400 block mb-0.5">Valence Electron Explanation:</strong>
                    {oxide.whyOxidationState}
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-semibold text-sm text-slate-200">Reaction with Water & pH (9.2.3)</h4>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400 block mb-1">Equation:</span>
                    <code className="font-mono font-bold text-white block mb-2">{oxide.reactionWithWater.equation}</code>
                    <span className="text-amber-400 font-bold block mb-1">{oxide.reactionWithWater.pHRule}</span>
                    <p className="text-slate-300 leading-relaxed">{oxide.reactionWithWater.observations}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-6 rounded-xl text-center text-slate-400">
                {selectedElement} does not form a standard stable period 3 oxide studied in syllabus 9.2.
              </div>
            )}
          </div>
        )}

        {/* View 3: Chlorides */}
        {activePropertyView === 'chlorides' && (
          <div>
            {chloride ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono font-bold text-xl text-white">{chloride.formula}</h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                      Oxidation State: +{chloride.oxidationNumber}
                    </span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-300">
                    <p><strong className="text-slate-400">Structure:</strong> {chloride.structure}</p>
                    <p><strong className="text-slate-400">Bonding:</strong> {chloride.bonding}</p>
                    <p><strong className="text-slate-400">Hydrolysis Type:</strong> <span className="font-bold text-sky-400">{chloride.reactionWithWater.type}</span></p>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-semibold text-sm text-slate-200">Hydrolysis with Water & HCl Fumes (9.2.5)</h4>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400 block mb-1">Equation:</span>
                    <code className="font-mono font-bold text-white block mb-2">{chloride.reactionWithWater.equation}</code>
                    <span className="text-sky-400 font-bold block mb-1">
                      pH {chloride.reactionWithWater.pH} • {chloride.reactionWithWater.fumesOfHCl ? 'Steamy white HCl fumes evolved' : 'No steamy fumes'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">{chloride.reactionWithWater.observations}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-6 rounded-xl text-center text-slate-400">
                {selectedElement} does not form a standard stable period 3 chloride studied in syllabus 9.2.
              </div>
            )}
          </div>
        )}

        {/* View 4: Cambridge Exam Mark Scheme "Why?" */}
        {activePropertyView === 'examWhy' && (
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs sm:text-sm">
            <h4 className="font-bold text-amber-400 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Core Cambridge 9701 Exam Mark Schemes for {element.name}</span>
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-white block font-semibold">Q: Why does atomic radius decrease across Period 3?</strong>
                <p className="text-slate-300 leading-relaxed">
                  1. Nuclear charge increases (+11 to +18).
                  <br />2. Electrons are added into the same 3rd shell with similar shielding.
                  <br />3. Effective nuclear charge increases, pulling outer valence electrons more strongly toward the nucleus.
                </p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-white block font-semibold">Q: Why does melting point peak at Silicon?</strong>
                <p className="text-slate-300 leading-relaxed">
                  Silicon has a giant 3D macromolecular covalent lattice (diamond-like structure). Melting requires breaking numerous very strong covalent Si-Si bonds throughout the giant network, requiring massive thermal energy (1687 K).
                </p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-white block font-semibold">Q: Why does Sulfur melt higher than Phosphorus?</strong>
                <p className="text-slate-300 leading-relaxed">
                  Sulfur exists as S₈ crown molecules (128 electrons) whereas phosphorus exists as P₄ tetrahedral molecules (60 electrons). S₈ is larger with more electrons, creating stronger instantaneous dipole-induced dipole (London dispersion) forces!
                </p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-white block font-semibold">Q: Why is Al₂O₃ amphoteric while Na₂O and MgO are basic?</strong>
                <p className="text-slate-300 leading-relaxed">
                  Al³⁺ has a high charge (+3) and small ionic radius (50 pm), giving it very high charge density that polarizes the oxide O²⁻ ions and confers covalent character. It can react both with H⁺ (as a base) and with OH⁻ (as an acid to form [Al(OH)₄]⁻).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
