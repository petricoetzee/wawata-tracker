'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Question, CASH_PER_CORRECT, CASH_BUILDER_SECONDS } from './types';

interface CashBuilderProps {
  contestantName: string;
  contestantNumber: number;
  questions: Question[];
  onComplete: (amount: number, usedIds: number[]) => void;
}

export default function CashBuilder({ contestantName, contestantNumber, questions, onComplete }: CashBuilderProps) {
  const [timeLeft, setTimeLeft] = useState(CASH_BUILDER_SECONDS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const usedIdsRef = useRef<number[]>([]);
  const finishedRef = useRef(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    if (!isRunning || finishedRef.current) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishedRef.current = true;
          clearInterval(timer);
          // Use setTimeout to avoid setting state synchronously in setInterval callback chain
          setTimeout(() => setIsFinished(true), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  // Handle running out of questions
  useEffect(() => {
    if (isRunning && !finishedRef.current && !currentQuestion) {
      finishedRef.current = true;
      // Defer state update to avoid synchronous setState in effect
      setTimeout(() => setIsFinished(true), 0);
    }
  }, [isRunning, currentQuestion]);

  const handleAnswer = useCallback((index: number) => {
    if (showResult || !isRunning || isFinished) return;
    setSelectedAnswer(index);
    setShowResult(true);
    usedIdsRef.current.push(currentQuestion.id);

    if (index === currentQuestion.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentQuestionIndex(prev => prev + 1);
    }, 800);
  }, [showResult, isRunning, isFinished, currentQuestion]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const amount = correctCount * CASH_PER_CORRECT;

  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  // Timer colour
  const timerColor = timeLeft <= 10 ? 'text-red-500' : timeLeft <= 20 ? 'text-amber-500' : 'text-white';

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h2 className="font-serif text-3xl font-bold text-amber-400">Time&apos;s Up!</h2>
        <div className="bg-[#1a1a2e] border-2 border-amber-500 rounded-xl p-8 text-center">
          <p className="text-gray-300 text-lg mb-2">{contestantName} answered</p>
          <p className="text-5xl font-bold text-amber-400 mb-2">{correctCount}</p>
          <p className="text-gray-300 text-lg mb-4">questions correctly</p>
          <p className="text-gray-400 text-sm mb-6">Building a cash total of</p>
          <p className="text-4xl font-bold text-green-400">${amount.toLocaleString()}</p>
        </div>
        <button
          onClick={() => onComplete(amount, usedIdsRef.current)}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-lg transition-colors"
        >
          Face The Chaser
        </button>
      </div>
    );
  }

  if (!isRunning) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h2 className="font-serif text-3xl font-bold text-amber-400">Cash Builder</h2>
        <div className="bg-[#1a1a2e] border-2 border-amber-500/50 rounded-xl p-8 text-center max-w-md">
          <p className="text-6xl mb-4">💰</p>
          <p className="text-gray-300 text-lg mb-2">Player {contestantNumber}</p>
          <p className="text-2xl font-bold text-white mb-4">{contestantName}</p>
          <p className="text-gray-400 mb-2">
            Answer as many questions correctly as you can in <span className="text-amber-400 font-bold">60 seconds</span>.
          </p>
          <p className="text-gray-400">
            Each correct answer is worth <span className="text-green-400 font-bold">${CASH_PER_CORRECT.toLocaleString()}</span>.
          </p>
        </div>
        <button
          onClick={handleStart}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-lg transition-colors"
        >
          Start Cash Builder
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
      {/* Timer and Score Bar */}
      <div className="flex items-center justify-between w-full px-4">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Player {contestantNumber}</p>
          <p className="text-sm text-white font-bold">{contestantName}</p>
        </div>
        <div className={`text-5xl font-bold font-mono ${timerColor} transition-colors`}>
          {timeDisplay}
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Cash</p>
          <p className="text-lg text-green-400 font-bold">${amount.toLocaleString()}</p>
        </div>
      </div>

      {/* Progress bar for timer */}
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / CASH_BUILDER_SECONDS) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-6 w-full mt-2">
        <p className="text-white text-xl text-center leading-relaxed">{currentQuestion.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {currentQuestion.options.map((option, idx) => {
          let bgColor = 'bg-[#2a2a4e] hover:bg-[#3a3a5e] border-gray-600';
          if (showResult) {
            if (idx === currentQuestion.correctIndex) {
              bgColor = 'bg-green-700 border-green-400';
            } else if (idx === selectedAnswer && idx !== currentQuestion.correctIndex) {
              bgColor = 'bg-red-700 border-red-400';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={showResult}
              className={`${bgColor} border rounded-lg p-4 text-white text-lg font-medium transition-all text-center`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
