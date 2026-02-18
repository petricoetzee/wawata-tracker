'use client';

import { useState, useCallback, useRef } from 'react';
import { Question, Difficulty, BOARD_SIZE, CHASER_NAME, getChaserAccuracy } from './types';

type H2HPhase = 'offer' | 'playing' | 'result';

interface HeadToHeadProps {
  contestantName: string;
  contestantNumber: number;
  cashBuilderAmount: number;
  difficulty: Difficulty;
  questions: Question[];
  onComplete: (survived: boolean, amount: number, offerTaken: 'low' | 'normal' | 'high', usedIds: number[]) => void;
}

export default function HeadToHead({
  contestantName,
  contestantNumber,
  cashBuilderAmount,
  difficulty,
  questions,
  onComplete,
}: HeadToHeadProps) {
  const [phase, setPhase] = useState<H2HPhase>('offer');
  const [contestantPos, setContestantPos] = useState(4); // 0-indexed, 0=top, 6=home
  const [chaserPos, setChaserPos] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [chaserAnswer, setChaserAnswer] = useState<number | null>(null);
  const [revealPhase, setRevealPhase] = useState<'waiting' | 'player-locked' | 'reveal-correct' | 'chaser-answer' | 'resolve'>('waiting');
  const [offerTaken, setOfferTaken] = useState<'low' | 'normal' | 'high'>('normal');
  const [offerAmount, setOfferAmount] = useState(cashBuilderAmount);
  const [result, setResult] = useState<'caught' | 'safe' | null>(null);
  const usedIdsRef = useRef<number[]>([]);

  const lowOffer = Math.max(1000, Math.floor(cashBuilderAmount * 0.3));
  const highOffer = Math.floor(cashBuilderAmount * (difficulty === 'easy' ? 2.5 : difficulty === 'medium' ? 3 : 4));

  const currentQuestion = questions[currentQuestionIndex];
  const chaserAccuracy = getChaserAccuracy(difficulty);

  const simulateChaserAnswer = useCallback((question: Question): number => {
    const isCorrect = Math.random() < chaserAccuracy;
    if (isCorrect) return question.correctIndex;
    // Pick a random wrong answer
    const wrongOptions = [0, 1, 2].filter(i => i !== question.correctIndex);
    return wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
  }, [chaserAccuracy]);

  const takeOffer = (type: 'low' | 'normal' | 'high') => {
    setOfferTaken(type);
    let amount: number;
    let startPos: number;
    switch (type) {
      case 'low':
        amount = lowOffer;
        startPos = 5; // Closer to home
        break;
      case 'high':
        amount = highOffer;
        startPos = 3; // Closer to chaser
        break;
      default:
        amount = cashBuilderAmount;
        startPos = 4;
    }
    setOfferAmount(amount);
    setContestantPos(startPos);
    setPhase('playing');
  };

  const handleAnswer = useCallback((index: number) => {
    if (revealPhase !== 'waiting') return;
    setSelectedAnswer(index);
    setRevealPhase('player-locked');

    // Generate chaser answer
    const chaserAns = simulateChaserAnswer(currentQuestion);
    setChaserAnswer(chaserAns);

    // Reveal sequence with delays
    setTimeout(() => {
      setRevealPhase('reveal-correct');
      setTimeout(() => {
        setRevealPhase('chaser-answer');
        setTimeout(() => {
          setRevealPhase('resolve');
          usedIdsRef.current.push(currentQuestion.id);

          // Calculate new positions
          const playerCorrect = index === currentQuestion.correctIndex;
          const chaserCorrect = chaserAns === currentQuestion.correctIndex;

          const newContestantPos = playerCorrect ? contestantPos + 1 : contestantPos;
          const newChaserPos = chaserCorrect ? chaserPos + 1 : chaserPos;

          setContestantPos(newContestantPos);
          setChaserPos(newChaserPos);

          // Check end conditions after animation
          setTimeout(() => {
            if (newChaserPos >= newContestantPos) {
              setResult('caught');
              setPhase('result');
            } else if (newContestantPos >= BOARD_SIZE) {
              setResult('safe');
              setPhase('result');
            } else {
              // Next question
              setCurrentQuestionIndex(prev => prev + 1);
              setSelectedAnswer(null);
              setChaserAnswer(null);
              setRevealPhase('waiting');
            }
          }, 600);
        }, 800);
      }, 800);
    }, 600);
  }, [revealPhase, currentQuestion, contestantPos, chaserPos, simulateChaserAnswer]);

  // OFFER SCREEN
  if (phase === 'offer') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h2 className="font-serif text-3xl font-bold text-amber-400">The Chaser&apos;s Offers</h2>
        <p className="text-gray-300 text-lg">{contestantName}, you earned <span className="text-green-400 font-bold">${cashBuilderAmount.toLocaleString()}</span></p>
        <p className="text-gray-400 mb-2">{CHASER_NAME} makes you three offers:</p>

        <div className="flex flex-col gap-4 w-full max-w-md">
          {/* High offer */}
          <button
            onClick={() => takeOffer('high')}
            className="bg-red-900/60 hover:bg-red-800/80 border-2 border-red-500 rounded-xl p-5 text-center transition-all"
          >
            <p className="text-red-300 text-sm uppercase tracking-wider mb-1">High Offer (start closer to Chaser)</p>
            <p className="text-3xl font-bold text-red-400">${highOffer.toLocaleString()}</p>
            <p className="text-red-300/60 text-xs mt-1">3 steps from home</p>
          </button>

          {/* Normal offer */}
          <button
            onClick={() => takeOffer('normal')}
            className="bg-amber-900/40 hover:bg-amber-800/60 border-2 border-amber-500 rounded-xl p-5 text-center transition-all"
          >
            <p className="text-amber-300 text-sm uppercase tracking-wider mb-1">Your Cash Builder Total</p>
            <p className="text-3xl font-bold text-amber-400">${cashBuilderAmount.toLocaleString()}</p>
            <p className="text-amber-300/60 text-xs mt-1">4 steps from home</p>
          </button>

          {/* Low offer */}
          <button
            onClick={() => takeOffer('low')}
            className="bg-blue-900/40 hover:bg-blue-800/60 border-2 border-blue-500 rounded-xl p-5 text-center transition-all"
          >
            <p className="text-blue-300 text-sm uppercase tracking-wider mb-1">Low Offer (start closer to home)</p>
            <p className="text-3xl font-bold text-blue-400">${lowOffer.toLocaleString()}</p>
            <p className="text-blue-300/60 text-xs mt-1">5 steps from home</p>
          </button>
        </div>
      </div>
    );
  }

  // RESULT SCREEN
  if (phase === 'result') {
    const caught = result === 'caught';
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h2 className={`font-serif text-4xl font-bold ${caught ? 'text-red-400' : 'text-green-400'}`}>
          {caught ? 'Caught!' : 'Safe!'}
        </h2>
        <div className="bg-[#1a1a2e] border-2 border-gray-600 rounded-xl p-8 text-center">
          {caught ? (
            <>
              <p className="text-6xl mb-4">😈</p>
              <p className="text-gray-300 text-lg mb-2">{CHASER_NAME} caught {contestantName}!</p>
              <p className="text-gray-400">No money added to the team bank.</p>
            </>
          ) : (
            <>
              <p className="text-6xl mb-4">🏠</p>
              <p className="text-gray-300 text-lg mb-2">{contestantName} made it home!</p>
              <p className="text-green-400 text-2xl font-bold">${offerAmount.toLocaleString()}</p>
              <p className="text-gray-400">added to the team bank.</p>
            </>
          )}
        </div>
        <button
          onClick={() => onComplete(!caught, caught ? 0 : offerAmount, offerTaken, usedIdsRef.current)}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-lg transition-colors"
        >
          Continue
        </button>
      </div>
    );
  }

  // PLAYING - Board + Question
  if (!currentQuestion) {
    // Ran out of questions - contestant gets home
    if (result === null) {
      setResult('safe');
      setPhase('result');
    }
    return null;
  }

  const optionLabels = ['A', 'B', 'C'];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-4xl mx-auto items-start">
      {/* Board */}
      <div className="flex flex-col gap-1 w-full lg:w-48 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider">The Chase Board</span>
          <span className="text-xs text-amber-400">${offerAmount.toLocaleString()}</span>
        </div>
        {Array.from({ length: BOARD_SIZE }).map((_, step) => {
          const isChaserHere = chaserPos === step;
          const isContestantHere = contestantPos === step;
          const isHome = step === BOARD_SIZE - 1;

          let bgColor = 'bg-[#2a2a4e]';
          let borderColor = 'border-gray-700';
          if (isChaserHere && isContestantHere) {
            bgColor = 'bg-red-800';
            borderColor = 'border-red-500';
          } else if (isChaserHere) {
            bgColor = 'bg-red-900/70';
            borderColor = 'border-red-500';
          } else if (isContestantHere) {
            bgColor = 'bg-blue-900/70';
            borderColor = 'border-blue-500';
          } else if (isHome) {
            bgColor = 'bg-green-900/40';
            borderColor = 'border-green-700';
          }

          return (
            <div
              key={step}
              className={`${bgColor} ${borderColor} border rounded-lg p-2 flex items-center justify-between transition-all duration-500`}
            >
              <span className="text-xs text-gray-500">
                {step === 0 ? 'START' : isHome ? 'HOME' : `${step}`}
              </span>
              <div className="flex gap-1">
                {isChaserHere && <span className="text-sm">😈</span>}
                {isContestantHere && <span className="text-sm">🏃</span>}
              </div>
            </div>
          );
        })}
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500">
            <span className="text-red-400">😈</span> = Chaser &nbsp;
            <span className="text-blue-400">🏃</span> = You
          </p>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Player {contestantNumber}: {contestantName}</p>
          <p className="text-sm text-amber-400">Playing for ${offerAmount.toLocaleString()}</p>
        </div>

        {/* Question */}
        <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-6">
          <p className="text-white text-xl text-center leading-relaxed">{currentQuestion.question}</p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => {
            let bgColor = 'bg-[#2a2a4e] hover:bg-[#3a3a5e] border-gray-600';
            let labelBg = 'bg-gray-700';

            if (revealPhase === 'player-locked' && idx === selectedAnswer) {
              bgColor = 'bg-amber-900/60 border-amber-500';
              labelBg = 'bg-amber-600';
            }

            if (revealPhase === 'reveal-correct' || revealPhase === 'chaser-answer' || revealPhase === 'resolve') {
              if (idx === currentQuestion.correctIndex) {
                bgColor = 'bg-green-800/60 border-green-500';
                labelBg = 'bg-green-600';
              } else if (idx === selectedAnswer) {
                bgColor = 'bg-red-800/60 border-red-500';
                labelBg = 'bg-red-600';
              }
            }

            if ((revealPhase === 'chaser-answer' || revealPhase === 'resolve') && idx === chaserAnswer && idx !== currentQuestion.correctIndex) {
              bgColor = 'bg-orange-800/60 border-orange-500';
              labelBg = 'bg-orange-600';
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={revealPhase !== 'waiting'}
                className={`${bgColor} border rounded-lg p-4 text-white text-lg font-medium transition-all flex items-center gap-3`}
              >
                <span className={`${labelBg} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0`}>
                  {optionLabels[idx]}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Status */}
        <div className="text-center text-sm text-gray-500">
          {revealPhase === 'waiting' && 'Choose your answer...'}
          {revealPhase === 'player-locked' && `You chose ${optionLabels[selectedAnswer!]}...`}
          {revealPhase === 'reveal-correct' && (
            selectedAnswer === currentQuestion.correctIndex
              ? '✓ Correct! You step down.'
              : `✗ Wrong! The answer was ${optionLabels[currentQuestion.correctIndex]}.`
          )}
          {revealPhase === 'chaser-answer' && `${CHASER_NAME} chose ${optionLabels[chaserAnswer!]}...`}
          {revealPhase === 'resolve' && (
            chaserAnswer === currentQuestion.correctIndex
              ? `${CHASER_NAME} got it right and steps down!`
              : `${CHASER_NAME} got it wrong!`
          )}
        </div>
      </div>
    </div>
  );
}
