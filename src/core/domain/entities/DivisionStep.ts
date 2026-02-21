export interface DivisionStep {
  readonly currentDividend: number; // O número sendo dividido no momento
  readonly subtractor: number;      // O resultado da multiplicação (divisor * quociente)
  readonly remainder: number;       // O que sobra após a subtração
}

export interface DivisionResult {
  readonly dividend: number[];
  readonly divisor: number;
  readonly quotient: number[];
  readonly steps: DivisionStep[];
  readonly totalSteps: number;
}