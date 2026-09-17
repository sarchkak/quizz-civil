import { describe, expect, it } from 'vitest';
import { buildQuiz, questions } from './main.jsx';

describe('corpus du quiz', () => {
  it('contient quatre choix et une seule bonne réponse par question', () => {
    expect(questions.length).toBeGreaterThan(30);
    expect(new Set(questions.map((item) => item.category)).size).toBe(5);
    expect(questions.filter((item) => item.situation).length).toBe(50);
    questions.forEach((item) => {
      expect(item.choices).toHaveLength(4);
      expect(item.choices.filter((choice) => choice === item.answer)).toHaveLength(1);
    });
  });

  it('compose chaque session de 40 questions avec 12 situations et les 5 rubriques', () => {
    const session = buildQuiz();
    expect(session).toHaveLength(40);
    expect(session.filter((item) => item.situation)).toHaveLength(12);
    expect(new Set(session.map((item) => item.category)).size).toBe(5);
  });
});
