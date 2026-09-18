import { describe, expect, it } from 'vitest';
import { buildChoices, buildQuiz, questions } from './main.jsx';

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

  it('compose un quiz thématique de 20 questions officielles sans situations', () => {
    const session = buildQuiz({ category: 'Institutions' });
    expect(session).toHaveLength(20);
    expect(session.every((item) => item.category === 'Institutions' && !item.situation)).toBe(true);
  });

  it('compose un entraînement de 20 mises en situation', () => {
    const session = buildQuiz({ situationsOnly: true });
    expect(session).toHaveLength(20);
    expect(session.every((item) => item.situation)).toBe(true);
  });

  it('conserve toujours la bonne réponse dans les quatre choix', () => {
    Array.from({ length: 25 }, () => buildQuiz()).flat().forEach((item) => {
      expect(item.choices).toHaveLength(4);
      expect(item.choices.filter((choice) => choice === item.answer)).toHaveLength(1);
      expect(item.choices.some((choice) => choice.includes('(') || choice.includes(')'))).toBe(false);
    });
  });

  it('conserve les propositions précises du document V3', () => {
    expect(questions.filter((item) => item.precise)).toHaveLength(209);
    const louis = questions.find((item) => item.precise && item.question === 'Quel était le surnom de Louis XIV ?');
    expect(louis).toBeDefined();
    expect(louis.choices).toContain('Le Roi-Soleil');
    expect(louis.choices.filter((choice) => choice === louis.answer)).toHaveLength(1);
  });
});
