import {
  ElementData,
  ReactionDetail,
  OxideData,
  ChlorideData,
  HydroxideData,
  MysteryCase,
  EquationChallenge,
  ElementSymbol
} from '../types/chem';

export const ELEMENTS_DATA: Record<ElementSymbol, ElementData> = {
  Na: {
    symbol: 'Na',
    name: 'Sodium',
    atomicNumber: 11,
    group: 1,
    period: 3,
    electronConfig: '[Ne] 3s¹',
    valenceElectrons: 1,
    atomicRadius: 186,
    ionicRadius: 95,
    ionicSpecies: 'Na⁺',
    meltingPoint: 371,
    meltingPointC: 98,
    boilingPoint: 1156,
    electricalConductivity: 21,
    structure: 'Giant metallic lattice',
    bonding: 'Metallic (1 delocalised electron per atom, Na⁺ cations)',
    appearance: 'Soft silvery-white metal, stored under oil',
    stateAtRoomTemp: 'solid',
    flameColor: 'Golden Yellow',
    whyMeltingPoint: 'Moderate melting point. Metallic bonding between Na⁺ cations and 1 delocalised electron per atom is relatively weak compared to Mg and Al.',
    whyConductivity: 'Good conductor due to 1 mobile delocalised electron per atom free to move throughout the metallic lattice.',
    whyRadius: 'Largest atomic radius in Period 3. Lowest nuclear charge (+11) in the period with same number of electron shells (3), so valence electrons experience weakest attraction.',
    whyIonicRadius: 'Na⁺ (95 pm) is smaller than Na atom (186 pm) because it loses its entire 3s shell, leaving 10 electrons pulled by 11 protons.'
  },
  Mg: {
    symbol: 'Mg',
    name: 'Magnesium',
    atomicNumber: 12,
    group: 2,
    period: 3,
    electronConfig: '[Ne] 3s²',
    valenceElectrons: 2,
    atomicRadius: 160,
    ionicRadius: 65,
    ionicSpecies: 'Mg²⁺',
    meltingPoint: 923,
    meltingPointC: 650,
    boilingPoint: 1363,
    electricalConductivity: 23,
    structure: 'Giant metallic lattice',
    bonding: 'Metallic (2 delocalised electrons per atom, Mg²⁺ cations)',
    appearance: 'Silvery-white shiny metal ribbon or powder',
    stateAtRoomTemp: 'solid',
    flameColor: 'Brilliant Blinding White',
    whyMeltingPoint: 'Higher melting point than Na (923 K vs 371 K) because Mg²⁺ has double the charge and smaller ionic radius, and 2 delocalised electrons per ion give a stronger metallic bond.',
    whyConductivity: 'Higher conductivity than Na due to 2 delocalised electrons per atom available to carry electrical charge.',
    whyRadius: 'Smaller than Na (160 pm vs 186 pm) because increased nuclear charge (+12) pulls electrons in the same shell (n=3) closer to the nucleus.',
    whyIonicRadius: 'Mg²⁺ (65 pm) is smaller than Na⁺ (95 pm) because it has +12 nuclear charge pulling the same 10 neon-core electrons.'
  },
  Al: {
    symbol: 'Al',
    name: 'Aluminium',
    atomicNumber: 13,
    group: 13,
    period: 3,
    electronConfig: '[Ne] 3s² 3p¹',
    valenceElectrons: 3,
    atomicRadius: 143,
    ionicRadius: 50,
    ionicSpecies: 'Al³⁺',
    meltingPoint: 933,
    meltingPointC: 660,
    boilingPoint: 2792,
    electricalConductivity: 38,
    structure: 'Giant metallic lattice',
    bonding: 'Metallic (3 delocalised electrons per atom, Al³⁺ cations)',
    appearance: 'Silvery-white malleable metal with passive oxide coating',
    stateAtRoomTemp: 'solid',
    flameColor: 'Bright White with White Sparks',
    whyMeltingPoint: 'High melting point (933 K). Strong metallic bond with Al³⁺ ions, high charge density, and 3 delocalised electrons per atom.',
    whyConductivity: 'Highest electrical conductivity of Period 3 metals (38 MS/m) due to 3 delocalised conduction electrons per atom.',
    whyRadius: 'Further decrease in radius (143 pm) due to +13 nuclear charge pulling 3s and 3p valence electrons with same core shielding.',
    whyIonicRadius: 'Al³⁺ (50 pm) has the smallest cation radius in Period 3 due to its high +13 nuclear charge exerting strong attraction on the remaining 10 electrons.'
  },
  Si: {
    symbol: 'Si',
    name: 'Silicon',
    atomicNumber: 14,
    group: 14,
    period: 3,
    electronConfig: '[Ne] 3s² 3p²',
    valenceElectrons: 4,
    atomicRadius: 118,
    meltingPoint: 1687,
    meltingPointC: 1414,
    boilingPoint: 3538,
    electricalConductivity: 0.001,
    structure: 'Giant covalent macromolecular lattice (diamond-like)',
    bonding: 'Covalent (tetrahedral network of strong covalent Si-Si bonds)',
    appearance: 'Dark grey/black lustrous crystalline solid',
    stateAtRoomTemp: 'solid',
    whyMeltingPoint: 'PEAK of Period 3 (1687 K)! Giant 3D macromolecular network where each Si atom forms 4 strong covalent bonds. Huge thermal energy is required to break these numerous strong bonds.',
    whyConductivity: 'Semiconductor. At room temperature, electrons are localized in covalent bonds with few free carriers; conductivity rises with temperature.',
    whyRadius: 'Radius shrinks to 118 pm as nuclear charge increases to +14 while shielding remains unchanged.',
    whyIonicRadius: 'Does not readily form simple monatomic ions due to high ionization energies and covalent nature.'
  },
  P: {
    symbol: 'P',
    name: 'Phosphorus',
    atomicNumber: 15,
    group: 15,
    period: 3,
    electronConfig: '[Ne] 3s² 3p³',
    valenceElectrons: 5,
    atomicRadius: 110,
    ionicRadius: 212,
    ionicSpecies: 'P³⁻ (phosphide)',
    meltingPoint: 317,
    meltingPointC: 44,
    boilingPoint: 553,
    electricalConductivity: 0,
    structure: 'Simple molecular (P₄ tetrahedral molecules)',
    bonding: 'Strong covalent P-P bonds within P₄; weak London dispersion (van der Waals) forces between molecules',
    appearance: 'White waxy solid (or red amorphous powder)',
    stateAtRoomTemp: 'solid',
    flameColor: 'Bright Yellow with dense white smoke',
    whyMeltingPoint: 'Sharp drop from Si! Only weak instantaneous dipole-induced dipole (van der Waals) forces hold discrete P₄ molecules together. Little energy needed to separate molecules.',
    whyConductivity: 'Electrical insulator: all valence electrons are locked into localized covalent single bonds, no mobile charged particles.',
    whyRadius: 'Atomic radius continues trend down to 110 pm with +15 nuclear charge.',
    whyIonicRadius: 'P³⁻ (212 pm) is MUCH LARGER than P atom (110 pm) because adding 3 electrons increases electron-electron repulsion, causing the electron cloud to expand greatly.'
  },
  S: {
    symbol: 'S',
    name: 'Sulfur',
    atomicNumber: 16,
    group: 16,
    period: 3,
    electronConfig: '[Ne] 3s² 3p⁴',
    valenceElectrons: 6,
    atomicRadius: 102,
    ionicRadius: 184,
    ionicSpecies: 'S²⁻ (sulfide)',
    meltingPoint: 392,
    meltingPointC: 119,
    boilingPoint: 718,
    electricalConductivity: 0,
    structure: 'Simple molecular (S₈ puckered ring molecules)',
    bonding: 'Covalent within S₈ rings; weak London dispersion (van der Waals) forces between S₈ molecules',
    appearance: 'Bright lemon-yellow crystalline brittle solid',
    stateAtRoomTemp: 'solid',
    flameColor: 'Pale Blue with pungent suffocating gas',
    whyMeltingPoint: 'HIGHER melting point than phosphorus (392 K vs 317 K)! S₈ has 128 electrons per molecule compared to P₄ with 60 electrons. Larger molecule with more electrons gives stronger London dispersion forces!',
    whyConductivity: 'Electrical insulator: all electrons localized in S-S covalent bonds.',
    whyRadius: 'Atomic radius decreases to 102 pm due to +16 nuclear charge.',
    whyIonicRadius: 'S²⁻ (184 pm) is larger than sulfur atom (102 pm) due to electron-electron repulsion with 2 added electrons, but smaller than P³⁻ because of higher +16 nuclear charge.'
  },
  Cl: {
    symbol: 'Cl',
    name: 'Chlorine',
    atomicNumber: 17,
    group: 17,
    period: 3,
    electronConfig: '[Ne] 3s² 3p⁵',
    valenceElectrons: 7,
    atomicRadius: 99,
    ionicRadius: 181,
    ionicSpecies: 'Cl⁻ (chloride)',
    meltingPoint: 172,
    meltingPointC: -101,
    boilingPoint: 239,
    electricalConductivity: 0,
    structure: 'Simple molecular (Cl₂ diatomic gas)',
    bonding: 'Covalent Cl-Cl single bond; very weak London dispersion forces between Cl₂ molecules',
    appearance: 'Pale yellow-green choking gas',
    stateAtRoomTemp: 'gas',
    flameColor: 'Supports combustion of active metals',
    whyMeltingPoint: 'Very low melting point (172 K, gas at room temp). Small Cl₂ molecules (34 electrons) have weak London dispersion forces easily overcome at low temperature.',
    whyConductivity: 'Non-conductor: no delocalised electrons or ions.',
    whyRadius: 'Atomic radius is 99 pm, smallest of Period 3 reactive elements, pulled tightly by +17 nuclear charge.',
    whyIonicRadius: 'Cl⁻ (181 pm) is smaller than S²⁻ (184 pm) and P³⁻ (212 pm) because +17 nuclear charge pulls the 18 electrons most tightly of the Period 3 isoelectronic anions.'
  },
  Ar: {
    symbol: 'Ar',
    name: 'Argon',
    atomicNumber: 18,
    group: 18,
    period: 3,
    electronConfig: '[Ne] 3s² 3p⁶',
    valenceElectrons: 8,
    atomicRadius: 98,
    meltingPoint: 84,
    meltingPointC: -189,
    boilingPoint: 87,
    electricalConductivity: 0,
    structure: 'Monatomic gas (single Ar atoms)',
    bonding: 'Extremely weak London dispersion forces between individual atoms',
    appearance: 'Colourless, odourless inert gas',
    stateAtRoomTemp: 'gas',
    whyMeltingPoint: 'Lowest melting point in Period 3 (84 K). Individual unbonded atoms with only 18 electrons exhibit very weak instantaneous dipole-induced dipole forces.',
    whyConductivity: 'Non-conductor: stable full octet, neutral isolated atoms.',
    whyRadius: 'Covalent radius is 98 pm (or ~190 pm van der Waals radius when not covalently bonded).',
    whyIonicRadius: 'Noble gas: does not form stable ions under normal conditions.'
  }
};

