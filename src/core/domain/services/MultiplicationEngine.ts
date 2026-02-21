import type { MultiplicationResult, PartialProduct } from '../entities/MathTypes';

export class MultiplicationEngine {
  public static calculate(factorA: number, factorB: number): MultiplicationResult {
    const digitsA = this.toDigitArray(factorA);
    const digitsB = this.toDigitArray(factorB);
    const partials = this.generatePartials(factorA, digitsB);

    return {
      factorA: digitsA,
      factorB: digitsB,
      partials,
      total: this.toDigitArray(factorA * factorB),
      totalSteps: 2 + partials.length + 1
    };
  }

  private static toDigitArray(value: number): number[] {
    return value.toString().split('').map(Number);
  }

  private static generatePartials(factorA: number, digitsB: number[]): PartialProduct[] {
    const reversedB = [...digitsB].reverse();
    return reversedB.map((digit, index) => ({
      digits: this.toDigitArray(factorA * digit),
      indentation: index
    }));
  }
}