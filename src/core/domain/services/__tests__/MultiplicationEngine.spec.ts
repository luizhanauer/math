import { describe, it, expect } from 'vitest';
import { MultiplicationEngine } from '../MultiplicationEngine';

describe('MultiplicationEngine', () => {
  it('deve gerar os produtos parciais e o resultado final', () => {
    const result = MultiplicationEngine.calculate(12, 10);
    
    expect(result.total).toEqual([1, 2, 0]);
    expect(result.partials).toHaveLength(2); 
    
    expect(result.partials[0]?.digits).toEqual([0]);
    expect(result.partials[0]?.indentation).toBe(0);
    
    expect(result.partials[1]?.digits).toEqual([1, 2]);
    expect(result.partials[1]?.indentation).toBe(1);
  });
});