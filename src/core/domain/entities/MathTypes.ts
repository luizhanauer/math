export interface BaseStep {
  readonly currentStep: number;
}

export interface AdditionStep extends BaseStep {
  readonly digitA: number;
  readonly digitB: number;
  readonly carryIn: number;
  readonly carryOut: number;
  readonly sum: number;
  readonly position: number;
}

export interface AdditionResult {
  readonly factorA: number[];
  readonly factorB: number[];
  readonly result: number[];
  readonly steps: AdditionStep[];
  readonly totalSteps: number;
}

export interface SubtractionStep extends BaseStep {
  readonly topDigit: number;
  readonly bottomDigit: number;
  readonly borrowed: boolean;
  readonly difference: number;
  readonly position: number;
}

export interface SubtractionResult {
  readonly minuend: number[];
  readonly subtrahend: number[];
  readonly result: number[];
  readonly steps: SubtractionStep[];
  readonly totalSteps: number;
}

export interface PartialProduct {
  readonly digits: number[];
  readonly indentation: number;
}

export interface MultiplicationResult {
  readonly factorA: number[];
  readonly factorB: number[];
  readonly partials: PartialProduct[];
  readonly total: number[];
  readonly totalSteps: number;
}

export interface DivisionStep {
  readonly currentDividend: number;
  readonly subtractor: number;
  readonly remainder: number;
}

export interface DivisionResult {
  // Alterado para suportar o sinal de '-' visualmente
  readonly dividend: (number | string)[];
  readonly divisor: number;
  readonly quotient: (number | string)[];
  readonly steps: DivisionStep[];
  readonly totalSteps: number;
}

export interface RuleOfThreeStep {
  readonly description: string;
  readonly formula: string;
}

export interface RuleOfThreeResult {
  readonly a: number;
  readonly b: number;
  readonly c: number;
  readonly result: number;
  readonly steps: RuleOfThreeStep[];
  readonly totalSteps: number;
}

export type FractionOperator = '+' | '-' | '*' | '/';

export interface Fraction {
  readonly numerator: number;
  readonly denominator: number;
}

export interface FractionStep {
  readonly description: string;
  readonly f1: Fraction;
  readonly f2: Fraction;
  readonly operator: FractionOperator;
  readonly result?: Fraction;
}

export interface FractionResult {
  readonly originalF1: Fraction;
  readonly originalF2: Fraction;
  readonly operator: FractionOperator;
  readonly steps: FractionStep[];
  readonly totalSteps: number;
}

export interface PowerStep {
  readonly currentMultiplier: number;
  readonly accumulatedValue: number;
}

export interface PowerResult {
  readonly base: number;
  readonly exponent: number;
  readonly steps: PowerStep[];
  readonly totalSteps: number;
}