export const REACTIONS_DATA: Record<ElementSymbol, Partial<Record<string, ReactionDetail>>> = {
  Na: {
    O2: {
      reagent: 'O2',
      reagentName: 'Oxygen (O₂)',
      equation: '4Na(s) + O₂(g) → 2Na₂O(s)',
      unbalancedEquation: 'Na + O₂ → Na₂O',
      coefficients: [4, 1, 2],
      products: 'Sodium oxide (Na₂O)',
      observations: 'Burns vigorously with a persistent golden-yellow flame, producing dense white solid smoke of Na₂O (some Na₂O₂ peroxide also forms with excess O₂).',
      flameOrEffectColor: '#f59e0b',
      vigorLevel: 'vigorous',
      heatEvolution: 'highly exothermic',
      explanation: 'Sodium rapidly oxidizes. Each Na atom loses its 3s¹ electron to oxygen, reaching stable [Ne] configuration.'
    },
    Cl2: {
      reagent: 'Cl2',
      reagentName: 'Chlorine (Cl₂)',
      equation: '2Na(s) + Cl₂(g) → 2NaCl(s)',
      unbalancedEquation: 'Na + Cl₂ → NaCl',
      coefficients: [2, 1, 2],
      products: 'Sodium chloride (NaCl)',
      observations: 'Burns vigorously with a bright orange-yellow flame in green chlorine gas, forming dense white fumes of solid NaCl.',
      flameOrEffectColor: '#fbbf24',
      vigorLevel: 'vigorous',
      heatEvolution: 'highly exothermic',
      explanation: 'Redox reaction: Sodium is oxidized to Na⁺ (+1) and Chlorine is reduced to Cl⁻ (-1) forming a giant ionic lattice.'
    },
    H2O_cold: {
      reagent: 'H2O_cold',
      reagentName: 'Cold Water (H₂O(l))',
      equation: '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)',
      unbalancedEquation: 'Na + H₂O → NaOH + H₂',
      coefficients: [2, 2, 2, 1],
      products: 'Sodium hydroxide (NaOH) + Hydrogen gas (H₂)',
      observations: 'Floats, melts into a silvery sphere due to heat, whizzes rapidly across surface with vigorous effervescence, burns with yellow flame, forms strongly alkaline solution (pH 14).',
      flameOrEffectColor: '#fbbf24',
      vigorLevel: 'violent',
      heatEvolution: 'highly exothermic',
      explanation: 'Sodium reacts violently with cold water to release hydrogen gas and produce a soluble strong base (NaOH).'
    }
  },
  Mg: {
    O2: {
      reagent: 'O2',
      reagentName: 'Oxygen (O₂)',
      equation: '2Mg(s) + O₂(g) → 2MgO(s)',
      unbalancedEquation: 'Mg + O₂ → MgO',
      coefficients: [2, 1, 2],
      products: 'Magnesium oxide (MgO)',
      observations: 'Ignites when heated, burning with an intense, blinding white flame, leaving a white powdery solid residue of MgO.',
      flameOrEffectColor: '#ffffff',
      vigorLevel: 'vigorous',
      heatEvolution: 'highly exothermic',
      explanation: 'Each Mg atom transfers both 3s² valence electrons to oxygen, forming strongly bound Mg²⁺ and O²⁻ in a high-lattice-energy ionic lattice.'
    },
    Cl2: {
      reagent: 'Cl2',
      reagentName: 'Chlorine (Cl₂)',
      equation: 'Mg(s) + Cl₂(g) → MgCl₂(s)',
      unbalancedEquation: 'Mg + Cl₂ → MgCl₂',
      coefficients: [1, 1, 1],
      products: 'Magnesium chloride (MgCl₂)',
      observations: 'Burns with a bright white glow in chlorine gas, producing white solid crystals of MgCl₂.',
      flameOrEffectColor: '#f8fafc',
      vigorLevel: 'vigorous',
      heatEvolution: 'highly exothermic',
      explanation: 'Direct combination forming giant ionic magnesium chloride.'
    },
    H2O_cold: {
      reagent: 'H2O_cold',
      reagentName: 'Cold Water (H₂O(l))',
      equation: 'Mg(s) + 2H₂O(l) → Mg(OH)₂(s) + H₂(g)',
      unbalancedEquation: 'Mg + H₂O → Mg(OH)₂ + H₂',
      coefficients: [1, 2, 1, 1],
      products: 'Magnesium hydroxide (Mg(OH)₂) + Hydrogen gas (H₂)',
      observations: 'Very slow reaction. A few tiny bubbles of H₂ form on the metal surface over several days; insoluble Mg(OH)₂ coats the metal, stopping further reaction. Solution weakly alkaline (pH ~9).',
      vigorLevel: 'slow',
      heatEvolution: 'exothermic',
      explanation: 'Reaction is inhibited by the formation of an insoluble layer of Mg(OH)₂ on the surface.'
    },
    H2O_steam: {
      reagent: 'H2O_steam',
      reagentName: 'Steam (H₂O(g))',
      equation: 'Mg(s) + H₂O(g) → MgO(s) + H₂(g)',
      unbalancedEquation: 'Mg + H₂O → MgO + H₂',
      coefficients: [1, 1, 1, 1],
      products: 'Magnesium oxide (MgO) + Hydrogen gas (H₂)',
      observations: 'Heated magnesium ribbon burns with a bright, intense white flame in steam, leaving a white solid of MgO. Hydrogen gas burns at the exit tube.',
      flameOrEffectColor: '#ffffff',
      vigorLevel: 'vigorous',
      heatEvolution: 'highly exothermic',
      explanation: 'Key syllabus contrast: with steam, magnesium forms magnesium OXIDE (MgO), NOT hydroxide!'
    }
  },
  Al: {
    O2: {
      reagent: 'O2',
      reagentName: 'Oxygen (O₂)',
      equation: '4Al(s) + 3O₂(g) → 2Al₂O₃(s)',
      unbalancedEquation: 'Al + O₂ → Al₂O₃',
      coefficients: [4, 3, 2],
      products: 'Aluminium oxide (Al₂O₃)',
      observations: 'Aluminium powder burns with bright white sparks when strongly heated, forming white solid Al₂O₃. Bulk aluminium has a protective oxide layer.',
      flameOrEffectColor: '#e2e8f0',
      vigorLevel: 'vigorous',
      heatEvolution: 'highly exothermic',
      explanation: 'Forms amphoteric aluminium oxide Al₂O₃. High lattice energy makes it refractory and corrosion-resistant.'
    },
    Cl2: {
      reagent: 'Cl2',
      reagentName: 'Chlorine (Cl₂)',
      equation: '2Al(s) + 3Cl₂(g) → 2AlCl₃(s)',
      unbalancedEquation: 'Al + Cl₂ → AlCl₃',
      coefficients: [2, 3, 2],
      products: 'Aluminium chloride (AlCl₃ or Al₂Cl₆ dimer)',
      observations: 'Pass chlorine over heated aluminium foil; foil glows and produces pale yellow fumes that condense into pale yellow solid Al₂Cl₆ / AlCl₃ in the cooler flask.',
      flameOrEffectColor: '#fef08a',
      vigorLevel: 'vigorous',
      heatEvolution: 'exothermic',
      explanation: 'At high temperatures AlCl₃ exists; at lower temperatures it dimerizes via dative covalent bonds into Al₂Cl₆.'
    }
  },
  Si: {
    O2: {
      reagent: 'O2',
      reagentName: 'Oxygen (O₂)',
      equation: 'Si(s) + O₂(g) → SiO₂(s)',
      unbalancedEquation: 'Si + O₂ → SiO₂',
      coefficients: [1, 1, 1],
      products: 'Silicon dioxide (SiO₂ / silica)',
      observations: 'Requires very strong heating in oxygen. Reacts slowly with a red glow to form white solid SiO₂.',
      flameOrEffectColor: '#ef4444',
      vigorLevel: 'slow',
      heatEvolution: 'requires continuous heat',
      explanation: 'Forms a giant covalent macromolecular lattice of SiO₂. Very high activation energy.'
    },
    Cl2: {
      reagent: 'Cl2',
      reagentName: 'Chlorine (Cl₂)',
      equation: 'Si(s) + 2Cl₂(g) → SiCl₄(l)',
      unbalancedEquation: 'Si + Cl₂ → SiCl₄',
      coefficients: [1, 2, 1],
      products: 'Silicon tetrachloride (SiCl₄)',
      observations: 'Heated silicon powder burns slowly in dry chlorine to form a colourless volatile liquid (SiCl₄) that fumes copiously in moist air.',
      flameOrEffectColor: '#94a3b8',
      vigorLevel: 'slow',
      heatEvolution: 'exothermic',
      explanation: 'Covalent tetrahedral molecule formed by sharing 4 pairs of electrons.'
    }
  },
  P: {
    O2: {
      reagent: 'O2',
      reagentName: 'Oxygen (O₂)',
      equation: 'P₄(s) + 5O₂(g) → P₄O₁₀(s)',
      unbalancedEquation: 'P₄ + O₂ → P₄O₁₀',
      coefficients: [1, 5, 1],
      products: 'Phosphorus(V) oxide (P₄O₁₀)',
      observations: 'White phosphorus catches fire spontaneously; burns with a bright yellow flame producing thick, billowing clouds of white solid P₄O₁₀ smoke.',
      flameOrEffectColor: '#fde047',
      vigorLevel: 'vigorous',
      heatEvolution: 'highly exothermic',
      explanation: 'All 5 valence electrons of each P atom are involved in bonding with oxygen, reaching oxidation state +5.'
    },
    Cl2: {
      reagent: 'Cl2',
      reagentName: 'Chlorine (Cl₂)',
      equation: 'P₄(s) + 10Cl₂(g) → 4PCl₅(s)',
      unbalancedEquation: 'P₄ + Cl₂ → PCl₅',
      coefficients: [1, 10, 4],
      products: 'Phosphorus(V) chloride (PCl₅)',
      observations: 'Burns in excess chlorine with a pale yellow flame to form an off-white/pale yellow solid PCl₅ (with limited Cl₂, liquid PCl₃ is formed).',
      flameOrEffectColor: '#fef9c3',
      vigorLevel: 'vigorous',
      heatEvolution: 'exothermic',
      explanation: 'Forms PCl₅ where phosphorus expands its octet to accommodate 5 bonding pairs (trigonal bipyramidal).'
    }
  },
  S: {
    O2: {
      reagent: 'O2',
      reagentName: 'Oxygen (O₂)',
      equation: 'S(s) + O₂(g) → SO₂(g)',
      unbalancedEquation: 'S + O₂ → SO₂',
      coefficients: [1, 1, 1],
      products: 'Sulfur dioxide (SO₂)',
      observations: 'Melts to a blood-red liquid, then burns with a gentle, pale blue flame, producing colourless choking gas with the pungent odour of burning matches.',
      flameOrEffectColor: '#60a5fa',
      vigorLevel: 'vigorous',
      heatEvolution: 'exothermic',
      explanation: 'Forms sulfur dioxide (+4 oxidation state). Further oxidation to SO₃ (+6) requires a V₂O₅ catalyst at 450 °C.'
    },
    Cl2: {
      reagent: 'Cl2',
      reagentName: 'Chlorine (Cl₂)',
      equation: '2S(s) + Cl₂(g) → S₂Cl₂(l)',
      unbalancedEquation: 'S + Cl₂ → S₂Cl₂',
      coefficients: [2, 1, 1],
      products: 'Disulfur dichloride (S₂Cl₂)',
      observations: 'Reacts when heated to form a foul-smelling orange-red liquid that fumes in moist air.',
      flameOrEffectColor: '#f97316',
      vigorLevel: 'slow',
      heatEvolution: 'exothermic',
      explanation: 'Sulfur forms covalent chloride with low oxidation state.'
    }
  },
  Cl: {
    O2: {
      reagent: 'O2',
      reagentName: 'Oxygen (O₂)',
      equation: 'No direct reaction under standard laboratory conditions',
      unbalancedEquation: 'Cl₂ + O₂ → No reaction',
      coefficients: [0],
      products: 'None directly',
      observations: 'Chlorine does not directly react with oxygen by burning. Chlorine oxides (e.g. Cl₂O, ClO₂) are unstable and prepared indirectly.',
      vigorLevel: 'none',
      heatEvolution: 'no reaction',
      explanation: 'Positive enthalpy of formation and high bond dissociation energy.'
    }
  },
  Ar: {
    O2: {
      reagent: 'O2',
      reagentName: 'Oxygen (O₂)',
      equation: 'No reaction',
      unbalancedEquation: 'Ar + O₂ → No reaction',
      coefficients: [0],
      products: 'None',
      observations: 'Completely unreactive inert noble gas.',
      vigorLevel: 'none',
      heatEvolution: 'no reaction',
      explanation: 'Complete valence octet ([Ne] 3s² 3p⁶).'
    }
  }
};

