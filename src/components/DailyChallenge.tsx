import React from 'react';
import { format } from 'date-fns';
import { Trophy, SkipForward, RefreshCw } from 'lucide-react';
import { Challenge, UserProgress } from '../types';

interface DailyChallengeProps {
  challenge: Challenge;
  onComplete: () => void;
  onSkip: () => void;
  onRefresh: () => void;
  streak: number;
}

export function DailyChallenge({ challenge, onComplete, onSkip, onRefresh, streak }: DailyChallengeProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">{format(new Date(), 'MMMM d, yyyy')}</span>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">{streak} day streak</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mb-4">
        {challenge.category}
      </span>
      
      <p className="text-gray-600 mb-6">{challenge.description}</p>

      <div className="flex gap-4">
        <button
          onClick={onComplete}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Complete
        </button>
        <button
          onClick={onSkip}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition-colors"
        >
          Skip
        </button>
        <button
          onClick={onRefresh}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}