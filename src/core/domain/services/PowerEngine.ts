import type { PowerResult, PowerStep } from '../entities/MathTypes';

export class PowerEngine {
  public static calculate(base: number, exponent: number): PowerResult {
    const steps: PowerStep[] = [];
    let accumulator = 1;

    for (let i = 1; i <= exponent; i++) {
      accumulator *= base;
      steps.push({
        currentMultiplier: base,
        accumulatedValue: accumulator
      });
    }

    return {
      base,
      exponent,
      steps,
      totalSteps: exponent + 1 // Inclui a montagem inicial
    };
  }
}