export const OXIDES_DATA: OxideData[] = [
  {
    formula: 'Na₂O',
    element: 'Na',
    oxidationNumber: +1,
    bonding: 'Giant ionic',
    structure: 'Giant ionic crystal lattice (antifluorite structure)',
    appearance: 'White solid powder',
    reactionWithWater: {
      reacts: true,
      equation: 'Na₂O(s) + H₂O(l) → 2NaOH(aq)',
      product: 'Sodium hydroxide (NaOH)',
      pH: 14,
      pHRule: 'pH 13-14 (strongly alkaline / purple UI)',
      observations: 'Dissolves readily and exothermically in water. Oxide ions (O²⁻) act as strong Brønsted-Lowry bases, abstracting protons to form OH⁻ ions.'
    },
    acidBaseNature: 'Basic',
    reactionsWithAcidBase: {
      acidReaction: {
        reagent: 'Dilute Hydrochloric Acid (HCl)',
        equation: 'Na₂O(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l)',
        observation: 'White solid dissolves completely to give a colourless neutral solution with evolution of heat.'
      }
    },
    whyOxidationState: '+1 oxidation state because sodium has 1 valence electron (3s¹) which it loses to form Na⁺.'
  },
  {
    formula: 'MgO',
    element: 'Mg',
    oxidationNumber: +2,
    bonding: 'Giant ionic',
    structure: 'Giant ionic crystal lattice (rock salt / NaCl structure, Mg²⁺ and O²⁻)',
    appearance: 'White solid powder with high melting point (2852 °C)',
    reactionWithWater: {
      reacts: true,
      equation: 'MgO(s) + H₂O(l) ⇌ Mg(OH)₂(s / aq)',
      product: 'Magnesium hydroxide (Mg(OH)₂)',
      pH: 10,
      pHRule: 'pH 9-10 (weakly alkaline / dark green-blue UI)',
      observations: 'Sparingly soluble in water due to high lattice energy of Mg²⁺ and O²⁻. Only slight amount dissolves to form Mg(OH)₂, resulting in pH ~9-10.'
    },
    acidBaseNature: 'Basic',
    reactionsWithAcidBase: {
      acidReaction: {
        reagent: 'Dilute Sulfuric / Hydrochloric Acid',
        equation: 'MgO(s) + 2HCl(aq) → MgCl₂(aq) + H₂O(l)',
        observation: 'White solid dissolves completely to give a clear solution. Used as an antacid.'
      }
    },
    whyOxidationState: '+2 oxidation state because magnesium has 2 valence electrons (3s²) which it loses to form Mg²⁺.'
  },
  {
    formula: 'Al₂O₃',
    element: 'Al',
    oxidationNumber: +3,
    bonding: 'Giant ionic',
    structure: 'Giant ionic lattice with significant covalent character (high polarizing power of Al³⁺)',
    appearance: 'Hard white solid / corundum',
    reactionWithWater: {
      reacts: false,
      equation: 'No reaction (insoluble)',
      product: 'None',
      pH: 7,
      pHRule: 'pH 7 (insoluble / neutral green UI)',
      observations: 'Insoluble in water due to extremely high lattice energy. Water cannot overcome the strong ionic bonds.'
    },
    acidBaseNature: 'Amphoteric',
    reactionsWithAcidBase: {
      acidReaction: {
        reagent: 'Hot Dilute Hydrochloric Acid (HCl)',
        equation: 'Al₂O₃(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂O(l)',
        observation: 'Acts as a BASE: white solid dissolves to form colourless aluminium chloride solution.'
      },
      baseReaction: {
        reagent: 'Hot Concentrated Sodium Hydroxide (NaOH)',
        equation: 'Al₂O₃(s) + 2NaOH(aq) + 3H₂O(l) → 2Na[Al(OH)₄](aq)',
        observation: 'Acts as an ACID: white solid dissolves to form a colourless solution of sodium tetrahydroxoaluminate.'
      }
    },
    whyOxidationState: '+3 oxidation state because aluminium uses all 3 valence electrons (3s² 3p¹).'
  },
  {
    formula: 'SiO₂',
    element: 'Si',
    oxidationNumber: +4,
    bonding: 'Giant covalent',
    structure: 'Giant covalent 3D macromolecular network (each Si bonded to 4 O, each O to 2 Si)',
    appearance: 'Hard transparent or white crystalline solid (quartz/sand)',
    reactionWithWater: {
      reacts: false,
      equation: 'No reaction (insoluble)',
      product: 'None',
      pH: 7,
      pHRule: 'pH 7 (insoluble / neutral green UI)',
      observations: 'Insoluble in water because breaking the huge network of strong covalent Si-O bonds requires immense energy that hydration cannot compensate.'
    },
    acidBaseNature: 'Acidic',
    reactionsWithAcidBase: {
      baseReaction: {
        reagent: 'Hot Concentrated Sodium Hydroxide (NaOH)',
        equation: 'SiO₂(s) + 2NaOH(conc, hot) → Na₂SiO₃(aq) + H₂O(l)',
        observation: 'Acts as an ACID: slowly dissolves in hot concentrated NaOH to form soluble sodium silicate.'
      }
    },
    whyOxidationState: '+4 oxidation state because silicon shares all 4 valence electrons (3s² 3p²) with more electronegative oxygen atoms.'
  },
  {
    formula: 'P₄O₁₀',
    element: 'P',
    oxidationNumber: +5,
    bonding: 'Simple molecular',
    structure: 'Discrete molecular P₄O₁₀ cages held by van der Waals forces',
    appearance: 'White crystalline solid powder',
    reactionWithWater: {
      reacts: true,
      equation: 'P₄O₁₀(s) + 6H₂O(l) → 4H₃PO₄(aq)',
      product: 'Phosphoric(V) acid (H₃PO₄)',
      pH: 1.5,
      pHRule: 'pH 1-2 (strongly acidic / red UI)',
      observations: 'Reacts violently with water in an exothermic reaction, hissing and releasing heat to produce a strongly acidic solution of phosphoric(V) acid.'
    },
    acidBaseNature: 'Acidic',
    reactionsWithAcidBase: {
      baseReaction: {
        reagent: 'Aqueous Sodium Hydroxide (NaOH)',
        equation: 'P₄O₁₀(s) + 12NaOH(aq) → 4Na₃PO₄(aq) + 6H₂O(l)',
        observation: 'Acts as an ACID: neutralizes sodium hydroxide to form sodium phosphate salt and water.'
      }
    },
    whyOxidationState: '+5 oxidation state because phosphorus uses all 5 valence electrons (3s² 3p³) in bonding with oxygen.'
  },
  {
    formula: 'SO₂',
    element: 'S',
    oxidationNumber: +4,
    bonding: 'Simple molecular',
    structure: 'Bent discrete polar covalent molecules',
    appearance: 'Colourless choking, pungent gas',
    reactionWithWater: {
      reacts: true,
      equation: 'SO₂(g) + H₂O(l) ⇌ H₂SO₃(aq)',
      product: 'Sulfurous acid / sulfuric(IV) acid (H₂SO₃)',
      pH: 2.5,
      pHRule: 'pH 2-3 (moderately acidic / orange-red UI)',
      observations: 'Dissolves readily in water to form sulfurous acid (H₂SO₃), a weak diprotic acid.'
    },
    acidBaseNature: 'Acidic',
    reactionsWithAcidBase: {
      baseReaction: {
        reagent: 'Aqueous Sodium Hydroxide (NaOH)',
        equation: 'SO₂(g) + 2NaOH(aq) → Na₂SO₃(aq) + H₂O(l)',
        observation: 'Acts as an ACID: neutralizes alkali to form sodium sulfite (and NaHSO₃ with excess SO₂).'
      }
    },
    whyOxidationState: '+4 oxidation state because sulfur shares 4 of its 6 valence electrons with oxygen, leaving 1 lone pair.'
  },
  {
    formula: 'SO₃',
    element: 'S',
    oxidationNumber: +6,
    bonding: 'Simple molecular',
    structure: 'Trigonal planar discrete covalent molecules',
    appearance: 'Volatile colourless liquid / white solid below 17 °C',
    reactionWithWater: {
      reacts: true,
      equation: 'SO₃(g/l) + H₂O(l) → H₂SO₄(aq)',
      product: 'Sulfuric(VI) acid (H₂SO₄)',
      pH: 1,
      pHRule: 'pH 1-2 (very strongly acidic / deep red UI)',
      observations: 'Reacts violently and highly exothermically with water to form dense choking mist of sulfuric acid droplets (pH 1).'
    },
    acidBaseNature: 'Acidic',
    reactionsWithAcidBase: {
      baseReaction: {
        reagent: 'Aqueous Sodium Hydroxide (NaOH)',
        equation: 'SO₃(g) + 2NaOH(aq) → Na₂SO₄(aq) + H₂O(l)',
        observation: 'Acts as an ACID: neutralizes alkali vigorously to form sodium sulfate salt.'
      }
    },
    whyOxidationState: '+6 oxidation state because sulfur uses all 6 of its valence electrons (3s² 3p⁴) to form double bonds with oxygen.'
  }
];

