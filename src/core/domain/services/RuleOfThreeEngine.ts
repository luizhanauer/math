import type { RuleOfThreeResult, RuleOfThreeStep } from '../entities/MathTypes';

export class RuleOfThreeEngine {
  public static calculate(a: number, b: number, c: number): RuleOfThreeResult {
    this.validateInputs(a);

    const steps: RuleOfThreeStep[] = [];
    const finalResult = (b * c) / a;
    const partialMultiplication = b * c;

    steps.push({ description: "Montagem da equação", formula: `${a} / ${b} = ${c} / X` });
    steps.push({ description: "Multiplicação cruzada", formula: `${a} * X = ${b} * ${c}` });
    steps.push({ description: "Resolução do produto", formula: `${a} * X = ${partialMultiplication}` });
    steps.push({ description: "Isolamento de X", formula: `X = ${partialMultiplication} / ${a}` });
    steps.push({ description: "Resultado Final", formula: `X = ${finalResult}` });

    return { a, b, c, result: finalResult, steps, totalSteps: steps.length };
  }

  private static validateInputs(a: number): void {
    if (a === 0) throw new Error("O valor base 'A' não pode ser zero.");
  }
}