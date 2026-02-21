import type { DivisionResult, DivisionStep } from '../entities/MathTypes';

export class DivisionEngine {
  public static calculate(dividend: number, divisor: number): DivisionResult {
    this.validateDivisor(divisor);

    // Fallback de segurança caso o usuário apague o input
    const safeDividend = dividend || 0; 
    
    // Extrai os valores absolutos para montar a "escada" da divisão perfeitamente
    const absDividend = Math.abs(safeDividend);
    const absDivisor = Math.abs(divisor);
    
    // Regra dos sinais: se apenas UM deles for negativo, o resultado é negativo
    const isNegativeResult = (safeDividend < 0 !== divisor < 0) && absDividend !== 0;

    return this.processDivision(absDividend, absDivisor, safeDividend, divisor, isNegativeResult);
  }

  private static validateDivisor(divisor: number): void {
    if (divisor === 0) throw new Error("Divisão por zero não permitida.");
  }

  private static processDivision(absDividend: number, absDivisor: number, originalDividend: number, originalDivisor: number, isNegativeResult: boolean): DivisionResult {
    const dividendStr = absDividend.toString();
    const steps: DivisionStep[] = [];
    const quotientDigits: (number | string)[] = [];
    let currentPart = "";

    // Adiciona o sinal de menos antecipadamente no quociente, se necessário
    if (isNegativeResult) {
      quotientDigits.push('-');
    }

    for (let i = 0; i < dividendStr.length; i++) {
      currentPart += dividendStr.charAt(i);
      const currentVal = parseInt(currentPart, 10);

      const handled = this.handleDigit(currentVal, absDivisor, quotientDigits, steps);
      currentPart = handled.newPart;
    }

    this.ensureQuotientNotEmpty(quotientDigits);

    return {
      dividend: this.formatDividend(originalDividend, dividendStr),
      divisor: originalDivisor, // Mantém o divisor original para exibir a chave corretamente (ex: -1)
      quotient: quotientDigits,
      steps,
      totalSteps: steps.length + 2
    };
  }

  private static formatDividend(originalDividend: number, absDividendStr: string): (number | string)[] {
    const digits: (number | string)[] = absDividendStr.split('').map(Number);
    if (originalDividend < 0) digits.unshift('-');
    return digits;
  }

  private static handleDigit(currentVal: number, divisor: number, quotientDigits: (number | string)[], steps: DivisionStep[]): { newPart: string } {
    if (currentVal < divisor) {
      this.addZeroToQuotientIfNotEmpty(quotientDigits);
      return { newPart: currentVal.toString() };
    }

    const digitQuotient = Math.floor(currentVal / divisor);
    const subtractor = digitQuotient * divisor;
    const remainder = currentVal - subtractor;

    steps.push({ currentDividend: currentVal, subtractor, remainder });
    quotientDigits.push(digitQuotient);

    return { newPart: remainder.toString() };
  }

  private static addZeroToQuotientIfNotEmpty(quotientDigits: (number | string)[]): void {
    // Só adiciona o zero se já existirem NÚMEROS no quociente (ignora se houver apenas o sinal de '-')
    const hasNumbers = quotientDigits.some(d => typeof d === 'number');
    if (hasNumbers) quotientDigits.push(0);
  }

  private static ensureQuotientNotEmpty(quotientDigits: (number | string)[]): void {
    const hasNumbers = quotientDigits.some(d => typeof d === 'number');
    if (!hasNumbers) quotientDigits.push(0);
  }
}