export const CHLORIDES_DATA: ChlorideData[] = [
  {
    formula: 'NaCl',
    element: 'Na',
    oxidationNumber: +1,
    bonding: 'Giant ionic',
    structure: 'Giant ionic crystal lattice (face-centred cubic)',
    reactionWithWater: {
      type: 'Hydration / Dissolution',
      equation: 'NaCl(s) + aq → Na⁺(aq) + Cl⁻(aq)',
      pH: 7,
      observations: 'Dissolves easily to form a clear colourless neutral solution (pH 7). Hydration only; NO hydrolysis occurs because neither Na⁺ nor Cl⁻ polarizes water molecules sufficiently.',
      fumesOfHCl: false,
      explanation: 'Polar water molecules hydrate Na⁺ and Cl⁻ ions without breaking covalent O-H bonds.'
    }
  },
  {
    formula: 'MgCl₂',
    element: 'Mg',
    oxidationNumber: +2,
    bonding: 'Giant ionic',
    structure: 'Giant ionic crystal lattice (rutile/cadmium chloride type)',
    reactionWithWater: {
      type: 'Slight Hydrolysis',
      equation: '[Mg(H₂O)₆]²⁺(aq) + H₂O(l) ⇌ [Mg(H₂O)₅(OH)]⁺(aq) + H₃O⁺(aq)',
      pH: 6.5,
      observations: 'Dissolves readily in water to form a colourless solution with slight acidity (pH ~6.5). The small Mg²⁺ ion with charge +2 slightly polarizes water ligands, weakening an O-H bond to release trace H⁺.',
      fumesOfHCl: false,
      explanation: 'Slight hydrolysis occurs due to moderate charge density of Mg²⁺.'
    }
  },
  {
    formula: 'AlCl₃',
    element: 'Al',
    oxidationNumber: +3,
    bonding: 'Covalent (covalent layer/dimer)',
    structure: 'Layer lattice in solid; covalent dimer Al₂Cl₆ in vapour; simple AlCl₃ planar at high temp',
    reactionWithWater: {
      type: 'Vigorous Hydrolysis',
      equation: 'AlCl₃(s) + 3H₂O(l) → Al(OH)₃(s) + 3HCl(g)  OR  [Al(H₂O)₆]³⁺ + H₂O ⇌ [Al(H₂O)₅(OH)]²⁺ + H₃O⁺',
      pH: 3,
      observations: 'Reacts vigorously! Copious steamy white acidic fumes of hydrogen chloride (HCl) gas are evolved. Heat is released. Solution is strongly acidic (pH 2-3). A white gelatinous precipitate of Al(OH)₃ may form with small amounts of water.',
      fumesOfHCl: true,
      explanation: 'High charge density of Al³⁺ (charge +3, very small radius 50 pm) polarizes bonded water molecules strongly, causing extensive hydrolysis and releasing H⁺ and HCl fumes.'
    }
  },
  {
    formula: 'SiCl₄',
    element: 'Si',
    oxidationNumber: +4,
    bonding: 'Simple molecular',
    structure: 'Tetrahedral non-polar covalent molecules held by weak London dispersion forces',
    reactionWithWater: {
      type: 'Violent Hydrolysis',
      equation: 'SiCl₄(l) + 2H₂O(l) → SiO₂(s) + 4HCl(g)',
      pH: 1.5,
      observations: 'Reacts violently! Dense clouds of steamy white acidic fumes of HCl gas are given off immediately. A white precipitate of hydrated silicon dioxide (SiO₂·xH₂O) forms. Solution is strongly acidic (pH 1-2).',
      fumesOfHCl: true,
      explanation: 'Silicon has available empty 3d orbitals that allow water oxygen lone pairs to attack via dative bonding, enabling rapid, complete nucleophilic hydrolysis.'
    }
  },
  {
    formula: 'PCl₅',
    element: 'P',
    oxidationNumber: +5,
    bonding: 'Simple molecular',
    structure: 'Trigonal bipyramidal covalent molecules (in solid: [PCl₄]⁺[PCl₆]⁻ ionic)',
    reactionWithWater: {
      type: 'Violent Hydrolysis',
      equation: 'PCl₅(s) + 4H₂O(l) → H₃PO₄(aq) + 5HCl(g)',
      pH: 1,
      observations: 'Reacts violently and exothermically! Dense choking fumes of HCl gas erupt. Forms strongly acidic solution of phosphoric(V) acid and hydrochloric acid (pH 1).',
      fumesOfHCl: true,
      explanation: 'Phosphorus expands octet using accessible 3d orbitals; hydrolyzes completely into phosphoric acid and HCl.'
    }
  }
];

