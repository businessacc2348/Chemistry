import React from 'react';

interface LabBeakerDiagramProps {
  compoundFormula: string;
  compoundType: 'oxide' | 'chloride';
  testedPH: number;
  indicatorColor: string;
  isAnswerSubmitted: boolean;
  actualPH?: number;
  hasFumes?: boolean;
  precipitate?: boolean;
  precipitateLabel?: string;
}

export const LabBeakerDiagram: React.FC<LabBeakerDiagramProps> = ({
  compoundFormula,
  compoundType,
  testedPH,
  indicatorColor,
  isAnswerSubmitted,
  actualPH,
  hasFumes,
  precipitate,
  precipitateLabel
}) => {
  const displayPH = isAnswerSubmitted && actualPH !== undefined ? actualPH : testedPH;

  return (
    <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex flex-col items-center shadow-2xl">
      {/* Title & Status */}
      <div className="w-full flex flex-wrap items-center justify-between text-xs border-b border-slate-800 pb-2.5 mb-2 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono font-bold text-white uppercase tracking-wider">
            Calibrated Hydrolysis Beaker & pH Spectrogram
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-slate-400">Sample:</span>
          <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
            {compoundFormula} + H₂O(l)
          </span>
        </div>
      </div>

      {/* SVG Beaker Graphic */}
      <div className="w-full max-w-md h-64 sm:h-72 flex items-center justify-center">
        <svg viewBox="0 0 400 280" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="fumeGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="beakerGlass" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="10%" stopColor="#94a3b8" stopOpacity="0.08" />
              <stop offset="90%" stopColor="#94a3b8" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Steamy HCl Acid Fumes rising out of beaker */}
          {hasFumes && (
            <g filter="url(#fumeGlow)" className="animate-pulse">
              <path
                d="M 170 70 Q 150 40 165 15 Q 185 30 180 70 Z"
                fill="#ffffff"
                opacity="0.6"
              />
              <path
                d="M 210 70 Q 230 35 215 10 Q 195 25 210 70 Z"
                fill="#ffffff"
                opacity="0.5"
              />
              <circle cx="190" cy="35" r="16" fill="#f8fafc" opacity="0.45" />

              {/* Callout line for HCl Fumes */}
              <line x1="280" y1="35" x2="225" y2="35" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 3" />
              <circle cx="280" cy="35" r="3" fill="#ef4444" />
              <rect x="285" y="22" width="105" height="26" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="1" />
              <text x="337" y="38" fill="#f87171" fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                Steamy HCl(g)
              </text>
            </g>
          )}

          {/* Stirring Glass Rod */}
          <line
            x1="140"
            y1="40"
            x2="245"
            y2="230"
            stroke="#e2e8f0"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Glass Beaker Body */}
          {/* Spout on top-left */}
          <path
            d="M 120 70 L 110 65 L 122 75 L 122 230 Q 122 245 137 245 L 263 245 Q 278 245 278 230 L 278 70 L 120 70 Z"
            fill="#0f172a"
            fillOpacity="0.3"
            stroke="#38bdf8"
            strokeWidth="2.5"
          />

          {/* Liquid level */}
          <path
            d="M 124 125 Q 200 128 276 125 L 276 230 Q 276 243 263 243 L 137 243 Q 124 243 124 230 Z"
            fill={indicatorColor}
            opacity="0.75"
            className="transition-colors duration-500"
          />

          {/* Liquid Meniscus Curve */}
          <ellipse cx="200" cy="125" rx="76" ry="6" fill={indicatorColor} opacity="0.9" />

          {/* Precipitate layer at bottom if insoluble */}
          {precipitate && (
            <g>
              <ellipse cx="200" cy="236" rx="65" ry="7" fill="#f8fafc" opacity="0.9" />
              <line x1="200" y1="236" x2="60" y2="236" stroke="#f8fafc" strokeWidth="1.2" strokeDasharray="3 3" />
              <circle cx="60" cy="236" r="3" fill="#ffffff" />
              <rect x="5" y="222" width="105" height="26" rx="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
              <text x="57" y="238" fill="#f8fafc" fontSize="9" fontFamily="monospace" textAnchor="middle">
                {precipitateLabel || 'White Precipitate'}
              </text>
            </g>
          )}

          {/* Beaker Volume Calibration Marks (50, 100, 150, 200 ml) */}
          <g opacity="0.7" fontFamily="monospace" fontSize="8" fill="#94a3b8">
            <line x1="124" y1="140" x2="142" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="146" y="143">200ml</text>

            <line x1="124" y1="165" x2="138" y2="165" stroke="#94a3b8" strokeWidth="1.2" />
            <text x="142" y="168">150ml</text>

            <line x1="124" y1="190" x2="142" y2="190" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="146" y="193">100ml</text>

            <line x1="124" y1="215" x2="138" y2="215" stroke="#94a3b8" strokeWidth="1.2" />
            <text x="142" y="218">50ml</text>
          </g>

          {/* Glass Specular Reflection Highlight */}
          <rect x="123" y="70" width="155" height="175" rx="10" fill="url(#beakerGlass)" pointerEvents="none" />

          {/* Callout Indicator Badge */}
          <g>
            <line x1="270" y1="160" x2="330" y2="160" stroke={indicatorColor} strokeWidth="1.5" />
            <circle cx="330" cy="160" r="3" fill={indicatorColor} />
            <rect x="290" y="145" width="100" height="30" rx="5" fill="#0f172a" stroke={indicatorColor} strokeWidth="1.2" />
            <text x="340" y="158" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Solution pH:
            </text>
            <text x="340" y="170" fill={indicatorColor} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              pH {displayPH}
            </text>
          </g>

          {/* Bench Surface */}
          <line x1="60" y1="250" x2="340" y2="250" stroke="#475569" strokeWidth="3" />
        </svg>
      </div>

      {/* Universal Indicator Color Spectrum Bar (0 to 14) */}
      <div className="w-full mt-2 bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-xs space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="text-rose-400 font-bold">Strong Acid (0-2)</span>
          <span className="text-amber-400 font-bold">Weak Acid (3-6)</span>
          <span className="text-emerald-400 font-bold">Neutral (7)</span>
          <span className="text-sky-400 font-bold">Weak Base (8-10)</span>
          <span className="text-purple-400 font-bold">Strong Base (12-14)</span>
        </div>

        {/* 15 Swatches */}
        <div className="grid grid-cols-15 gap-1 h-5 rounded-lg overflow-hidden border border-slate-700 p-0.5 bg-slate-950">
          {[
            { ph: 0, color: '#ef4444' },
            { ph: 1, color: '#f87171' },
            { ph: 2, color: '#ea580c' },
            { ph: 3, color: '#f97316' },
            { ph: 4, color: '#fb923c' },
            { ph: 5, color: '#eab308' },
            { ph: 6, color: '#fde047' },
            { ph: 7, color: '#22c55e' },
            { ph: 8, color: '#14b8a6' },
            { ph: 9, color: '#06b6d4' },
            { ph: 10, color: '#38bdf8' },
            { ph: 11, color: '#3b82f6' },
            { ph: 12, color: '#6366f1' },
            { ph: 13, color: '#8b5cf6' },
            { ph: 14, color: '#7e22ce' }
          ].map((item) => (
            <div
              key={item.ph}
              className={`h-full rounded-sm flex items-center justify-center text-[8px] font-mono font-bold transition-transform ${
                Math.round(displayPH) === item.ph ? 'ring-2 ring-white scale-110 z-10' : 'opacity-80'
              }`}
              style={{ backgroundColor: item.color, color: item.ph === 6 || item.ph === 7 ? '#0f172a' : '#ffffff' }}
              title={`pH ${item.ph}`}
            >
              {item.ph}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
