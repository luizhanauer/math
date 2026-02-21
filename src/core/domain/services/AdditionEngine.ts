import type { AdditionResult, AdditionStep } from '../entities/MathTypes';

export class AdditionEngine {
  public static calculate(a: number, b: number): AdditionResult {
    // Fallback de segurança caso o usuário apague o input completamente
    const safeA = a || 0; 
    const safeB = b || 0;

    const strA = safeA.toString();
    const strB = safeB.toString();
    const maxLength = Math.max(strA.length, strB.length);
    
    const padA = strA.padStart(maxLength, '0');
    const padB = strB.padStart(maxLength, '0');
    
    return this.processDigits(padA, padB, maxLength);
  }

  private static processDigits(padA: string, padB: string, length: number): AdditionResult {
    const steps: AdditionStep[] = [];
    const result: number[] = [];
    let carry = 0;

    for (let i = length - 1; i >= 0; i--) {
      const digitA = parseInt(padA.charAt(i), 10);
      const digitB = parseInt(padB.charAt(i), 10);
      const sum = digitA + digitB + carry;
      
      const nextCarry = Math.floor(sum / 10);
      const currentDigit = sum % 10;

      steps.unshift({
        currentStep: length - i,
        digitA,
        digitB,
        carryIn: carry,
        carryOut: nextCarry,
        sum: currentDigit,
        position: i
      });

      result.unshift(currentDigit);
      carry = nextCarry;
    }

    this.handleFinalCarry(carry, result, steps);

    return {
      factorA: padA.split('').map(Number),
      factorB: padB.split('').map(Number),
      result,
      steps,
      totalSteps: steps.length + 2
    };
  }

  private static handleFinalCarry(carry: number, result: number[], steps: AdditionStep[]): void {
    if (carry === 0) return;
    
    result.unshift(carry);
    steps.unshift({
      currentStep: steps.length + 1,
      digitA: 0,
      digitB: 0,
      carryIn: carry,
      carryOut: 0,
      sum: carry,
      position: -1
    });
  }
}