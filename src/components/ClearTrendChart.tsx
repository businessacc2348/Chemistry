import React, { useState } from 'react';
import { ElementSymbol } from '../types/chem';
import { ELEMENTS_DATA } from '../data/periodicityData';
import { Sparkles, TrendingUp, Info } from 'lucide-react';

interface ClearTrendChartProps {
  trendType: 'mp' | 'radius' | 'conductivity' | 'ionic_radius';
}

export const ClearTrendChart: React.FC<ClearTrendChartProps> = ({ trendType }) => {
  const [hoveredElement, setHoveredElement] = useState<ElementSymbol | null>(null);
  const elements: ElementSymbol[] = ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'];

  // Data config
  const configs = {
    mp: {
      title: 'Melting Point across Period 3 (K)',
      unit: 'K',
      minY: 0,
      maxY: 1800,
      yTicks: [0, 400, 800, 1200, 1600],
      strokeColor: '#f59e0b',
      fillColor: 'rgba(245, 158, 11, 0.15)',
      getData: (sym: ElementSymbol) => ELEMENTS_DATA[sym].meltingPoint,
      annotationSi: 'Peak: Giant covalent (1687 K)',
      annotationS: 'S₈ > P₄ (128e⁻ vs 60e⁻)',
      annotationMetals: 'Metallic: Na < Mg < Al'
    },
    radius: {
      title: 'Atomic Radius across Period 3 (pm)',
      unit: 'pm',
      minY: 80,
      maxY: 200,
      yTicks: [80, 110, 140, 170, 200],
      strokeColor: '#38bdf8',
      fillColor: 'rgba(56, 189, 248, 0.15)',
      getData: (sym: ElementSymbol) => ELEMENTS_DATA[sym].atomicRadius,
      annotationSi: 'Continuous decrease across period',
      annotationS: 'Increasing nuclear charge pulls electrons',
      annotationMetals: 'Shielding remains constant (n=3)'
    },
    conductivity: {
      title: 'Electrical Conductivity across Period 3 (MS/m)',
      unit: 'MS/m',
      minY: 0,
      maxY: 42,
      yTicks: [0, 10, 20, 30, 40],
      strokeColor: '#10b981',
      fillColor: 'rgba(16, 185, 129, 0.15)',
      getData: (sym: ElementSymbol) => ELEMENTS_DATA[sym].electricalConductivity,
      annotationSi: 'Si: Semiconductor (0.001)',
      annotationS: 'Non-metals: 0 (Insulators)',
      annotationMetals: 'Rises: 1, 2, 3 mobile e⁻ per atom'
    },
    ionic_radius: {
      title: 'Ionic vs Atomic Radius across Period 3 (pm)',
      unit: 'pm',
      minY: 0,
      maxY: 230,
      yTicks: [0, 50, 100, 150, 200],
      strokeColor: '#c084fc',
      fillColor: 'rgba(192, 132, 252, 0.15)',
      getData: (sym: ElementSymbol) => ELEMENTS_DATA[sym].ionicRadius || 0,
      annotationSi: 'No stable simple ion for Si',
      annotationS: 'Anions (P³⁻, S²⁻, Cl⁻) expand: electron repulsion',
      annotationMetals: 'Cations (Na⁺, Mg²⁺, Al³⁺) lose shell'
    }
  };

  const config = configs[trendType] || configs.mp;

  // Chart Dimensions
  const width = 640;
  const height = 300;
  const paddingLeft = 55;
  const paddingRight = 40;
  const paddingTop = 45;
  const paddingBottom = 45;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  // Scaling helpers
  const getX = (index: number) => paddingLeft + (index / (elements.length - 1)) * plotWidth;
  const getY = (val: number) => {
    const range = config.maxY - config.minY;
    const clamped = Math.max(config.minY, Math.min(config.maxY, val));
    return paddingTop + plotHeight - ((clamped - config.minY) / range) * plotHeight;
  };

  // Generate path string
  const points = elements.map((sym, idx) => ({
    sym,
    x: getX(idx),
    y: getY(config.getData(sym)),
    val: config.getData(sym)
  }));

  const linePath = points
    .filter((p) => p.val > 0)
    .reduce((acc, curr, idx) => (idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`), '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + plotHeight} L ${points[0].x} ${paddingTop + plotHeight} Z`;

  return (
    <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-2xl relative">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base font-mono">{config.title}</h3>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Cambridge Syllabus 9.1.1 & 9.1.2 Scientific Trend Diagram
        </div>
      </div>

      {/* SVG Container */}
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px] select-none font-mono">
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={config.strokeColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={config.strokeColor} stopOpacity="0.0" />
            </linearGradient>
            <filter id="pointGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Lines & Y-Axis Labels */}
          {config.yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  fill="#94a3b8"
                  fontSize="10"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* X and Y Axis Lines */}
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={paddingTop + plotHeight}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <line
            x1={paddingLeft}
            y1={paddingTop + plotHeight}
            x2={width - paddingRight}
            y2={paddingTop + plotHeight}
            stroke="#64748b"
            strokeWidth="1.5"
          />

          {/* Fill Area under Curve */}
          <path d={areaPath} fill="url(#curveGradient)" />

          {/* Connecting Trend Line */}
          <path
            d={linePath}
            fill="none"
            stroke={config.strokeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Specific Exam Diagram Annotations */}
          {trendType === 'mp' && (
            <g>
              {/* Silicon Peak Callout */}
              <line x1={getX(3)} y1={getY(1687)} x2={getX(3) + 20} y2={getY(1687) - 25} stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2 2" />
              <rect x={getX(3) - 70} y={getY(1687) - 44} width="180" height="20" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
              <text x={getX(3) + 20} y={getY(1687) - 30} fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">
                PEAK: Giant Covalent Si (1687 K)
              </text>

              {/* S8 > P4 anomaly callout */}
              <line x1={getX(5)} y1={getY(392)} x2={getX(5) + 30} y2={getY(392) - 35} stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2 2" />
              <rect x={getX(5) - 30} y={getY(392) - 52} width="165" height="20" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              <text x={getX(5) + 52} y={getY(392) - 38} fill="#7dd3fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                S₈ (392 K) &gt; P₄ (317 K): 128e⁻ vs 60e⁻
              </text>

              {/* Metals Na-Mg-Al callout */}
              <rect x={getX(0) - 10} y={getY(700)} width="130" height="18" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
              <text x={getX(0) + 55} y={getY(700) + 12} fill="#94a3b8" fontSize="8.5" textAnchor="middle">
                Metallic: Na &lt; Mg &lt; Al
              </text>
            </g>
          )}

          {trendType === 'radius' && (
            <g>
              {/* Radius annotation */}
              <rect x={getX(2)} y={paddingTop + 10} width="220" height="22" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              <text x={getX(2) + 110} y={paddingTop + 24} fill="#7dd3fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                Z_eff increases: +11p → +18p with same shielding
              </text>
            </g>
          )}

          {trendType === 'ionic_radius' && (
            <g>
              {/* Jump from Al3+ to P3- annotation */}
              <line x1={getX(2)} y1={getY(50)} x2={getX(4)} y2={getY(212)} stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 3" />
              <rect x={getX(2) + 20} y={getY(130)} width="150" height="24" rx="4" fill="#0f172a" stroke="#ec4899" strokeWidth="1" />
              <text x={getX(2) + 95} y={getY(130) + 15} fill="#f472b6" fontSize="9" fontWeight="bold" textAnchor="middle">
                Jump: Cations → Anions
              </text>
            </g>
          )}

          {/* Data Points & X-Axis Element Labels */}
          {points.map((pt, idx) => {
            const isHovered = hoveredElement === pt.sym;
            if (pt.val === 0 && trendType === 'ionic_radius' && pt.sym === 'Si') {
              return (
                <g key={pt.sym}>
                  <text
                    x={pt.x}
                    y={paddingTop + plotHeight + 20}
                    fill="#cbd5e1"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {pt.sym}
                  </text>
                  <text x={pt.x} y={paddingTop + plotHeight - 10} fill="#64748b" fontSize="8" textAnchor="middle">
                    No ion
                  </text>
                </g>
              );
            }

            return (
              <g
                key={pt.sym}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredElement(pt.sym)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {/* Vertical helper line to X axis on hover */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x}
                    y2={paddingTop + plotHeight}
                    stroke={config.strokeColor}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Outer Glow Halo */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 9 : 6}
                  fill={config.strokeColor}
                  opacity={isHovered ? 0.9 : 0.4}
                  filter="url(#pointGlow)"
                />

                {/* Core Point Circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5 : 3.5}
                  fill="#ffffff"
                  stroke={config.strokeColor}
                  strokeWidth="2"
                />

                {/* Numeric value label above node */}
                <text
                  x={pt.x}
                  y={pt.y - 10}
                  fill={isHovered ? '#ffffff' : '#e2e8f0'}
                  fontSize={isHovered ? '11' : '9.5'}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.val}
                </text>

                {/* X-Axis Element Symbol */}
                <text
                  x={pt.x}
                  y={paddingTop + plotHeight + 18}
                  fill={isHovered ? config.strokeColor : '#cbd5e1'}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.sym}
                </text>

                {/* Group number below symbol */}
                <text
                  x={pt.x}
                  y={paddingTop + plotHeight + 30}
                  fill="#64748b"
                  fontSize="8.5"
                  textAnchor="middle"
                >
                  G{ELEMENTS_DATA[pt.sym].group}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Clear Bottom Explanation Box */}
      <div className="mt-3 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white mr-1">Cambridge Exam Diagram Note:</strong>
          {trendType === 'mp' && (
            <span>
              Always remember the 2 key features of the Period 3 melting point curve: (1) Silicon is the absolute peak due to its giant macromolecular covalent structure; (2) Sulfur (S₈) has a higher melting point than phosphorus (P₄) because S₈ molecules have more electrons (128e⁻ vs 60e⁻), creating stronger London dispersion forces.
            </span>
          )}
          {trendType === 'radius' && (
            <span>
              Atomic radius steadily decreases across Period 3 because nuclear charge increases (from +11 to +18) while electrons enter the same 3rd shell with similar shielding, drawing the valence electrons closer.
            </span>
          )}
          {trendType === 'conductivity' && (
            <span>
              Electrical conductivity rises from Na (1 mobile electron per atom) to Mg (2 mobile electrons) to Al (3 mobile electrons per atom). Silicon is a semi-conductor, while P, S, Cl, and Ar are non-conductors with localized electrons.
            </span>
          )}
          {trendType === 'ionic_radius' && (
            <span>
              Notice the abrupt jump between cations and anions: Na⁺, Mg²⁺, and Al³⁺ lose their 3s/3p valence shell (leaving 10 electrons) and shrink with higher nuclear charge. P³⁻, S²⁻, and Cl⁻ gain electrons, causing substantial electron-electron repulsion that expands the cloud.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
