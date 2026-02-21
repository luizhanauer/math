import type { FractionResult, FractionStep, Fraction, FractionOperator } from '../entities/MathTypes';

export class FractionEngine {
  public static calculate(n1: number, d1: number, n2: number, d2: number, op: FractionOperator): FractionResult {
    this.validateInputs(d1, d2, n2, op);

    const f1: Fraction = { numerator: n1, denominator: d1 };
    const f2: Fraction = { numerator: n2, denominator: d2 };

    switch (op) {
      case '+': return this.processAddSub(f1, f2, '+');
      case '-': return this.processAddSub(f1, f2, '-');
      case '*': return this.processMultiplication(f1, f2, '*');
      case '/': return this.processDivision(f1, f2, '/');
      default: throw new Error("Operador de fração inválido.");
    }
  }

  private static validateInputs(d1: number, d2: number, n2: number, op: FractionOperator): void {
    if (d1 === 0 || d2 === 0) throw new Error("Denominador não pode ser zero.");
    if (op === '/' && n2 === 0) throw new Error("Divisão por zero não permitida na segunda fração.");
  }

  // Soma e Subtração compartilham a mesma lógica base (MMC)
  private static processAddSub(f1: Fraction, f2: Fraction, op: '+' | '-'): FractionResult {
    const steps: FractionStep[] = [];
    const lcm = this.calculateLCM(f1.denominator, f2.denominator);
    
    steps.push({ description: "Frações originais", f1, f2, operator: op });
    
    const eq1 = { numerator: f1.numerator * (lcm / f1.denominator), denominator: lcm };
    const eq2 = { numerator: f2.numerator * (lcm / f2.denominator), denominator: lcm };
    steps.push({ description: `Frações equivalentes (MMC = ${lcm})`, f1: eq1, f2: eq2, operator: op });

    const finalNumerator = op === '+' ? eq1.numerator + eq2.numerator : eq1.numerator - eq2.numerator;
    const result = { numerator: finalNumerator, denominator: lcm };
    
    const desc = op === '+' ? "Soma dos numeradores" : "Subtração dos numeradores";
    steps.push({ description: desc, f1: eq1, f2: eq2, operator: op, result });

    return { originalF1: f1, originalF2: f2, operator: op, steps, totalSteps: steps.length };
  }

  // Multiplicação: Numerador x Numerador, Denominador x Denominador
  private static processMultiplication(f1: Fraction, f2: Fraction, op: '*'): FractionResult {
    const steps: FractionStep[] = [];
    steps.push({ description: "Frações originais", f1, f2, operator: op });
    
    const result = { numerator: f1.numerator * f2.numerator, denominator: f1.denominator * f2.denominator };
    steps.push({ description: "Multiplicação direta (Num × Num, Den × Den)", f1, f2, operator: op, result });
    
    return { originalF1: f1, originalF2: f2, operator: op, steps, totalSteps: steps.length };
  }

  // Divisão: Conserva a primeira, inverte a segunda e multiplica
  private static processDivision(f1: Fraction, f2: Fraction, op: '/'): FractionResult {
    const steps: FractionStep[] = [];
    steps.push({ description: "Frações originais", f1, f2, operator: op });
    
    const invertedF2 = { numerator: f2.denominator, denominator: f2.numerator };
    steps.push({ description: "Inverte a 2ª fração e troca para multiplicação", f1, f2: invertedF2, operator: '*' });
    
    const result = { numerator: f1.numerator * invertedF2.numerator, denominator: f1.denominator * invertedF2.denominator };
    steps.push({ description: "Multiplicação direta", f1, f2: invertedF2, operator: '*', result });
    
    return { originalF1: f1, originalF2: f2, operator: op, steps, totalSteps: steps.length };
  }

  private static calculateGCD(a: number, b: number): number {
    if (b === 0) return Math.abs(a);
    return this.calculateGCD(b, a % b);
  }

  private static calculateLCM(a: number, b: number): number {
    return Math.abs((a * b) / this.calculateGCD(a, b));
  }
}