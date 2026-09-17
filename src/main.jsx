import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Award, Check, ChevronLeft, CircleHelp, Clock3, Flag, RotateCcw, Sparkles, X } from 'lucide-react';
import './styles.css';

export const questions = [
  { category: 'Principes & valeurs', question: 'Quelle est la devise de la République française ?', answer: 'Liberté, Égalité, Fraternité', choices: ['Liberté, Égalité, Fraternité', 'Unité, Travail, Progrès', 'Honneur, Patrie, Justice', 'Paix, Force, Solidarité'] },
  { category: 'Principes & valeurs', question: 'Que garantit la liberté d’expression ?', answer: 'Le droit d’exprimer librement ses opinions dans le respect de la loi', choices: ['Le droit d’exprimer librement ses opinions dans le respect de la loi', 'Le droit de diffuser toute information sans aucune règle', 'Le droit de parler uniquement en privé', 'Le droit de remplacer une décision de justice'] },
  { category: 'Principes & valeurs', question: 'Que représente Marianne ?', answer: 'La République française et ses valeurs', choices: ['La République française et ses valeurs', 'La monnaie européenne', 'La justice européenne', 'La fête nationale uniquement'] },
  { category: 'Principes & valeurs', question: 'En quelle année la loi de séparation des Églises et de l’État a-t-elle été votée ?', answer: '1905', choices: ['1789', '1905', '1945', '1958'] },
  { category: 'Principes & valeurs', question: 'Quelle est la langue officielle de la République française ?', answer: 'Le français', choices: ['Le français', 'Le latin', 'L’anglais', 'Toutes les langues à égalité'] },
  { category: 'Principes & valeurs', question: 'Que signifie la laïcité ?', answer: 'La séparation de l’État et des religions, avec la liberté de conscience', choices: ['La séparation de l’État et des religions, avec la liberté de conscience', 'L’interdiction de toute religion', 'Le financement public de chaque religion', 'L’obligation de pratiquer une religion'] },
  { category: 'Institutions', question: 'Qui dirige l’action du Gouvernement ?', answer: 'Le Premier ministre', choices: ['Le président du Sénat', 'Le Premier ministre', 'Le préfet', 'Le maire de Paris'] },
  { category: 'Institutions', question: 'De quoi le Parlement est-il composé ?', answer: 'De l’Assemblée nationale et du Sénat', choices: ['Du Gouvernement et du Conseil constitutionnel', 'De l’Assemblée nationale et du Sénat', 'Des maires et des préfets', 'De la Cour de cassation et du Sénat'] },
  { category: 'Institutions', question: 'Quel est le rôle du pouvoir législatif ?', answer: 'Voter les lois', choices: ['Voter les lois', 'Rendre les décisions de justice', 'Diriger les communes', 'Commander la police municipale'] },
  { category: 'Institutions', question: 'Combien de députés composent l’Assemblée nationale ?', answer: '577', choices: ['348', '577', '620', '750'] },
  { category: 'Institutions', question: 'Quelle est la durée du mandat du maire et du conseil municipal ?', answer: '6 ans', choices: ['3 ans', '5 ans', '6 ans', '7 ans'] },
  { category: 'Institutions', question: 'Qui est le représentant de l’État dans le département ?', answer: 'Le préfet', choices: ['Le député', 'Le préfet', 'Le maire', 'Le président du conseil municipal'] },
  { category: 'Institutions', question: 'Quel est le régime politique de la France aujourd’hui ?', answer: 'La Ve République', choices: ['La Ire République', 'La IVe République', 'La Ve République', 'La monarchie constitutionnelle'] },
  { category: 'Droits & devoirs', question: 'La peine de mort en France est :', answer: 'Abolie', choices: ['Obligatoire dans certains cas', 'Abolie', 'Réservée aux crimes politiques', 'Suspendue seulement en temps de paix'] },
  { category: 'Droits & devoirs', question: 'Quel droit permet de cesser le travail pour des revendications professionnelles ?', answer: 'Le droit de grève', choices: ['Le droit de grève', 'Le droit de propriété', 'Le droit de retrait électoral', 'Le droit de pétition uniquement'] },
  { category: 'Droits & devoirs', question: 'Quelle est la loi suprême du pays ?', answer: 'La Constitution', choices: ['Le Code de la route', 'La Constitution', 'Le règlement municipal', 'Le traité de Rome'] },
  { category: 'Droits & devoirs', question: 'Quelle liberté permet de croire ou de ne pas croire ?', answer: 'La liberté de conscience', choices: ['La liberté de conscience', 'La liberté commerciale', 'La liberté syndicale', 'La liberté de circulation uniquement'] },
  { category: 'Droits & devoirs', question: 'Quelle proposition est une obligation pour les personnes résidant en France ?', answer: 'Respecter les lois', choices: ['Voter à chaque élection', 'Respecter les lois', 'Adhérer à une association', 'Posséder un logement'] },
  { category: 'Droits & devoirs', question: 'Pour quel motif la liberté d’expression peut-elle être limitée ?', answer: 'En cas d’injure, de diffamation ou d’incitation à la haine', choices: ['En cas d’injure, de diffamation ou d’incitation à la haine', 'Lorsqu’une opinion est minoritaire', 'Lorsqu’une personne critique le Gouvernement', 'Pour interdire toute discussion politique'] },
  { category: 'Droits & devoirs', question: 'Que doit faire une victime de violences ?', answer: 'Porter plainte auprès de la police ou de la gendarmerie', choices: ['Garder le silence dans tous les cas', 'Porter plainte auprès de la police ou de la gendarmerie', 'Quitter immédiatement le territoire', 'Attendre une autorisation de la mairie'] },
  { category: 'Histoire & culture', question: 'Quel était le surnom de Louis XIV ?', answer: 'Le Roi-Soleil', choices: ['Le Roi-Soleil', 'Le Roi-Citoyen', 'Le Père de la Nation', 'Le Roi des Montagnes'] },
  { category: 'Histoire & culture', question: 'En quelle année Napoléon Ier est-il devenu empereur ?', answer: '1804', choices: ['1789', '1792', '1804', '1815'] },
  { category: 'Histoire & culture', question: 'Qui était une figure de la Résistance française ?', answer: 'Jean Moulin', choices: ['Jean Moulin', 'Louis XIV', 'Jules Ferry', 'Georges Clemenceau'] },
  { category: 'Histoire & culture', question: 'En 1944, quel droit les femmes françaises ont-elles obtenu ?', answer: 'Le droit de vote', choices: ['Le droit de vote', 'Le droit de conduire', 'Le droit à la retraite', 'Le droit de grève'] },
  { category: 'Histoire & culture', question: 'Quelle organisation internationale a été créée en 1945 ?', answer: 'L’ONU', choices: ['L’ONU', 'L’OTAN', 'La BCE', 'La CECA'] },
  { category: 'Histoire & culture', question: 'Quel fleuve traverse Paris ?', answer: 'La Seine', choices: ['La Loire', 'La Seine', 'Le Rhône', 'La Garonne'] },
  { category: 'Histoire & culture', question: 'Quelle chaîne de montagnes se situe entre la France et l’Espagne ?', answer: 'Les Pyrénées', choices: ['Les Alpes', 'Les Vosges', 'Les Pyrénées', 'Le Jura'] },
  { category: 'Histoire & culture', question: 'Quelle cathédrale a été partiellement détruite par un incendie en 2019 ?', answer: 'Notre-Dame de Paris', choices: ['Notre-Dame de Paris', 'La cathédrale de Reims', 'La cathédrale de Chartres', 'La cathédrale de Strasbourg'] },
  { category: 'Histoire & culture', question: 'Quelle fête est la fête nationale française ?', answer: 'Le 14 juillet', choices: ['Le 1er mai', 'Le 8 mai', 'Le 14 juillet', 'Le 11 novembre'] },
  { category: 'Institutions', question: 'Quelle est la devise de l’Union européenne ?', answer: 'Unie dans la diversité', choices: ['Unie dans la diversité', 'Liberté, Égalité, Fraternité', 'L’Europe pour tous', 'Ensemble vers la paix'] },
  { category: 'Institutions', question: 'Combien d’étoiles figurent sur le drapeau européen ?', answer: '12', choices: ['6', '10', '12', '27'] },
  { category: 'Institutions', question: 'En quelle année le traité de Maastricht a-t-il été signé ?', answer: '1992', choices: ['1951', '1957', '1992', '2002'] },
  { category: 'Institutions', question: 'Où siège le Parlement européen ?', answer: 'À Strasbourg', choices: ['À Paris', 'À Strasbourg', 'À Genève', 'À Rome'] },
  { category: 'Institutions', question: 'Quel État a quitté l’Union européenne en 2020 ?', answer: 'Le Royaume-Uni', choices: ['La Norvège', 'La Suisse', 'Le Royaume-Uni', 'L’Islande'] },
  { category: 'Vie quotidienne', question: 'Quel mariage est reconnu par l’État ?', answer: 'Le mariage civil célébré à la mairie', choices: ['Le mariage civil célébré à la mairie', 'Uniquement le mariage religieux', 'Une cérémonie familiale sans acte', 'Un mariage célébré par un employeur'] },
  { category: 'Vie quotidienne', question: 'À quel âge commence l’instruction obligatoire ?', answer: '3 ans', choices: ['3 ans', '5 ans', '6 ans', '16 ans'] },
  { category: 'Vie quotidienne', question: 'Quel numéro permet d’appeler la police ?', answer: '17', choices: ['15', '17', '18', '116 117'] },
  { category: 'Vie quotidienne', question: 'Où faut-il déclarer la naissance d’un enfant ?', answer: 'À la mairie du lieu de naissance', choices: ['À la préfecture uniquement', 'À la mairie du lieu de naissance', 'À l’école', 'À la caisse d’allocations familiales'] },
  { category: 'Vie quotidienne', question: 'Quelle aide permet d’avoir un avocat quand on a peu de ressources ?', answer: 'L’aide juridictionnelle', choices: ['L’aide juridictionnelle', 'La prime d’activité', 'La carte vitale', 'Le congé parental'] },
  { category: 'Vie quotidienne', question: 'Que protège le secret médical ?', answer: 'La confidentialité des informations de santé', choices: ['La confidentialité des informations de santé', 'La gratuité de tous les soins', 'Le droit de choisir son médecin à l’étranger', 'L’absence de dossier médical'] },
];

