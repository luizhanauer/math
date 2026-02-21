import { describe, it, expect } from 'vitest';
import { DivisionEngine } from '../DivisionEngine';

describe('DivisionEngine', () => {
  it('deve lançar erro ao tentar dividir por zero', () => {
    expect(() => DivisionEngine.calculate(10, 0)).toThrowError('Divisão por zero não permitida.');
  });

  it('deve calcular uma divisão exata passo a passo', () => {
    const result = DivisionEngine.calculate(150, 5);
    expect(result.quotient).toEqual([3, 0]);
    expect(result.steps.length).toBeGreaterThan(0);
    
    const lastStep = result.steps[result.steps.length - 1];
    expect(lastStep?.remainder).toBe(0);
  });

  it('deve aplicar a regra dos sinais para divisão com divisor negativo', () => {
    const result = DivisionEngine.calculate(150, -2);
    expect(result.quotient[0]).toBe('-');
    expect(result.quotient.join('')).toBe('-75');
    expect(result.divisor).toBe(-2);
  });

  it('deve aplicar a regra dos sinais para divisão com dividendo negativo', () => {
    const result = DivisionEngine.calculate(-150, 2);
    expect(result.quotient.join('')).toBe('-75');
    expect(result.dividend[0]).toBe('-');
  });
});