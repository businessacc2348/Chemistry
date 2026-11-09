export type ElementSymbol = 'Na' | 'Mg' | 'Al' | 'Si' | 'P' | 'S' | 'Cl' | 'Ar';

export interface ElementData {
  symbol: ElementSymbol;
  name: string;
  atomicNumber: number;
  group: number;
  period: number;
  electronConfig: string;
  valenceElectrons: number;
  atomicRadius: number; // pm
  ionicRadius?: number; // pm
  ionicSpecies?: string; // e.g. Na+, Mg2+, Al3+, P3-, S2-, Cl-
  meltingPoint: number; // Kelvin
  meltingPointC: number; // Celsius
  boilingPoint: number; // Kelvin
  electricalConductivity: number; // relative MS/m or scale 0-100
  structure: string; // e.g. "Giant metallic lattice", "Giant covalent lattice", "Simple molecular (P4)"
  bonding: string; // "Metallic", "Covalent", "Van der Waals forces between molecules"
  appearance: string; // e.g., "Soft silvery metal", "Yellow solid powder"
  stateAtRoomTemp: 'solid' | 'liquid' | 'gas';
  flameColor?: string;
  whyMeltingPoint: string;
  whyConductivity: string;
  whyRadius: string;
  whyIonicRadius?: string;
}

export interface ReactionDetail {
  reagent: 'O2' | 'Cl2' | 'H2O_cold' | 'H2O_steam';
  reagentName: string;
  equation: string;
  unbalancedEquation: string;
  coefficients: number[]; // Correct coefficients for equation balancing
  products: string;
  observations: string;
  flameOrEffectColor?: string;
  vigorLevel: 'violent' | 'vigorous' | 'slow' | 'none';
  heatEvolution: 'highly exothermic' | 'exothermic' | 'requires continuous heat' | 'no reaction';
  explanation: string;
}

export interface OxideData {
  formula: string;
  element: ElementSymbol;
  oxidationNumber: number;
  bonding: 'Giant ionic' | 'Giant covalent' | 'Simple molecular';
  structure: string;
  appearance: string;
  reactionWithWater: {
    reacts: boolean;
    equation: string;
    product: string;
    pH: number;
    pHRule: string;
    observations: string;
  };
  acidBaseNature: 'Basic' | 'Amphoteric' | 'Acidic';
  reactionsWithAcidBase: {
    acidReaction?: {
      reagent: string;
      equation: string;
      observation: string;
    };
    baseReaction?: {
      reagent: string;
      equation: string;
      observation: string;
    };
  };
  whyOxidationState: string;
}

export interface ChlorideData {
  formula: string;
  element: ElementSymbol;
  oxidationNumber: number;
  bonding: 'Giant ionic' | 'Covalent (covalent layer/dimer)' | 'Simple molecular';
  structure: string;
  reactionWithWater: {
    type: 'Hydration / Dissolution' | 'Slight Hydrolysis' | 'Vigorous Hydrolysis' | 'Violent Hydrolysis';
    equation: string;
    pH: number;
    observations: string; // White steamy fumes of HCl, white precipitate, etc.
    fumesOfHCl: boolean;
    explanation: string;
  };
}

export interface HydroxideData {
  formula: string;
  element: ElementSymbol;
  nature: 'Strong base' | 'Weak base' | 'Amphoteric';
  reactionWithAcid: string;
  reactionWithBase?: string;
  solubilityInWater: string;
  pH: number;
}

export interface MysteryCase {
  id: string;
  title: string;
  difficulty: 'AS Foundation' | 'AS Exam Standard' | 'A-Level Challenge';
  targetElement: ElementSymbol;
  targetCompound?: string;
  clues: {
    category: 'Physical' | 'Reaction with Oxygen' | 'Reaction with Chlorine' | 'Reaction with Water' | 'Oxide Behaviour' | 'Chloride Hydrolysis';
    text: string;
  }[];
  revealedCluesInitial: number;
  explanation: string;
  points: number;
}

export interface EquationChallenge {
  id: string;
  title: string;
  prompt: string;
  reactants: string[];
  products: string[];
  targetCoefficients: number[];
  stateSymbols: string[];
  notes: string;
}

export interface GameScore {
  labExperimentsCompleted: number;
  deductionCasesSolved: number;
  hydrolysisStreak: number;
  sorterBestScore: number;
  totalPoints: number;
  badges: string[];
}
