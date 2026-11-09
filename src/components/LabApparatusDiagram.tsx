import React from 'react';
import { ElementSymbol } from '../types/chem';
import { ELEMENTS_DATA, REACTIONS_DATA } from '../data/periodicityData';

interface LabApparatusDiagramProps {
  element: ElementSymbol;
  reagent: 'O2' | 'Cl2' | 'H2O_cold' | 'H2O_steam';
  isReacting: boolean;
  hasReacted: boolean;
}

export const LabApparatusDiagram: React.FC<LabApparatusDiagramProps> = ({
  element,
  reagent,
  isReacting,
  hasReacted
}) => {
  const elData = ELEMENTS_DATA[element];
  const rx = REACTIONS_DATA[element]?.[reagent];

  // Colors based on reaction state
  const flameColor = rx?.flameOrEffectColor || '#f59e0b';
  const isFlameActive = isReacting || hasReacted;

  // Determine apparatus type:
  // - "water_trough": Na or Mg with cold water
  // - "steam_tube": Mg with steam (boiling tube with mineral wool soaked in water, heated Mg ribbon)
  // - "gas_jar": Combustion in O2 or Cl2 (gas jar with deflagrating spoon)
  const apparatusType: 'water_trough' | 'steam_tube' | 'gas_jar' =
    reagent === 'H2O_cold'
      ? 'water_trough'
      : reagent === 'H2O_steam'
      ? 'steam_tube'
      : 'gas_jar';

  return (
    <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex flex-col items-center shadow-2xl">
      {/* Diagram Title & Legend Bar */}
      <div className="w-full flex flex-wrap items-center justify-between text-xs border-b border-slate-800 pb-2.5 mb-2 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono font-bold text-white uppercase tracking-wider">
            Clear Apparatus Schematic: {apparatusType === 'gas_jar' ? 'Combustion in Gas Jar' : apparatusType === 'steam_tube' ? 'Heated Tube with Steam' : 'Pneumatic Trough & Water'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span>Reagent: <strong className="text-amber-400">{reagent === 'O2' ? 'Oxygen O₂' : reagent === 'Cl2' ? 'Chlorine Cl₂' : reagent === 'H2O_cold' ? 'Cold Water H₂O(l)' : 'Steam H₂O(g)'}</strong></span>
          <span>Sample: <strong className="text-indigo-400">{element}</strong></span>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="w-full max-w-xl h-72 sm:h-80 flex items-center justify-center">
        {apparatusType === 'gas_jar' && (
          <svg viewBox="0 0 500 320" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gasGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={reagent === 'Cl2' ? '#84cc16' : '#38bdf8'} stopOpacity={reagent === 'Cl2' ? '0.35' : '0.15'} />
                <stop offset="100%" stopColor={reagent === 'Cl2' ? '#65a30d' : '#0284c7'} stopOpacity={reagent === 'Cl2' ? '0.5' : '0.25'} />
              </linearGradient>
              <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="20%" stopColor="#94a3b8" stopOpacity="0.1" />
                <stop offset="80%" stopColor="#94a3b8" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Gas Jar Lid */}
            <rect x="180" y="35" width="140" height="12" rx="3" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="250" y1="15" x2="250" y2="35" stroke="#94a3b8" strokeWidth="3" />

            {/* Deflagrating Spoon Handle going through lid */}
            <path d="M 250 20 L 250 160 Q 250 180 235 185" fill="none" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Spoon Cup */}
            <path d="M 220 185 C 220 195 245 195 245 185 Z" fill="#94a3b8" stroke="#f1f5f9" strokeWidth="2" />

            {/* Gas Jar Cylinder */}
            <rect x="190" y="47" width="120" height="225" rx="8" fill="url(#gasGrad)" stroke="#38bdf8" strokeWidth="2" opacity="0.9" />
            <rect x="190" y="47" width="120" height="225" rx="8" fill="url(#glassGrad)" />

            {/* Thin layer of sand/water at bottom to prevent cracking */}
            <rect x="192" y="252" width="116" height="18" rx="4" fill="#64748b" opacity="0.6" />

            {/* Sample inside spoon */}
            <circle cx="232" cy="183" r="6" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />

            {/* Flame & reaction smoke when reacting */}
            {isFlameActive && (
              <g filter="url(#glow)">
                {/* Flame */}
                <path
                  d="M 232 182 Q 224 165 232 145 Q 240 165 232 182 Z"
                  fill={flameColor}
                  className="animate-pulse"
                />
                <circle cx="232" cy="175" r="5" fill="#ffffff" opacity="0.9" />

                {/* Dense Smoke Clouds (e.g. P4O10 white smoke, Na2O, or SO2 fumes) */}
                <circle cx="230" cy="130" r="14" fill="#ffffff" opacity="0.45" />
                <circle cx="250" cy="115" r="18" fill="#ffffff" opacity="0.4" />
                <circle cx="225" cy="95" r="22" fill="#ffffff" opacity="0.5" />
                <circle cx="255" cy="75" r="24" fill="#ffffff" opacity="0.35" />
              </g>
            )}

            {/* Bench surface */}
            <line x1="60" y1="274" x2="440" y2="274" stroke="#475569" strokeWidth="3" />

            {/* Clear Callout Labels */}
            {/* Deflagrating Spoon Label */}
            <line x1="160" y1="90" x2="250" y2="110" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="160" cy="90" r="3" fill="#38bdf8" />
            <rect x="30" y="75" width="125" height="24" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="92" y="91" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              Deflagrating Spoon
            </text>

            {/* Gas Jar Label */}
            <line x1="370" y1="90" x2="310" y2="120" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="370" cy="90" r="3" fill="#38bdf8" />
            <rect x="345" y="75" width="135" height="24" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="412" y="91" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              Gas Jar: {reagent === 'Cl2' ? 'Chlorine (Cl₂)' : 'Oxygen (O₂)'}
            </text>

            {/* Burning Sample & Flame Label */}
            <line x1="140" y1="180" x2="225" y2="180" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="140" cy="180" r="3" fill="#f59e0b" />
            <rect x="20" y="168" width="115" height="24" rx="5" fill="#0f172a" stroke="#d97706" strokeWidth="1" />
            <text x="77" y="184" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {element} burning ({elData.name})
            </text>

            {/* Product Observation Label */}
            {hasReacted && (
              <g>
                <line x1="360" y1="185" x2="270" y2="140" stroke="#ec4899" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="360" cy="185" r="3" fill="#ec4899" />
                <rect x="330" y="173" width="150" height="26" rx="5" fill="#0f172a" stroke="#ec4899" strokeWidth="1" />
                <text x="405" y="189" fill="#f472b6" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Product: {rx?.products.split(' ')[0]}
                </text>
              </g>
            )}

            {/* Protective Sand Base Label */}
            <line x1="350" y1="260" x2="305" y2="260" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="350" cy="260" r="3" fill="#94a3b8" />
            <text x="360" y="264" fill="#94a3b8" fontSize="10" fontFamily="monospace">
              Sand layer (heat protection)
            </text>
          </svg>
        )}

        {apparatusType === 'steam_tube' && (
          <svg viewBox="0 0 500 320" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="steamGlow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Boiling Tube (Horizontal with slight tilt) */}
            <path
              d="M 80 140 L 360 140 Q 375 140 375 155 Q 375 170 360 170 L 80 170 Z"
              fill="#0f172a"
              fillOpacity="0.4"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />

            {/* Rubber Bung */}
            <rect x="70" y="137" width="18" height="36" rx="2" fill="#334155" stroke="#64748b" strokeWidth="1.5" />

            {/* Delivery Tube coming out of rubber bung */}
            <path d="M 75 155 L 45 155 L 45 90 L 25 90" fill="none" stroke="#94a3b8" strokeWidth="3" />
            {/* Hydrogen flame at end */}
            {isFlameActive && (
              <path d="M 25 90 Q 15 80 20 65 Q 30 80 25 90 Z" fill="#60a5fa" filter="url(#steamGlow)" />
            )}

            {/* Mineral Wool soaked in water */}
            <path d="M 330 144 Q 355 142 355 155 Q 355 168 330 166 Z" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
            {/* Water drops */}
            <circle cx="340" cy="152" r="2" fill="#38bdf8" />
            <circle cx="348" cy="158" r="2" fill="#38bdf8" />

            {/* Magnesium Ribbon Coiled */}
            <path
              d="M 210 162 Q 220 146 230 162 Q 240 146 250 162"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Heat Burner 1: Heating Mg strongly */}
            <rect x="220" y="220" width="20" height="35" fill="#475569" stroke="#94a3b8" />
            <path d="M 230 220 Q 222 195 230 178 Q 238 195 230 220 Z" fill="#38bdf8" opacity="0.9" filter="url(#steamGlow)" />
            <rect x="205" y="255" width="50" height="8" rx="2" fill="#334155" />

            {/* Heat Burner 2: Gentle warming of wet mineral wool */}
            <rect x="330" y="220" width="16" height="35" fill="#475569" stroke="#94a3b8" />
            <path d="M 338 220 Q 332 205 338 190 Q 344 205 338 220 Z" fill="#f59e0b" opacity="0.7" />
            <rect x="320" y="255" width="36" height="8" rx="2" fill="#334155" />

            {/* Intense Reaction Reaction Glow for Mg + Steam */}
            {isFlameActive && (
              <g filter="url(#steamGlow)">
                <circle cx="230" cy="155" r="22" fill="#ffffff" opacity="0.8" />
                <circle cx="230" cy="155" r="12" fill="#ffffff" />
                {/* White powder MgO forming */}
                <ellipse cx="230" cy="165" rx="24" ry="4" fill="#ffffff" />
              </g>
            )}

            {/* Callout Labels */}
            {/* Mineral Wool */}
            <line x1="380" y1="100" x2="345" y2="148" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" />
            <rect x="330" y="80" width="150" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" />
            <text x="405" y="96" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              Wet Mineral Wool (Steam)
            </text>

            {/* Heated Mg Ribbon */}
            <line x1="230" y1="100" x2="230" y2="140" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" />
            <rect x="160" y="80" width="140" height="24" rx="4" fill="#0f172a" stroke="#f59e0b" />
            <text x="230" y="96" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              Mg Ribbon (heated strongly)
            </text>

            {/* Hydrogen gas burned */}
            <line x1="60" y1="55" x2="25" y2="75" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 3" />
            <rect x="10" y="35" width="130" height="24" rx="4" fill="#0f172a" stroke="#a855f7" />
            <text x="75" y="51" fill="#c084fc" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              H₂(g) burns at jet
            </text>

            {/* Core Syllabus Result callout */}
            <rect x="110" y="280" width="280" height="26" rx="6" fill="#1e1b4b" stroke="#6366f1" />
            <text x="250" y="297" fill="#a5b4fc" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              Syllabus Point: Mg + H₂O(g) → MgO(s) + H₂(g) [White Solid]
            </text>
          </svg>
        )}

        {apparatusType === 'water_trough' && (
          <svg viewBox="0 0 500 320" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Glass Trough */}
            <rect x="90" y="110" width="320" height="140" rx="14" fill="#0f172a" stroke="#64748b" strokeWidth="2.5" />
            {/* Water inside trough with Universal Indicator tint */}
            <path
              d="M 92 145 Q 250 143 408 145 L 408 238 Q 408 248 398 248 L 102 248 Q 92 248 92 238 Z"
              fill={hasReacted ? '#8b5cf6' : 'url(#waterGrad)'}
              opacity="0.65"
              className="transition-colors duration-700"
            />

            {/* Water surface line */}
            <line x1="92" y1="145" x2="408" y2="145" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />

            {/* Sodium metal sphere darting on surface */}
            {isFlameActive && (
              <g className="animate-pulse">
                {/* Golden Yellow flame over Sodium */}
                <circle cx="240" cy="142" r="7" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
                <path d="M 240 142 Q 232 125 240 110 Q 248 125 240 142 Z" fill="#f59e0b" />
                <circle cx="240" cy="132" r="3" fill="#ffffff" />

                {/* Trail of motion & effervescence bubbles */}
                <circle cx="215" cy="148" r="3" fill="#ffffff" opacity="0.7" />
                <circle cx="190" cy="147" r="4" fill="#ffffff" opacity="0.5" />
                <circle cx="270" cy="149" r="3.5" fill="#ffffff" opacity="0.7" />
                <circle cx="295" cy="146" r="2.5" fill="#ffffff" opacity="0.5" />

                {/* Rising H2 gas arrows */}
                <path d="M 235 105 L 235 85 M 231 92 L 235 85 L 239 92" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <path d="M 250 100 L 250 80 M 246 87 L 250 80 L 254 87" stroke="#38bdf8" strokeWidth="2" fill="none" />
              </g>
            )}

            {!isFlameActive && (
              <circle cx="250" cy="144" r="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
            )}

            {/* Callout Labels */}
            {/* Darting Sodium Ball */}
            <line x1="160" y1="70" x2="235" y2="135" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" />
            <rect x="30" y="55" width="170" height="26" rx="5" fill="#0f172a" stroke="#f59e0b" />
            <text x="115" y="72" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {element === 'Na' ? 'Na melts into silvery ball' : 'Mg slowly reacting'}
            </text>

            {/* Universal Indicator Color Shift */}
            <line x1="380" y1="200" x2="310" y2="185" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 3" />
            <rect x="330" y="195" width="160" height="38" rx="5" fill="#0f172a" stroke="#a855f7" />
            <text x="410" y="210" fill="#c084fc" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              Alkaline Solution
            </text>
            <text x="410" y="224" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">
              {element === 'Na' ? 'pH 14 (Purple UI / NaOH)' : 'pH ~9 (Weak / Mg(OH)₂)'}
            </text>

            {/* Glass Trough base */}
            <line x1="50" y1="265" x2="450" y2="265" stroke="#475569" strokeWidth="3" />
          </svg>
        )}
      </div>

      {/* Clear Mark Scheme Observation Legend */}
      <div className="w-full mt-2 bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-mono font-bold">Key Visual Mark:</span>
          <span className="text-slate-200">
            {rx?.observations.split('.')[0] || 'Select an active element and reagent to observe.'}
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          Cambridge Criteria 9.2.1
        </span>
      </div>
    </div>
  );
};
