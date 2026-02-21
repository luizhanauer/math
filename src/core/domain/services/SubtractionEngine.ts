import type { SubtractionResult, SubtractionStep } from '../entities/MathTypes';

export class SubtractionEngine {
  public static calculate(minuend: number, subtrahend: number): SubtractionResult {
    const minStr = minuend.toString().padStart(subtrahend.toString().length, '0');
    const subStr = subtrahend.toString().padStart(minStr.length, '0');
    
    return this.processSubtraction(minStr.split('').map(Number), subStr.split('').map(Number));
  }

  private static processSubtraction(minArr: number[], subArr: number[]): SubtractionResult {
    const steps: SubtractionStep[] = [];
    const result: number[] = [];
    const workingMinuend = [...minArr];

    for (let i = minArr.length - 1; i >= 0; i--) {
      const subDigit = subArr[i] ?? 0;
      this.handleBorrowing(workingMinuend, i, subDigit);
      
      const currentMin = workingMinuend[i] ?? 0;
      const diff = currentMin - subDigit;
      result.unshift(diff);

      steps.unshift({
        currentStep: minArr.length - i,
        topDigit: currentMin,
        bottomDigit: subDigit,
        borrowed: currentMin !== (minArr[i] ?? 0),
        difference: diff,
        position: i
      });
    }

    return {
      minuend: minArr,
      subtrahend: subArr,
      result,
      steps,
      totalSteps: steps.length + 1
    };
  }

  private static handleBorrowing(workingMinuend: number[], currentIndex: number, subDigit: number): void {
    const currentMin = workingMinuend[currentIndex] ?? 0;
    if (currentMin >= subDigit) return;
    
    this.borrowFromNextAvailable(workingMinuend, currentIndex - 1);
    workingMinuend[currentIndex] = (workingMinuend[currentIndex] ?? 0) + 10;
  }

  private static borrowFromNextAvailable(workingMinuend: number[], searchIndex: number): void {
    if (searchIndex < 0) throw new Error("Resultado negativo não suportado no modo visual básico.");
    
    const currentSearch = workingMinuend[searchIndex] ?? 0;
    if (currentSearch > 0) {
      workingMinuend[searchIndex] = currentSearch - 1;
      return;
    }
    
    this.borrowFromNextAvailable(workingMinuend, searchIndex - 1);
    workingMinuend[searchIndex] = 9;
  }
}