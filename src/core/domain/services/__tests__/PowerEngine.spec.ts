import { describe, it, expect } from 'vitest';
import { PowerEngine } from '../PowerEngine';

describe('PowerEngine', () => {
  it('deve calcular a potência iterativamente registrando os passos', () => {
    const result = PowerEngine.calculate(2, 3);
    
    expect(result.base).toBe(2);
    expect(result.exponent).toBe(3);
    expect(result.steps).toHaveLength(3);
    
    expect(result.steps[0]?.accumulatedValue).toBe(2);
    expect(result.steps[1]?.accumulatedValue).toBe(4);
    expect(result.steps[2]?.accumulatedValue).toBe(8);
  });

  it('deve retornar 1 (sem passos de multiplicação) para expoente 0', () => {
    const result = PowerEngine.calculate(5, 0);
    expect(result.steps).toHaveLength(0);
  });
});