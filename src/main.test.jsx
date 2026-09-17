import { describe, expect, it } from 'vitest';
import { buildQuiz, questions } from './main.jsx';

describe('corpus du quiz', () => {
  it('contient quatre choix et une seule bonne réponse par question', () => {
    expect(questions.length).toBeGreaterThan(250);
    expect(new Set(questions.map((item) => item.category)).size).toBe(5);
    expect(questions.filter((item) => item.situation).length).toBe(50);
    questions.forEach((item) => {
      expect(item.choices).toHaveLength(4);
      expect(item.choices.filter((choice) => choice === item.answer)).toHaveLength(1);
    });
  });

  it('compose chaque session de 40 questions avec 28 officielles équilibrées et 12 situations', () => {
    const session = buildQuiz();
    expect(session).toHaveLength(40);
    expect(session.filter((item) => item.situation)).toHaveLength(12);
    const official = session.filter((item) => !item.situation);
    expect(official).toHaveLength(28);
    expect(official.filter((item) => item.category === 'Principes & valeurs')).toHaveLength(6);
    expect(official.filter((item) => item.category === 'Institutions')).toHaveLength(6);
    expect(official.filter((item) => item.category === 'Droits & devoirs')).toHaveLength(6);
    expect(official.filter((item) => item.category === 'Histoire & culture')).toHaveLength(5);
    expect(official.filter((item) => item.category === 'Vie quotidienne')).toHaveLength(5);
    expect(new Set(session.map((item) => item.category)).size).toBe(5);
  });
});
