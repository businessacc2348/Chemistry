import React, { useState } from 'react';
import { X, CheckCircle2, BookOpen, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Eye } from 'lucide-react';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({ isOpen, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'both' | 'image' | 'vector'>('both');

  if (!isOpen) return null;

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.8, Math.min(2.8, parseFloat((prev + delta).toFixed(1)))));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl text-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Cambridge AS & A-Level Syllabus Criteria</span>
                <span className="text-xs px-2 py-0.5 rounded font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  9701
                </span>
              </h2>
              <p className="text-xs text-slate-400">Topic 9: Periodicity (Sections 9.1, 9.2, 9.3)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Selector */}
            <div className="hidden sm:flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveView('both')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeView === 'both' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setActiveView('image')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeView === 'image' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Document Image
              </button>
              <button
                onClick={() => setActiveView('vector')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeView === 'vector' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Clear Vector Schematic
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Document Image with Clarity Toolbar */}
          {(activeView === 'both' || activeView === 'image') && (
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3 shadow-xl">
              {/* Image Clarity Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-2 mb-2 border-b border-slate-800 text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Original Uploaded Criteria Document</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleZoom(-0.2)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="font-mono px-2 text-slate-300 min-w-14 text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => handleZoom(0.2)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsHighContrast(!isHighContrast)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      isHighContrast
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {isHighContrast ? 'Normal Contrast' : 'Enhance Contrast'}
                  </button>
                </div>
              </div>

              {/* Scrollable / Zoomable Container */}
              <div className="max-h-[500px] overflow-auto rounded-xl bg-slate-900/60 p-2 border border-slate-800/80 flex items-center justify-center">
                <img
                  src="/assets/aistudio/IMG_0767_0212688b.jpeg"
                  alt="Cambridge AS & A-Level Chemistry Periodicity Syllabus Criteria"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top center',
                    filter: isHighContrast ? 'contrast(135%) brightness(105%) saturate(120%)' : 'none'
                  }}
                  className="w-full max-w-full h-auto rounded-lg transition-transform duration-200 shadow-md"
                />
              </div>
            </div>
          )}

          {/* High-Clarity Vector Diagram of the Cambridge Syllabus Criteria */}
          {(activeView === 'both' || activeView === 'vector') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <h3 className="font-bold text-white text-base">
                  Crystal-Clear Structured Syllabus Diagram (Cambridge 9701)
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* 9.1 Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      9.1 Physical Periodicity (Period 3)
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      Na → Ar
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <strong className="text-white block font-semibold mb-1">
                        1. Physical Property Variations:
                      </strong>
                      <p className="text-slate-400 leading-relaxed">
                        Describe qualitatively trends in:
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1.5 font-mono">
                        <span className="px-2 py-0.5 bg-slate-800 rounded text-amber-300">Atomic radius ↓</span>
                        <span className="px-2 py-0.5 bg-slate-800 rounded text-purple-300">Ionic radius (jump!)</span>
                        <span className="px-2 py-0.5 bg-slate-800 rounded text-sky-300">Melting point (Si peak)</span>
                        <span className="px-2 py-0.5 bg-slate-800 rounded text-emerald-300">Electrical conductivity</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <strong className="text-white block font-semibold mb-1">
                        2. Structure & Bonding Explanations:
                      </strong>
                      <ul className="space-y-1 text-slate-400">
                        <li>• <strong className="text-slate-200">Na, Mg, Al:</strong> Giant metallic lattice (metallic bond strength increases with charge and delocalised electrons).</li>
                        <li>• <strong className="text-slate-200">Si:</strong> Giant 3D covalent macromolecular network (diamond lattice, highest melting point 1687 K).</li>
                        <li>• <strong className="text-slate-200">P₄, S₈, Cl₂, Ar:</strong> Simple molecular / monatomic (held by weak London dispersion forces; S₈ melts higher than P₄ because 128e⁻ &gt; 60e⁻).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 9.3 Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-sky-500/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-sky-400 text-sm">
                      9.3 Chemical Periodicity of Other Elements
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                      Element X Deduction
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <strong className="text-white block font-semibold mb-1">
                        1. Group Characteristic Predictions:
                      </strong>
                      <p className="text-slate-400 leading-relaxed">
                        Predict properties of an element in a given group using knowledge of chemical periodicity across the Periodic Table.
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <strong className="text-white block font-semibold mb-1">
                        2. Forensic Deduction of Unknowns:
                      </strong>
                      <p className="text-slate-400 leading-relaxed">
                        Deduce the nature, possible position in the Periodic Table, and identity of unknown elements from given information about physical and chemical properties.
                      </p>
                      <div className="mt-2 text-[11px] text-amber-300 font-mono bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                        ✓ Implemented in Game Mode "Deduce Element X"
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 9.2 Comprehensive Chemical Periodicity Banner */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono font-bold text-amber-400 text-base">
                    9.2 Periodicity of Chemical Properties of the Elements in Period 3
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Core Cambridge Mark Scheme Criteria
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {/* Point 1 */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-mono text-amber-400 font-bold block">9.2.1 Reactions of Elements</span>
                    <p className="text-slate-300">Reactions & equations with:</p>
                    <div className="font-mono text-[11px] text-slate-400 space-y-1">
                      <div>• <strong>Oxygen:</strong> Na₂O, MgO, Al₂O₃, P₄O₁₀, SO₂</div>
                      <div>• <strong>Chlorine:</strong> NaCl, MgCl₂, AlCl₃, SiCl₄, PCl₅</div>
                      <div>• <strong>Water:</strong> Na & Mg only</div>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-mono text-amber-400 font-bold block">9.2.2 Oxidation Numbers</span>
                    <p className="text-slate-300">State & explain oxidation states in terms of valence electrons:</p>
                    <div className="font-mono text-[11px] text-slate-400 space-y-1">
                      <div>• Oxides: +1, +2, +3, +5, +4, +6</div>
                      <div>• Chlorides: +1, +2, +3, +4, +5</div>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-mono text-amber-400 font-bold block">9.2.3 Oxides with Water & pH</span>
                    <p className="text-slate-300">Likely pHs of solutions:</p>
                    <div className="font-mono text-[11px] text-slate-400 space-y-0.5">
                      <div>• Na₂O: pH 14</div>
                      <div>• MgO: pH 9-10</div>
                      <div>• Al₂O₃ & SiO₂: pH 7 (insoluble)</div>
                      <div>• P₄O₁₀: pH 1-2</div>
                      <div>• SO₂: pH 2-3 / SO₃: pH 1-2</div>
                    </div>
                  </div>

                  {/* Point 4 */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-mono text-amber-400 font-bold block">9.2.4 Acid/Base & Amphoteric</span>
                    <p className="text-slate-300">Behaviour of oxides & hydroxides:</p>
                    <div className="font-mono text-[11px] text-slate-400 space-y-0.5">
                      <div>• Basic: Na₂O, MgO, NaOH, Mg(OH)₂</div>
                      <div className="text-emerald-300 font-bold">• Amphoteric: Al₂O₃ & Al(OH)₃ (reacts with HCl and NaOH)</div>
                      <div>• Acidic: SiO₂, P₄O₁₀, SO₂, SO₃</div>
                    </div>
                  </div>

                  {/* Point 5 */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-mono text-amber-400 font-bold block">9.2.5 Chlorides with Water & pH</span>
                    <p className="text-slate-300">Hydrolysis reactions & steamy fumes:</p>
                    <div className="font-mono text-[11px] text-slate-400 space-y-0.5">
                      <div>• NaCl: pH 7 (dissolves / hydration)</div>
                      <div>• MgCl₂: pH 6.5 (slight hydrolysis)</div>
                      <div>• AlCl₃: pH 3 (steamy HCl fumes)</div>
                      <div>• SiCl₄: pH 1-2 (violent, white SiO₂ ppt)</div>
                      <div>• PCl₅: pH 1 (violent, HCl fumes)</div>
                    </div>
                  </div>

                  {/* Point 6 & 7 */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-mono text-amber-400 font-bold block">9.2.6 & 9.2.7 Bonding & Deduction</span>
                    <p className="text-slate-300">Trends in bonding & electronegativity:</p>
                    <div className="font-mono text-[11px] text-slate-400 space-y-1">
                      <div>• Electronegativity difference decreases across period</div>
                      <div>• Ionic lattice → Covalent molecule shift</div>
                      <div>• Deduce bonding type from melting point & hydrolysis</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 hidden sm:inline">
            Interactive syllabus reference matching Cambridge 9701 Chemistry.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl text-white text-sm transition-colors"
          >
            Close & Return to Lab
          </button>
        </div>
      </div>
    </div>
  );
};
