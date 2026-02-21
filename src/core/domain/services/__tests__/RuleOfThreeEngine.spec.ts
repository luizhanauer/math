import { describe, it, expect } from 'vitest';
import { RuleOfThreeEngine } from '../RuleOfThreeEngine';

describe('RuleOfThreeEngine', () => {
  it('deve lançar erro se o valor A for zero', () => {
    expect(() => RuleOfThreeEngine.calculate(0, 10, 20)).toThrowError("O valor base 'A' não pode ser zero.");
  });

  it('deve resolver a proporção A/B = C/X corretamente', () => {
    const result = RuleOfThreeEngine.calculate(2, 4, 3);
    
    expect(result.result).toBe(6);
    expect(result.steps.length).toBe(5); 
    expect(result.steps[4]?.formula).toBe('X = 6');
  });
});