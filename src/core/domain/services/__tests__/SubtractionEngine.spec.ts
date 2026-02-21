import { describe, it, expect } from 'vitest';
import { SubtractionEngine } from '../SubtractionEngine';

describe('SubtractionEngine', () => {
  it('deve subtrair dois números simples sem empréstimo', () => {
    const result = SubtractionEngine.calculate(58, 23);
    expect(result.result).toEqual([3, 5]);
    expect(result.steps[0]?.borrowed).toBe(false);
  });

  it('deve realizar o empréstimo (borrow) corretamente', () => {
    const result = SubtractionEngine.calculate(52, 28);
    expect(result.result).toEqual([2, 4]);
    
    const unitStep = result.steps.find(s => s.position === 1);
    expect(unitStep?.borrowed).toBe(true);
    expect(unitStep?.topDigit).toBe(12);
  });

  it('deve lidar com cascata de empréstimos (ex: 100 - 1)', () => {
    const result = SubtractionEngine.calculate(100, 1);
    expect(result.result).toEqual([0, 9, 9]);
    
    const tenStep = result.steps.find(s => s.position === 1);
    expect(tenStep?.topDigit).toBe(9);
  });
});