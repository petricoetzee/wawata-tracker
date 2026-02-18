'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  GamePhase,
  Contestant,
  Difficulty,
  CONTESTANT_NAMES,
  CHASER_NAME,
} from './types';
import { getShuffledQuestions, getHeadToHeadQuestions } from './questions';
import CashBuilder from './CashBuilder';
import HeadToHead from './HeadToHead';
import FinalChase from './FinalChase';

function createInitialContestants(): Contestant[] {
  return CONTESTANT_NAMES.map(name => ({
    name,
    cashBuilderAmount: 0,
    offerTaken: 'normal' as const,
    offerAmount: 0,
    survived: false,
    played: false,
  }));
}

export default function TheChaseGame() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [currentContestant, setCurrentContestant] = useState(0);
  const [contestants, setContestants] = useState<Contestant[]>(createInitialContestants);
  const [teamBank, setTeamBank] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());
  const [gameWon, setGameWon] = useState(false);

  // Get questions for current round
  const cashBuilderQuestions = useMemo(
    () => getShuffledQuestions(usedQuestionIds),
    [usedQuestionIds]
  );

  const headToHeadQuestions = useMemo(
    () => getHeadToHeadQuestions(usedQuestionIds),
    [usedQuestionIds]
  );

  const finalChaseQuestions = useMemo(
    () => getShuffledQuestions(usedQuestionIds),
    [usedQuestionIds]
  );

  const markQuestionsUsed = useCallback((ids: number[]) => {
    setUsedQuestionIds(prev => {
      const next = new Set(prev);
      ids.forEach(id => next.add(id));
      return next;
    });
  }, []);

  // Start new game
  const startGame = (diff: Difficulty) => {
    setDifficulty(diff);
    setContestants(createInitialContestants());
    setCurrentContestant(0);
    setTeamBank(0);
    setUsedQuestionIds(new Set());
    setGameWon(false);
    setPhase('cash-builder-intro');
  };

  // Cash builder complete
  const handleCashBuilderComplete = useCallback((amount: number, usedIds: number[]) => {
    markQuestionsUsed(usedIds);
    setContestants(prev => {
      const next = [...prev];
      next[currentContestant] = { ...next[currentContestant], cashBuilderAmount: amount };
      return next;
    });
    setPhase('offer');
  }, [currentContestant, markQuestionsUsed]);

  // Head-to-head complete
  const handleHeadToHeadComplete = useCallback((
    survived: boolean,
    amount: number,
    offerTaken: 'low' | 'normal' | 'high',
    usedIds: number[]
  ) => {
    markQuestionsUsed(usedIds);
    setContestants(prev => {
      const next = [...prev];
      next[currentContestant] = {
        ...next[currentContestant],
        survived,
        offerTaken,
        offerAmount: amount,
        played: true,
      };
      return next;
    });
    if (survived) {
      setTeamBank(prev => prev + amount);
    }

    // Move to next contestant or final chase
    if (currentContestant < 3) {
      setCurrentContestant(prev => prev + 1);
      setPhase('cash-builder-intro');
    } else {
      setPhase('final-chase-intro');
    }
  }, [currentContestant, markQuestionsUsed]);

  // Final chase complete
  const handleFinalChaseComplete = useCallback((won: boolean) => {
    setGameWon(won);
    setPhase('game-over');
  }, []);

  const contestant = contestants[currentContestant];
  const survivingContestants = contestants.filter(c => c.survived);

  // INTRO SCREEN
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3e] to-[#0a0a1a] text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full text-center space-y-8">
          <div>
            <h1 className="font-serif text-5xl font-bold text-amber-400 mb-2">The Chase</h1>
            <p className="text-gray-400 text-lg">Can you beat {CHASER_NAME}?</p>
          </div>

          <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-6 text-left space-y-3">
            <h3 className="text-amber-400 font-bold text-lg">How to Play</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p><span className="text-amber-400 font-bold">1. Cash Builder:</span> Each of your 4 players answers quick-fire questions for 60 seconds to build a cash total.</p>
              <p><span className="text-amber-400 font-bold">2. The Chase:</span> Face {CHASER_NAME} on the board. Choose an offer, then answer questions to race home before the Chaser catches you.</p>
              <p><span className="text-amber-400 font-bold">3. Final Chase:</span> Your surviving players answer questions for 2 minutes. Then {CHASER_NAME} tries to catch up. Every wrong Chaser answer gives you a pushback!</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-gray-400 text-sm uppercase tracking-wider">Select Difficulty</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => startGame('easy')}
                className="bg-green-900/40 hover:bg-green-800/60 border-2 border-green-600 rounded-xl p-4 transition-all"
              >
                <p className="text-green-400 font-bold text-lg">Easy</p>
                <p className="text-green-300/60 text-xs">Chaser answers correctly ~55% of the time</p>
              </button>
              <button
                onClick={() => startGame('medium')}
                className="bg-amber-900/40 hover:bg-amber-800/60 border-2 border-amber-500 rounded-xl p-4 transition-all"
              >
                <p className="text-amber-400 font-bold text-lg">Medium</p>
                <p className="text-amber-300/60 text-xs">Chaser answers correctly ~72% of the time</p>
              </button>
              <button
                onClick={() => startGame('hard')}
                className="bg-red-900/40 hover:bg-red-800/60 border-2 border-red-500 rounded-xl p-4 transition-all"
              >
                <p className="text-red-400 font-bold text-lg">Hard</p>
                <p className="text-red-300/60 text-xs">Chaser answers correctly ~88% of the time</p>
              </button>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            &larr; Back to Wawata Tracker
          </Link>
        </div>
      </div>
    );
  }

  // GAME OVER SCREEN
  if (phase === 'game-over') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3e] to-[#0a0a1a] text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <h1 className={`font-serif text-5xl font-bold ${gameWon ? 'text-green-400' : 'text-red-400'}`}>
            {gameWon ? 'Victory!' : 'Defeated!'}
          </h1>

          {gameWon ? (
            <div className="text-6xl">🏆</div>
          ) : (
            <div className="text-6xl">😈</div>
          )}

          <div className="bg-[#1a1a2e] border border-gray-600 rounded-xl p-6 space-y-4">
            <h3 className="text-amber-400 font-bold text-lg">Game Summary</h3>

            {/* Contestant results */}
            <div className="space-y-2">
              {contestants.map((c, i) => (
                <div key={i} className="flex items-center justify-between bg-[#2a2a4e] rounded-lg p-3">
                  <div className="text-left">
                    <p className="text-white font-medium">{c.name}</p>
                    <p className="text-gray-400 text-xs">
                      Cash Builder: ${c.cashBuilderAmount.toLocaleString()}
                      {c.played && ` | Took ${c.offerTaken} offer`}
                    </p>
                  </div>
                  <div>
                    {c.survived ? (
                      <span className="bg-green-900/60 text-green-400 px-2 py-1 rounded text-xs font-bold">
                        SAFE (${c.offerAmount.toLocaleString()})
                      </span>
                    ) : (
                      <span className="bg-red-900/60 text-red-400 px-2 py-1 rounded text-xs font-bold">
                        CAUGHT
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-400">Team Bank</p>
              <p className="text-3xl font-bold text-green-400">${teamBank.toLocaleString()}</p>
              <p className="text-gray-500 text-sm mt-1">
                {survivingContestants.length} contestant{survivingContestants.length !== 1 ? 's' : ''} survived
              </p>
            </div>

            {gameWon && (
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <p className="text-green-400 font-bold text-lg">
                  You beat {CHASER_NAME} and won ${teamBank.toLocaleString()}!
                </p>
              </div>
            )}

            <p className="text-gray-500 text-xs">
              Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setPhase('intro')}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-lg transition-colors"
            >
              Play Again
            </button>
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              &larr; Back to Wawata Tracker
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // CASH BUILDER INTRO
  if (phase === 'cash-builder-intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3e] to-[#0a0a1a] text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full text-center space-y-6">
          {/* Progress indicator */}
          <div className="flex justify-center gap-2">
            {contestants.map((c, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < currentContestant ? (c.survived ? 'bg-green-500' : 'bg-red-500')
                    : i === currentContestant ? 'bg-amber-500 animate-pulse'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <h2 className="font-serif text-3xl font-bold text-amber-400">
            Player {currentContestant + 1} of 4
          </h2>
          <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-8 text-center">
            <p className="text-6xl mb-4">🏃</p>
            <p className="text-3xl font-bold text-white mb-2">{contestant.name}</p>
            <p className="text-gray-400">is stepping up for the Cash Builder</p>
          </div>

          {/* Team bank so far */}
          {currentContestant > 0 && (
            <div className="text-sm text-gray-400">
              Team bank so far: <span className="text-green-400 font-bold">${teamBank.toLocaleString()}</span>
            </div>
          )}

          <button
            onClick={() => setPhase('cash-builder')}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-lg transition-colors"
          >
            Begin Cash Builder
          </button>
        </div>
      </div>
    );
  }

  // FINAL CHASE INTRO
  if (phase === 'final-chase-intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3e] to-[#0a0a1a] text-white flex flex-col items-center justify-center p-4">
        <FinalChase
          contestants={contestants}
          teamBank={teamBank}
          difficulty={difficulty}
          questions={finalChaseQuestions}
          onComplete={handleFinalChaseComplete}
        />
      </div>
    );
  }

  // WRAPPING LAYOUT for game phases
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3e] to-[#0a0a1a] text-white flex flex-col p-4">
      {/* Top bar */}
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full mb-4">
        <div className="flex items-center gap-4">
          <h1 className="font-serif text-xl font-bold text-amber-400">The Chase</h1>
          <div className="flex gap-1">
            {contestants.map((c, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i < currentContestant ? (c.survived ? 'bg-green-500' : 'bg-red-500')
                    : i === currentContestant ? 'bg-amber-500'
                    : 'bg-gray-600'
                }`}
                title={c.name}
              />
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-400">
          Bank: <span className="text-green-400 font-bold">${teamBank.toLocaleString()}</span>
        </div>
      </div>

      {/* Game content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {phase === 'cash-builder' && (
          <CashBuilder
            contestantName={contestant.name}
            contestantNumber={currentContestant + 1}
            questions={cashBuilderQuestions}
            onComplete={handleCashBuilderComplete}
          />
        )}

        {(phase === 'offer' || phase === 'head-to-head' || phase === 'head-to-head-result') && (
          <HeadToHead
            contestantName={contestant.name}
            contestantNumber={currentContestant + 1}
            cashBuilderAmount={contestant.cashBuilderAmount}
            difficulty={difficulty}
            questions={headToHeadQuestions}
            onComplete={handleHeadToHeadComplete}
          />
        )}
      </div>
    </div>
  );
}
