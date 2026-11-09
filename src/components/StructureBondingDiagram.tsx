import React from 'react';
import { ElementSymbol } from '../types/chem';
import { ELEMENTS_DATA } from '../data/periodicityData';

interface StructureBondingDiagramProps {
  element: ElementSymbol;
}

export const StructureBondingDiagram: React.FC<StructureBondingDiagramProps> = ({ element }) => {
  const el = ELEMENTS_DATA[element];

  return (
    <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-xs">
        <span className="font-mono font-bold text-amber-400 uppercase tracking-wider">
          Structure & Bonding Diagram (Syllabus 9.1.2)
        </span>
        <span className="text-slate-400 font-mono">
          {element}: <strong className="text-white">{el.bonding.split('(')[0]}</strong>
        </span>
      </div>

      <div className="w-full h-48 flex items-center justify-center">
        {/* Metallic Lattice (Na, Mg, Al) */}
        {(element === 'Na' || element === 'Mg' || element === 'Al') && (
          <svg viewBox="0 0 320 160" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="metalGrad" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#312e81" />
              </radialGradient>
            </defs>

            {/* Delocalised electron sea background */}
            <rect x="20" y="20" width="280" height="120" rx="12" fill="#1e1b4b" opacity="0.5" stroke="#4f46e5" strokeWidth="1" strokeDasharray="3 3" />

            {/* Random mobile delocalised electrons (e⁻) */}
            {[
              [45, 35], [75, 75], [115, 45], [150, 85], [185, 35], [225, 75], [265, 45],
              [55, 115], [95, 125], [135, 120], [175, 125], [215, 120], [255, 115]
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="3" fill="#38bdf8" />
                <text x={x} y={y + 2.5} fill="#0f172a" fontSize="5" fontWeight="bold" textAnchor="middle">e⁻</text>
              </g>
            ))}

            {/* Regularly arranged lattice of metal cations */}
            {[
              [60, 50], [120, 50], [180, 50], [240, 50],
              [90, 95], [150, 95], [210, 95], [270, 95]
            ].map(([cx, cy], idx) => (
              <g key={idx}>
                <circle cx={cx} cy={cy} r="15" fill="url(#metalGrad)" stroke="#818cf8" strokeWidth="1.5" />
                <text x={cx} y={cy + 4} fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {element === 'Na' ? 'Na⁺' : element === 'Mg' ? 'Mg²⁺' : 'Al³⁺'}
                </text>
              </g>
            ))}

            {/* Labels */}
            <text x="160" y="152" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Giant Metallic Lattice: Cations in a 'Sea of Delocalised Electrons'
            </text>
          </svg>
        )}

        {/* Silicon: Giant 3D Covalent Macromolecular Lattice */}
        {element === 'Si' && (
          <svg viewBox="0 0 320 160" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="siGrad" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
            </defs>

            {/* Covalent bonds */}
            <g stroke="#94a3b8" strokeWidth="3" strokeLinecap="round">
              <line x1="160" y1="75" x2="110" y2="40" />
              <line x1="160" y1="75" x2="210" y2="40" />
              <line x1="160" y1="75" x2="160" y2="125" />
              <line x1="160" y1="75" x2="120" y2="115" />

              <line x1="110" y1="40" x2="65" y2="25" />
              <line x1="110" y1="40" x2="75" y2="65" />
              <line x1="210" y1="40" x2="255" y2="25" />
              <line x1="210" y1="40" x2="245" y2="65" />
              <line x1="160" y1="125" x2="210" y2="140" />
              <line x1="160" y1="125" x2="130" y2="145" />
            </g>

            {/* Silicon atoms (Tetrahedral coordination) */}
            {[
              [160, 75], [110, 40], [210, 40], [160, 125], [120, 115],
              [65, 25], [75, 65], [255, 25], [245, 65], [210, 140], [130, 145]
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="10" fill="url(#siGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                <text x={cx} y={cy + 3.5} fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Si
                </text>
              </g>
            ))}

            <text x="160" y="155" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Giant Macromolecular Lattice: Each Si bonded to 4 others tetrahedrally
            </text>
          </svg>
        )}

        {/* Phosphorus: Tetrahedral P4 Molecule */}
        {element === 'P' && (
          <svg viewBox="0 0 320 160" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="pGrad" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="60%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#854d0e" />
              </radialGradient>
            </defs>

            {/* Tetrahedral P-P bonds */}
            <g stroke="#facc15" strokeWidth="3" strokeLinecap="round">
              <line x1="160" y1="35" x2="110" y2="115" />
              <line x1="160" y1="35" x2="210" y2="115" />
              <line x1="160" y1="35" x2="160" y2="85" />
              <line x1="110" y1="115" x2="210" y2="115" />
              <line x1="110" y1="115" x2="160" y2="85" />
              <line x1="210" y1="115" x2="160" y2="85" />
            </g>

            {/* 4 P Atoms in tetrahedron */}
            {[
              [160, 35], [110, 115], [210, 115], [160, 85]
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="12" fill="url(#pGrad)" stroke="#fef08a" strokeWidth="1.5" />
                <text x={cx} y={cy + 4} fill="#0f172a" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  P
                </text>
              </g>
            ))}

            <text x="160" y="145" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Discrete P₄ Tetrahedron: Weak London dispersion forces between molecules
            </text>
          </svg>
        )}

        {/* Sulfur: Crown S8 Ring */}
        {element === 'S' && (
          <svg viewBox="0 0 320 160" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="sGrad" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
            </defs>

            {/* S-S covalent bonds in crown shape */}
            <polygon
              points="110,60 135,105 160,60 185,105 210,60 185,40 160,60 135,40"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* 8 Sulfur atoms in puckered ring */}
            {[
              [110, 60], [135, 105], [160, 60], [185, 105],
              [210, 60], [185, 40], [135, 40]
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="10" fill="url(#sGrad)" stroke="#fef08a" strokeWidth="1.5" />
                <text x={cx} y={cy + 3.5} fill="#0f172a" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  S
                </text>
              </g>
            ))}

            <text x="160" y="145" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              S₈ Puckered Crown Ring (128 electrons total → Stronger London forces than P₄)
            </text>
          </svg>
        )}

        {/* Chlorine: Diatomic Cl2 */}
        {element === 'Cl' && (
          <svg viewBox="0 0 320 160" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="clGrad" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#bef264" />
                <stop offset="60%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#3f6212" />
              </radialGradient>
            </defs>

            {/* Single Covalent Cl-Cl Bond */}
            <line x1="135" y1="75" x2="185" y2="75" stroke="#a3e635" strokeWidth="4" />

            {/* Cl atoms */}
            <circle cx="130" cy="75" r="18" fill="url(#clGrad)" stroke="#bef264" strokeWidth="2" />
            <text x="130" y="80" fill="#0f172a" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Cl</text>

            <circle cx="190" cy="75" r="18" fill="url(#clGrad)" stroke="#bef264" strokeWidth="2" />
            <text x="190" y="80" fill="#0f172a" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Cl</text>

            <text x="160" y="130" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Diatomic Cl₂ Covalent Single Bond (34 electrons)
            </text>
          </svg>
        )}

        {/* Argon: Monatomic Gas */}
        {element === 'Ar' && (
          <svg viewBox="0 0 320 160" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="arGrad" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="60%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </radialGradient>
            </defs>

            <circle cx="160" cy="70" r="22" fill="url(#arGrad)" stroke="#cbd5e1" strokeWidth="2" />
            <text x="160" y="76" fill="#0f172a" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Ar</text>

            {/* 8 valence electrons surrounding */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = 160 + 32 * Math.cos(rad);
              const y = 70 + 32 * Math.sin(rad);
              return <circle key={i} cx={x} cy={y} r="2.5" fill="#38bdf8" />;
            })}

            <text x="160" y="130" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Individual Unbonded Ar Atoms (Full Valence Octet: [Ne] 3s² 3p⁶)
            </text>
          </svg>
        )}
      </div>
    </div>
  );
};
