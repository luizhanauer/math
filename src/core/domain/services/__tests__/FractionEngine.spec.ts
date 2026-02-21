import { describe, it, expect } from 'vitest';
import { FractionEngine } from '../FractionEngine';

describe('FractionEngine', () => {
  it('deve lançar erro se o denominador de qualquer fração for zero', () => {
    expect(() => FractionEngine.calculate(1, 0, 1, 2, '+')).toThrowError('Denominador não pode ser zero.');
    expect(() => FractionEngine.calculate(1, 2, 1, 0, '+')).toThrowError('Denominador não pode ser zero.');
  });

  it('deve lançar erro se tentar dividir por uma fração com numerador zero', () => {
    expect(() => FractionEngine.calculate(1, 2, 0, 3, '/')).toThrowError('Divisão por zero não permitida na segunda fração.');
  });

  it('deve somar duas frações calculando o MMC corretamente', () => {
    const result = FractionEngine.calculate(1, 2, 1, 3, '+');
    const finalStep = result.steps[result.steps.length - 1];
    
    expect(finalStep?.result?.numerator).toBe(5);
    expect(finalStep?.result?.denominator).toBe(6);
  });

  it('deve multiplicar frações de forma direta', () => {
    const result = FractionEngine.calculate(1, 2, 2, 3, '*');
    const finalStep = result.steps[result.steps.length - 1];
    
    expect(finalStep?.result?.numerator).toBe(2);
    expect(finalStep?.result?.denominator).toBe(6);
  });
});