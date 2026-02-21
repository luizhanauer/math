import { describe, it, expect } from 'vitest';
import { AdditionEngine } from '../AdditionEngine';

describe('AdditionEngine', () => {
  it('deve somar dois números corretamente sem "vai um" (carry over)', () => {
    const result = AdditionEngine.calculate(12, 34);
    expect(result.result).toEqual([4, 6]);
    expect(result.totalSteps).toBe(4); // 2 passos + 2 extras (formatação)
  });

  it('deve aplicar o "vai um" (carry over) corretamente', () => {
    const result = AdditionEngine.calculate(99, 1);
    expect(result.result).toEqual([1, 0, 0]);
    // O último passo na posição 0 deve ter carryOut de 1
    const lastAdditionStep = result.steps.find(s => s.carryOut === 1);
    expect(lastAdditionStep).toBeDefined();
  });

  it('deve lidar com inputs vazios ou zero graciosamente', () => {
    // Simulando o fallback de undefined/0
    const result = AdditionEngine.calculate(0, 0);
    expect(result.result).toEqual([0]);
  });
});