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

  it('génère des distracteurs du même type pour les questions factuelles', () => {
    const question = questions.find((item) => item.question === 'Quel État a quitté l’Union européenne en 2020 ?');
    const choices = buildChoices(question);
    expect(choices).toHaveLength(4);
    expect(choices.some((choice) => /Royaume-Uni/.test(choice))).toBe(true);
    expect(choices.every((choice) => /France|Allemagne|Suisse|Royaume-Uni|Norvège|Italie|Belgique|Espagne/.test(choice))).toBe(true);
  });

  it('réduit une réponse géographique multiple à une réponse canonique', () => {
    const question = questions.find((item) => item.question === 'Quel pays a une frontière terrestre avec la France ?');
    const choices = buildChoices(question);
    expect(choices).toHaveLength(4);
    expect(choices.every((choice) => /France|Allemagne|Suisse|Royaume-Uni|Norvège|Italie|Belgique|Espagne/.test(choice))).toBe(true);
    expect(choices.every((choice) => !choice.includes(','))).toBe(true);
  });

  it('sélectionne des distracteurs liés au sujet de la question', () => {
    const question = questions.find((item) => item.question === "Qu'est-ce que l'Hôtel de Matignon ?");
    const choices = buildChoices(question);
    expect(choices).toHaveLength(4);
    expect(choices).toContain('La résidence officielle et le bureau du Premier ministre.');
    expect(choices).not.toContain('Le 9 mai.');
  });
});