export const HYDROXIDES_DATA: HydroxideData[] = [
  {
    formula: 'NaOH',
    element: 'Na',
    nature: 'Strong base',
    reactionWithAcid: 'NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)',
    solubilityInWater: 'Very soluble (exothermic dissolution)',
    pH: 14
  },
  {
    formula: 'Mg(OH)₂',
    element: 'Mg',
    nature: 'Weak base',
    reactionWithAcid: 'Mg(OH)₂(s) + 2HCl(aq) → MgCl₂(aq) + 2H₂O(l)',
    solubilityInWater: 'Sparingly soluble (suspension / milk of magnesia)',
    pH: 10
  },
  {
    formula: 'Al(OH)₃',
    element: 'Al',
    nature: 'Amphoteric',
    reactionWithAcid: 'Al(OH)₃(s) + 3HCl(aq) → AlCl₃(aq) + 3H₂O(l) [acts as base]',
    reactionWithBase: 'Al(OH)₃(s) + NaOH(aq) → Na[Al(OH)₄](aq) [acts as acid, dissolves to colourless solution]',
    solubilityInWater: 'Insoluble gelatinous white precipitate',
    pH: 7
  }
];

export const MYSTERY_CASES: MysteryCase[] = [
  {
    id: 'case-1',
    title: 'The Amphoteric Enigma',
    difficulty: 'AS Exam Standard',
    targetElement: 'Al',
    clues: [
      { category: 'Physical', text: 'A silvery-white solid metal with high electrical conductivity (38 MS/m) and melting point 933 K (660 °C).' },
      { category: 'Reaction with Oxygen', text: 'When in powdered form and heated strongly, it burns with bright white sparks to produce a refractory white oxide.' },
      { category: 'Oxide Behaviour', text: 'Its oxide is completely insoluble in water (pH 7), but dissolves in both dilute HCl and hot concentrated NaOH!' },
      { category: 'Chloride Hydrolysis', text: 'Its solid chloride reacts vigorously with water, fuming copiously with steamy white acidic fumes of HCl and leaving an acidic solution of pH 2-3.' }
    ],
    revealedCluesInitial: 2,
    explanation: 'Aluminium is the only Period 3 element whose oxide (Al₂O₃) and hydroxide (Al(OH)₃) are AMPHOTERIC, dissolving in both acids (giving Al³⁺) and hot conc NaOH (giving [Al(OH)₄]⁻ aluminate).',
    points: 150
  },
  {
    id: 'case-2',
    title: 'The Blinding Flame',
    difficulty: 'AS Foundation',
    targetElement: 'Mg',
    clues: [
      { category: 'Physical', text: 'A silvery metal ribbon that burns with an intense, blinding white flame in air.' },
      { category: 'Reaction with Oxygen', text: 'Forms a basic white solid oxide with formula MO (oxidation number +2).' },
      { category: 'Reaction with Water', text: 'Reacts very slowly with cold water to give pH ~9, but burns vigorously with steam to form the white solid oxide and hydrogen gas!' },
      { category: 'Chloride Hydrolysis', text: 'Its chloride dissolves readily in water to give a nearly neutral, slightly acidic solution (pH 6.5) with no steamy HCl fumes.' }
    ],
    revealedCluesInitial: 2,
    explanation: 'Magnesium (Group 2) burns with blinding white light. Key syllabus test: with cold water it forms Mg(OH)₂, but with steam it forms MgO! Its chloride MgCl₂ dissolves with only slight hydrolysis (pH 6.5).',
    points: 100
  },
  {
    id: 'case-3',
    title: 'The High-Melting Giant',
    difficulty: 'AS Foundation',
    targetElement: 'Si',
    clues: [
      { category: 'Physical', text: 'Possesses the HIGHEST melting point of all elements in Period 3 (1687 K / 1414 °C).' },
      { category: 'Physical', text: 'Has a giant covalent macromolecular structure where each atom forms 4 strong covalent bonds in a tetrahedral lattice.' },
      { category: 'Reaction with Chlorine', text: 'Reacts with chlorine to form a colourless liquid chloride with oxidation state +4.' },
      { category: 'Chloride Hydrolysis', text: 'Its liquid chloride reacts violently with water, giving dense white fumes of HCl and a white precipitate of hydrated dioxide, resulting in pH 1-2.' }
    ],
    revealedCluesInitial: 2,
    explanation: 'Silicon has the peak melting point of Period 3 due to its diamond-like giant covalent lattice. Its liquid chloride SiCl₄ hydrolyzes violently into SiO₂ and 4HCl fumes.',
    points: 120
  },
  {
    id: 'case-4',
    title: 'The Crown Molecule Paradox',
    difficulty: 'AS Exam Standard',
    targetElement: 'S',
    clues: [
      { category: 'Physical', text: 'A bright yellow brittle solid non-metal that does not conduct electricity.' },
      { category: 'Physical', text: 'Has a HIGHER melting point than phosphorus (392 K vs 317 K) despite having lower group number.' },
      { category: 'Reaction with Oxygen', text: 'Melts to a red liquid and burns with a pale blue flame to produce a choking gas.' },
      { category: 'Oxide Behaviour', text: 'Forms an acidic oxide that dissolves in water to give sulfurous acid (pH 2-3).' }
    ],
    revealedCluesInitial: 2,
    explanation: 'Sulfur exists as S₈ crown-shaped rings with 128 electrons per molecule, compared to P₄ with 60 electrons. The larger electron cloud creates stronger London dispersion forces, explaining why S melts higher than P!',
    points: 150
  },
  {
    id: 'case-5',
    title: 'The Acid Deluge',
    difficulty: 'AS Exam Standard',
    targetElement: 'P',
    clues: [
      { category: 'Physical', text: 'Exists as simple tetrahedral P₄ molecules in its waxy white allotrope.' },
      { category: 'Reaction with Oxygen', text: 'Catches fire readily in air with a bright yellow flame, producing thick clouds of white solid smoke.' },
      { category: 'Oxide Behaviour', text: 'Its oxide reacts vigorously with water in a hissing reaction to yield a solution of pH 1-2.' },
      { category: 'Reaction with Chlorine', text: 'Forms a solid chloride in which the element expands its octet to have oxidation number +5.' }
    ],
    revealedCluesInitial: 2,
    explanation: 'Phosphorus burns to form P₄O₁₀ (phosphorus(V) oxide), which reacts violently with water to produce phosphoric(V) acid H₃PO₄ (pH 1-2). Its solid chloride is PCl₅.',
    points: 140
  },
  {
    id: 'case-6',
    title: 'The Violent Alkaline Dart',
    difficulty: 'AS Foundation',
    targetElement: 'Na',
    clues: [
      { category: 'Physical', text: 'Soft metal stored under mineral oil; has the largest atomic radius in Period 3 (186 pm).' },
      { category: 'Reaction with Water', text: 'Darts rapidly on the surface of cold water, melts into a silvery sphere, and fizzes vigorously with a yellow flame.' },
      { category: 'Oxide Behaviour', text: 'Forms an oxide that dissolves exothermically in water to produce a solution with pH 13-14.' },
      { category: 'Chloride Hydrolysis', text: 'Its chloride dissolves purely by hydration into ions, giving a completely neutral pH 7 with zero fuming.' }
    ],
    revealedCluesInitial: 2,
    explanation: 'Sodium reacts violently with cold water to form NaOH (pH 14) and H₂ gas. Its oxide Na₂O is strongly basic, and NaCl dissolves neutrally without hydrolysis.',
    points: 100
  },
  {
    id: 'case-7',
    title: 'The Choking Halogen',
    difficulty: 'AS Foundation',
    targetElement: 'Cl',
    clues: [
      { category: 'Physical', text: 'A pale yellow-green choking gas at room temperature with the smallest atomic radius among Period 3 reactive elements.' },
      { category: 'Physical', text: 'Exists as discrete diatomic molecules held by very weak van der Waals forces.' },
      { category: 'Reaction with Water', text: 'Undergoes disproportionation in cold water to form a pale green solution containing hydrochloric acid and hypochlorous acid.' },
      { category: 'Reaction with Oxygen', text: 'Does not burn directly in oxygen under standard conditions.' }
    ],
    revealedCluesInitial: 2,
    explanation: 'Chlorine (Cl₂) is a diatomic halogen gas. It disproportionates in water: Cl₂ + H₂O ⇌ HCl + HClO.',
    points: 100
  },
  {
    id: 'case-8',
    title: 'The Silent Octet',
    difficulty: 'AS Foundation',
    targetElement: 'Ar',
    clues: [
      { category: 'Physical', text: 'A completely colourless, odourless, monatomic gas with the lowest melting point in Period 3 (84 K / -189 °C).' },
      { category: 'Physical', text: 'Has a complete octet [Ne] 3s² 3p⁶ and does not form covalent or ionic bonds.' },
      { category: 'Reaction with Oxygen', text: 'Completely unreactive with oxygen, chlorine, or water even under extreme heating.' }
    ],
    revealedCluesInitial: 2,
    explanation: 'Argon is the noble gas of Period 3 with a full outer valence shell, existing as single unbonded atoms with minimal London dispersion forces.',
    points: 90
  }
];