const categories = [...new Set(questions.map((item) => item.category))];
const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);
const buildQuiz = () => {
  const essentials = categories.map((category) => shuffle(questions.filter((item) => item.category === category))[0]);
  const remaining = shuffle(questions.filter((item) => !essentials.includes(item)));
  return [...essentials, ...remaining].slice(0, 28);
};

function App() {
  const [screen, setScreen] = useState('home');
  const [requestedSize] = useState(28);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const startQuiz = () => {
    setQuizQuestions(buildQuiz());
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setScreen('quiz');
  };

  const question = quizQuestions[current];
  const progress = quizQuestions.length ? ((current + (selected !== null ? 1 : 0)) / quizQuestions.length) * 100 : 0;

  const choose = (choice) => {
    if (selected !== null) return;
    setSelected(choice);
    const correct = choice === question.answer;
    if (correct) setScore((value) => value + 1);
    setAnswers((items) => [...items, { question: question.question, choice, correct }]);
  };

  const next = () => {
    if (current === quizQuestions.length - 1) setScreen('results');
    else {
      setCurrent((value) => value + 1);
      setSelected(null);
    }
  };

  useEffect(() => {
    const onKey = (event) => {
      if (screen !== 'quiz' || !question) return;
      if (selected !== null && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        next();
      }
      const number = Number(event.key);
      if (number >= 1 && number <= 4) choose(question.choices[number - 1]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, question, selected, current]);

  if (screen === 'quiz' && question) return <QuizScreen question={question} current={current} total={quizQuestions.length} progress={progress} selected={selected} choose={choose} next={next} />;
  if (screen === 'results') return <Results score={score} total={quizQuestions.length} answers={answers} restart={() => startQuiz(requestedSize)} home={() => setScreen('home')} />;
  return <Home startQuiz={startQuiz} />;
}

function Shell({ children }) {
  return <main className="app-shell"><header className="topbar"><div className="brand"><span className="brand-mark">RF</span><span>Révise citoyen</span></div><span className="source-label">Carte de résident · 2025</span></header>{children}<footer>Un outil de révision local · Les réponses proviennent du support officiel fourni</footer></main>;
}

function Home({ requestedSize, setRequestedSize, startQuiz }) {
  return <Shell><section className="hero home-card"><div className="eyebrow"><Sparkles size={16} /> Préparez-vous sereinement</div><h1>L’examen civique,<br /><em>à votre rythme.</em></h1><p className="lead">Testez vos connaissances sur les valeurs, les institutions, l’histoire, l’Europe et la vie en société françaises.</p><div className="home-stats"><div><strong>28</strong><span>questions par session</span></div><div><strong>5</strong><span>thématiques couvertes</span></div><div><strong>4</strong><span>choix par question</span></div></div><div className="setup"><div><label>Format de la session</label><p>Les 5 rubriques sont toujours représentées.</p></div><div className="size-options"><div className="size-option active">28<small>questions</small></div></div></div><button className="primary-button" onClick={() => startQuiz()}><span>Commencer le quiz</span><ArrowRight size={19} /></button><p className="keyboard-hint"><CircleHelp size={15} /> Répondez aussi avec les touches 1 à 4</p></section></Shell>;
}

function QuizScreen({ question, current, total, progress, selected, choose, next }) {
  const isCorrect = selected === question.answer;
  return <Shell><section className="quiz-wrap"><div className="quiz-meta"><button className="back-button" onClick={() => window.location.reload()}><ChevronLeft size={18} /> Quitter</button><span className="question-count">Question <strong>{String(current + 1).padStart(2, '0')}</strong> / {total}</span></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="category-pill">{question.category}</div><article className="question-card"><div className="question-icon"><Flag size={21} /></div><h2>{question.question}</h2><p className="instruction">Sélectionnez la bonne réponse</p><div className="answers">{question.choices.map((choice, index) => { const state = selected === null ? '' : choice === question.answer ? 'correct' : choice === selected ? 'wrong' : 'muted'; return <button key={choice} className={`answer ${state}`} onClick={() => choose(choice)} aria-pressed={selected === choice}><span className="answer-key">{index + 1}</span><span>{choice}</span>{selected !== null && choice === question.answer && <Check className="answer-icon" size={19} />}{selected === choice && choice !== question.answer && <X className="answer-icon" size={19} />}</button>; })}</div>{selected !== null && <div className={`feedback ${isCorrect ? 'feedback-good' : 'feedback-bad'}`}><div className="feedback-icon">{isCorrect ? <Check size={18} /> : <X size={18} />}</div><div><strong>{isCorrect ? 'Bonne réponse !' : 'Pas tout à fait.'}</strong><span>{isCorrect ? 'Continuez comme ça.' : `La bonne réponse est : ${question.answer}`}</span></div></div>}<div className="question-footer"><span><Clock3 size={15} /> Pas de limite de temps</span>{selected !== null && <button className="primary-button compact" onClick={next}>{current === total - 1 ? 'Voir mon score' : 'Question suivante'} <ArrowRight size={17} /></button>}</div></article></section></Shell>;
}

function Results({ score, total, answers, restart, home }) {
  const percentage = Math.round((score / total) * 100);
  const message = percentage >= 80 ? 'Excellent travail !' : percentage >= 60 ? 'Bonne base, continuez vos révisions.' : 'Chaque erreur est une occasion d’apprendre.';
  return <Shell><section className="results-card"><div className="result-icon"><Award size={32} /></div><div className="eyebrow">Quiz terminé</div><h1>{message}</h1><p className="lead">Voici votre résultat sur cette session.</p><div className="score-ring" style={{ '--score': `${percentage * 3.6}deg` }}><div><strong>{score}<small>/{total}</small></strong><span>bonnes réponses</span></div></div><div className="result-summary"><span>Votre score</span><strong>{percentage}%</strong></div><div className="result-actions"><button className="primary-button" onClick={restart}><RotateCcw size={18} /> Recommencer</button><button className="secondary-button" onClick={home}>Retour à l’accueil</button></div><details className="review"><summary>Revoir mes réponses</summary><div>{answers.map((item, index) => <div className="review-item" key={`${item.question}-${index}`}><span className={item.correct ? 'review-check' : 'review-cross'}>{item.correct ? <Check size={13} /> : <X size={13} />}</span><p>{item.question}<small>{item.correct ? item.choice : `Votre réponse : ${item.choice}`}</small></p></div>)}</div></details></section></Shell>;
}

if (typeof document !== 'undefined') {
  createRoot(document.getElementById('root')).render(<App />);
}
