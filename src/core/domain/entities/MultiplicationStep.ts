export interface PartialProduct {
  readonly digits: number[];
  readonly indentation: number;
}

export interface MultiplicationResult {
  readonly factorA: number[];
  readonly factorB: number[];
  readonly partials: PartialProduct[];
  readonly total: number[];
}