export const EQUATION_CHALLENGES: EquationChallenge[] = [
  {
    id: 'eq-1',
    title: 'Combustion of Sodium in Oxygen',
    prompt: 'Balance the equation for the formation of standard sodium oxide:',
    reactants: ['Na(s)', 'O₂(g)'],
    products: ['Na₂O(s)'],
    targetCoefficients: [4, 1, 2],
    stateSymbols: ['(s)', '(g)', '(s)'],
    notes: '4 moles of sodium react with 1 mole of oxygen to yield 2 moles of sodium oxide.'
  },
  {
    id: 'eq-2',
    title: 'Magnesium Burning in Steam',
    prompt: 'Balance the reaction of heated magnesium with steam (gaseous water):',
    reactants: ['Mg(s)', 'H₂O(g)'],
    products: ['MgO(s)', 'H₂(g)'],
    targetCoefficients: [1, 1, 1, 1],
    stateSymbols: ['(s)', '(g)', '(s)', '(g)'],
    notes: 'Magnesium forms magnesium OXIDE (MgO) with steam, NOT hydroxide!'
  },
  {
    id: 'eq-3',
    title: 'Combustion of Phosphorus in Oxygen',
    prompt: 'Balance the formation of phosphorus(V) oxide:',
    reactants: ['P₄(s)', 'O₂(g)'],
    products: ['P₄O₁₀(s)'],
    targetCoefficients: [1, 5, 1],
    stateSymbols: ['(s)', '(g)', '(s)'],
    notes: '1 mole of tetrahedral P₄ reacts with 5 moles of O₂ to produce 1 mole of P₄O₁₀.'
  },
  {
    id: 'eq-4',
    title: 'Amphoteric Al₂O₃ Reacting with Sodium Hydroxide',
    prompt: 'Balance the reaction of aluminium oxide acting as an ACID with hot conc NaOH:',
    reactants: ['Al₂O₃(s)', 'NaOH(aq)', 'H₂O(l)'],
    products: ['Na[Al(OH)₄](aq)'],
    targetCoefficients: [1, 2, 3, 2],
    stateSymbols: ['(s)', '(aq)', '(l)', '(aq)'],
    notes: 'Forms soluble sodium tetrahydroxoaluminate Na[Al(OH)₄].'
  },
  {
    id: 'eq-5',
    title: 'Violent Hydrolysis of Silicon Tetrachloride',
    prompt: 'Balance the reaction of liquid SiCl₄ with water:',
    reactants: ['SiCl₄(l)', 'H₂O(l)'],
    products: ['SiO₂(s)', 'HCl(g)'],
    targetCoefficients: [1, 2, 1, 4],
    stateSymbols: ['(l)', '(l)', '(s)', '(g)'],
    notes: 'Produces a white precipitate of SiO₂ and 4 moles of steamy HCl gas.'
  },
  {
    id: 'eq-6',
    title: 'Reaction of Phosphorus(V) Oxide with Water',
    prompt: 'Balance the hydration of P₄O₁₀ to form phosphoric(V) acid:',
    reactants: ['P₄O₁₀(s)', 'H₂O(l)'],
    products: ['H₃PO₄(aq)'],
    targetCoefficients: [1, 6, 4],
    stateSymbols: ['(s)', '(l)', '(aq)'],
    notes: '1 mole of P₄O₁₀ reacts with 6 moles of H₂O to give 4 moles of H₃PO₄.'
  },
  {
    id: 'eq-7',
    title: 'Hydrolysis of Phosphorus(V) Chloride',
    prompt: 'Balance the complete violent hydrolysis of PCl₅ in water:',
    reactants: ['PCl₅(s)', 'H₂O(l)'],
    products: ['H₃PO₄(aq)', 'HCl(g)'],
    targetCoefficients: [1, 4, 1, 5],
    stateSymbols: ['(s)', '(l)', '(aq)', '(g)'],
    notes: 'Produces 1 mole of phosphoric acid and 5 moles of acidic HCl fumes.'
  }
];

