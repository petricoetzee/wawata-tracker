'use client';

import { useState, useEffect, useCallback } from 'react';
import { Question, Difficulty, FINAL_CHASE_SECONDS, CHASER_NAME, getChaserAccuracy } from './types';
import { Contestant } from './types';

type FinalPhase = 'team-intro' | 'team-round' | 'team-result' | 'chaser-intro' | 'chaser-round' | 'result';

interface FinalChaseProps {
  contestants: Contestant[];
  teamBank: number;
  difficulty: Difficulty;
  questions: Question[];
  onComplete: (won: boolean) => void;
}

export default function FinalChase({ contestants, teamBank, difficulty, questions, onComplete }: FinalChaseProps) {
  const [phase, setPhase] = useState<FinalPhase>('team-intro');
  const [teamSteps, setTeamSteps] = useState(0);
  const [teamTarget, setTeamTarget] = useState(0); // Frozen target after team round
  const [chaserSteps, setChaserSteps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(FINAL_CHASE_SECONDS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const survivingContestants = contestants.filter(c => c.survived);
  const chaserAccuracy = getChaserAccuracy(difficulty);

  // Timer
  useEffect(() => {
    if (!isTimerRunning) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            setIsTimerRunning(false);
            setPhase(current => {
              if (current === 'team-round') {
                setTeamSteps(steps => {
                  setTeamTarget(steps);
                  return steps;
                });
                return 'team-result';
              }
              return 'result';
            });
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle running out of questions
  useEffect(() => {
    if (!isTimerRunning || currentQuestion) return;
    // Defer state updates to avoid synchronous setState in effect
    setTimeout(() => {
      setIsTimerRunning(false);
      if (phase === 'team-round') {
        setTeamTarget(teamSteps);
        setPhase('team-result');
      } else if (phase === 'chaser-round') {
        setPhase('result');
      }
    }, 0);
  }, [isTimerRunning, currentQuestion, phase, teamSteps]);

  // Team round answer handler
  const handleTeamAnswer = useCallback((index: number) => {
    if (showResult || !isTimerRunning || !currentQuestion) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === currentQuestion.correctIndex) {
      setTeamSteps(prev => prev + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentQuestionIndex(prev => prev + 1);
    }, 700);
  }, [showResult, isTimerRunning, currentQuestion]);

  // Chaser round answer handler
  const handleChaserQuestion = useCallback(() => {
    if (showResult || !isTimerRunning || !currentQuestion) return;
    setShowResult(true);

    const isCorrect = Math.random() < chaserAccuracy;

    if (isCorrect) {
      setSelectedAnswer(currentQuestion.correctIndex);
      setChaserSteps(prev => {
        const next = prev + 1;
        setTeamTarget(target => {
          if (next >= target) {
            setTimeout(() => {
              setIsTimerRunning(false);
              setPhase('result');
            }, 500);
          }
          return target;
        });
        return next;
      });
    } else {
      // Chaser got it wrong - pushback!
      const wrongOptions = [0, 1, 2, 3].filter(i => i !== currentQuestion.correctIndex);
      setSelectedAnswer(wrongOptions[Math.floor(Math.random() * wrongOptions.length)]);
      // Team gets one step back (added to their target)
      setTeamSteps(prev => prev + 1);
      setTeamTarget(prev => prev + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentQuestionIndex(prev => prev + 1);
    }, 1200);
  }, [showResult, isTimerRunning, currentQuestion, chaserAccuracy]);

  const startTeamRound = () => {
    setPhase('team-round');
    setIsTimerRunning(true);
    setTimeLeft(FINAL_CHASE_SECONDS);
  };

  const startChaserRound = () => {
    setPhase('chaser-intro');
  };

  const beginChaserRound = () => {
    setPhase('chaser-round');
    setTimeLeft(FINAL_CHASE_SECONDS);
    setIsTimerRunning(true);
  };

  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const timerColor = timeLeft <= 10 ? 'text-red-500' : timeLeft <= 20 ? 'text-amber-500' : 'text-white';

  // TEAM INTRO
  if (phase === 'team-intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h2 className="font-serif text-3xl font-bold text-amber-400">The Final Chase</h2>
        <div className="bg-[#1a1a2e] border-2 border-amber-500/50 rounded-xl p-8 text-center max-w-lg">
          <p className="text-6xl mb-4">⚡</p>
          {survivingContestants.length === 0 ? (
            <>
              <p className="text-red-400 text-xl font-bold mb-2">No contestants survived!</p>
              <p className="text-gray-400">{CHASER_NAME} caught everyone. Game over.</p>
            </>
          ) : (
            <>
              <p className="text-gray-300 text-lg mb-4">
                {survivingContestants.length} contestant{survivingContestants.length > 1 ? 's' : ''} made it through:
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {survivingContestants.map(c => (
                  <span key={c.name} className="bg-blue-900/60 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {c.name}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 mb-2">Playing for a team bank of</p>
              <p className="text-4xl font-bold text-green-400">${teamBank.toLocaleString()}</p>
              <p className="text-gray-500 text-sm mt-4">
                Answer as many questions as you can in 2 minutes. Then {CHASER_NAME} will try to catch you.
              </p>
            </>
          )}
        </div>
        {survivingContestants.length > 0 ? (
          <button
            onClick={startTeamRound}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-lg transition-colors"
          >
            Start Team Round
          </button>
        ) : (
          <button
            onClick={() => onComplete(false)}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
          >
            End Game
          </button>
        )}
      </div>
    );
  }

  // TEAM RESULT
  if (phase === 'team-result') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h2 className="font-serif text-3xl font-bold text-amber-400">Team Round Complete</h2>
        <div className="bg-[#1a1a2e] border-2 border-amber-500/50 rounded-xl p-8 text-center">
          <p className="text-gray-300 text-lg mb-2">Your team scored</p>
          <p className="text-6xl font-bold text-amber-400 mb-2">{teamTarget}</p>
          <p className="text-gray-300 text-lg mb-4">steps</p>
          <p className="text-gray-500 text-sm">
            {CHASER_NAME} needs {teamTarget} correct answers to catch you.
          </p>
          <p className="text-gray-500 text-sm">
            If {CHASER_NAME} gets a question wrong, you get a pushback!
          </p>
        </div>
        <button
          onClick={startChaserRound}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
        >
          Start Chaser&apos;s Round
        </button>
      </div>
    );
  }

  // CHASER INTRO
  if (phase === 'chaser-intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h2 className="font-serif text-3xl font-bold text-red-400">{CHASER_NAME}&apos;s Turn</h2>
        <div className="bg-[#1a1a2e] border-2 border-red-500/50 rounded-xl p-8 text-center max-w-lg">
          <p className="text-6xl mb-4">😈</p>
          <p className="text-gray-300 text-lg mb-4">
            {CHASER_NAME} has 2 minutes to answer {teamTarget} questions correctly.
          </p>
          <p className="text-gray-400 text-sm mb-2">
            Click the button to reveal {CHASER_NAME}&apos;s answer.
          </p>
          <p className="text-gray-400 text-sm">
            If {CHASER_NAME} gets one wrong, your team gets a pushback (+1 step).
          </p>
        </div>
        <button
          onClick={beginChaserRound}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
        >
          Begin!
        </button>
      </div>
    );
  }

  // FINAL RESULT
  if (phase === 'result') {
    const teamWon = chaserSteps < teamTarget;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h2 className={`font-serif text-4xl font-bold ${teamWon ? 'text-green-400' : 'text-red-400'}`}>
          {teamWon ? 'You Win!' : 'The Chaser Wins!'}
        </h2>
        <div className="bg-[#1a1a2e] border-2 border-gray-600 rounded-xl p-8 text-center">
          {teamWon ? (
            <>
              <p className="text-6xl mb-4">🏆</p>
              <p className="text-gray-300 text-lg mb-2">
                {CHASER_NAME} only reached {chaserSteps} steps. You needed {teamTarget}.
              </p>
              <p className="text-gray-300 mb-4">Your team takes home</p>
              <p className="text-4xl font-bold text-green-400">${teamBank.toLocaleString()}</p>
            </>
          ) : (
            <>
              <p className="text-6xl mb-4">😈</p>
              <p className="text-gray-300 text-lg mb-2">
                {CHASER_NAME} caught your team!
              </p>
              <p className="text-gray-400 mb-2">
                Chaser: {chaserSteps} steps | Team target: {teamTarget} steps
              </p>
              <p className="text-gray-500 text-sm">Better luck next time.</p>
            </>
          )}
        </div>
        <button
          onClick={() => onComplete(teamWon)}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-lg transition-colors"
        >
          See Final Results
        </button>
      </div>
    );
  }

  // TEAM ROUND or CHASER ROUND - Question display
  const isTeamRound = phase === 'team-round';

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full px-4">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            {isTeamRound ? 'Team Round' : "Chaser's Round"}
          </p>
          <p className="text-sm text-white font-bold">
            {isTeamRound ? 'Your Turn' : CHASER_NAME}
          </p>
        </div>
        <div className={`text-5xl font-bold font-mono ${timerColor} transition-colors`}>
          {timeDisplay}
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Steps</p>
          <p className="text-lg text-amber-400 font-bold">
            {isTeamRound ? teamSteps : `${chaserSteps} / ${teamTarget}`}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${isTeamRound ? 'bg-amber-500' : 'bg-red-500'}`}
          style={{ width: `${(timeLeft / FINAL_CHASE_SECONDS) * 100}%` }}
        />
      </div>

      {/* Chase progress for chaser round */}
      {!isTeamRound && teamTarget > 0 && (
        <div className="w-full px-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Chaser progress</span>
            <span>{chaserSteps} of {teamTarget}</span>
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${Math.min(100, (chaserSteps / teamTarget) * 100)}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-end pr-2">
              <span className="text-[10px] text-white font-bold">🏠</span>
            </div>
          </div>
        </div>
      )}

      {/* Question */}
      <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-6 w-full mt-2">
        <p className="text-white text-xl text-center leading-relaxed">{currentQuestion.question}</p>
      </div>

      {/* Options / Chaser action */}
      {isTeamRound ? (
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
                onClick={() => handleTeamAnswer(idx)}
                disabled={showResult}
                className={`${bgColor} border rounded-lg p-4 text-white text-lg font-medium transition-all text-center`}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="w-full">
          {!showResult ? (
            <button
              onClick={handleChaserQuestion}
              className="w-full bg-red-900/60 hover:bg-red-800 border-2 border-red-500 rounded-xl p-4 text-white text-lg font-bold transition-all"
            >
              Reveal {CHASER_NAME}&apos;s Answer
            </button>
          ) : (
            <div className="space-y-2">
              {currentQuestion.options.map((option, idx) => {
                let bgColor = 'bg-[#2a2a4e] border-gray-700';
                if (idx === currentQuestion.correctIndex) {
                  bgColor = 'bg-green-800/60 border-green-500';
                } else if (idx === selectedAnswer) {
                  bgColor = 'bg-red-800/60 border-red-500';
                }
                return (
                  <div key={idx} className={`${bgColor} border rounded-lg p-3 text-white text-center`}>
                    {option}
                    {idx === selectedAnswer && idx !== currentQuestion.correctIndex && (
                      <span className="ml-2 text-red-400 text-sm">(Chaser chose this)</span>
                    )}
                    {idx === selectedAnswer && idx === currentQuestion.correctIndex && (
                      <span className="ml-2 text-green-400 text-sm">(Chaser correct!)</span>
                    )}
                    {idx === currentQuestion.correctIndex && idx !== selectedAnswer && (
                      <span className="ml-2 text-green-400 text-sm">(Correct answer - Pushback!)</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Status */}
      {showResult && !isTeamRound && (
        <p className="text-center text-sm text-gray-400">
          {selectedAnswer === currentQuestion.correctIndex
            ? `${CHASER_NAME} got it right!`
            : `Wrong! Your team gets a pushback! (${teamTarget} steps now needed)`
          }
        </p>
      )}
    </div>
  );
}
