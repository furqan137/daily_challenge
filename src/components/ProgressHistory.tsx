import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';
import { Challenge, UserProgress } from '../types';
import { challenges } from '../data/challenges';

interface ProgressHistoryProps {
  progress: UserProgress[];
}

export function ProgressHistory({ progress }: ProgressHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Progress History</h2>
      <div className="space-y-4">
        {progress.slice(0, 5).map((entry) => {
          const challenge = challenges.find(c => c.id === entry.challengeId);
          if (!challenge) return null;

          return (
            <div key={entry.date} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
              {entry.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="font-medium">{challenge.title}</p>
                <p className="text-sm text-gray-500">{format(new Date(entry.date), 'MMMM d, yyyy')}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}