export const SORTING_CHALLENGES = [
  {
    id: 'sort-mp',
    title: 'Melting Point of Period 3 Elements',
    subtitle: 'Order from LOWEST melting point (left) to HIGHEST melting point (right)',
    category: 'Melting Point',
    unit: 'K',
    correctOrder: ['Ar', 'Cl', 'P', 'Na', 'S', 'Mg', 'Al', 'Si'] as ElementSymbol[],
    explanations: {
      Ar: '84 K (monatomic gas, weakest London dispersion)',
      Cl: '172 K (small Cl₂ molecules)',
      P: '317 K (P₄ molecules)',
      Na: '371 K (metallic, 1 delocalised electron, Na⁺)',
      S: '392 K (S₈ rings have MORE electrons than P₄, so stronger van der Waals!)',
      Mg: '923 K (metallic, 2 delocalised electrons, Mg²⁺)',
      Al: '933 K (metallic, 3 delocalised electrons, Al³⁺)',
      Si: '1687 K (PEAK: Giant 3D macromolecular covalent lattice)'
    },
    keyTakeaway: 'Notice the S > P bump! S₈ has 128 electrons vs P₄ with 60 electrons, giving S stronger London dispersion forces. Silicon is the peak due to giant covalent bonding.'
  },
  {
    id: 'sort-radius',
    title: 'Atomic Radius of Period 3 Elements',
    subtitle: 'Order from LARGEST atomic radius (left) to SMALLEST atomic radius (right)',
    category: 'Atomic Radius',
    unit: 'pm',
    correctOrder: ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'] as ElementSymbol[],
    explanations: {
      Na: '186 pm (Lowest nuclear charge +11)',
      Mg: '160 pm (+12 protons)',
      Al: '143 pm (+13 protons)',
      Si: '118 pm (+14 protons)',
      P: '110 pm (+15 protons)',
      S: '102 pm (+16 protons)',
      Cl: '99 pm (+17 protons)',
      Ar: '98 pm (Highest nuclear charge +18 with same shielding)'
    },
    keyTakeaway: 'Atomic radius steadily decreases across Period 3 because nuclear charge increases while electron shielding remains approximately constant, pulling valence electrons closer.'
  },
  {
    id: 'sort-conductivity',
    title: 'Electrical Conductivity of Period 3 Elements',
    subtitle: 'Order from LOWEST electrical conductivity (left) to HIGHEST electrical conductivity (right)',
    category: 'Electrical Conductivity',
    unit: 'MS/m',
    correctOrder: ['Ar', 'Cl', 'S', 'P', 'Si', 'Na', 'Mg', 'Al'] as ElementSymbol[],
    explanations: {
      Ar: '0 (Monatomic noble gas, non-conductor)',
      Cl: '0 (Simple molecular, non-conductor)',
      S: '0 (Simple molecular, non-conductor)',
      P: '0 (Simple molecular, non-conductor)',
      Si: '0.001 (Semiconductor)',
      Na: '21 (Metallic lattice, 1 mobile electron per atom)',
      Mg: '23 (Metallic lattice, 2 mobile electrons per atom)',
      Al: '38 (Metallic lattice, 3 mobile electrons per atom - highest!)'
    },
    keyTakeaway: 'Conductivity increases Na < Mg < Al with more delocalised electrons per ion in the metallic lattice. Non-metals have zero mobile charge carriers.'
  }
];
