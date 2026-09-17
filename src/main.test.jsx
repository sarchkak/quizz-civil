import { describe, expect, it } from 'vitest';
import { questions } from './main.jsx';

describe('corpus du quiz', () => {
  it('contient quatre choix et une seule bonne réponse par question', () => {
    expect(questions.length).toBeGreaterThan(30);
    expect(new Set(questions.map((item) => item.category)).size).toBe(5);
    questions.forEach((item) => {
      expect(item.choices).toHaveLength(4);
      expect(item.choices.filter((choice) => choice === item.answer)).toHaveLength(1);
    });
  });
});
