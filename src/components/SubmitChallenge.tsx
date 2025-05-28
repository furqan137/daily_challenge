import React, { useState } from 'react';
import { UserChallenge } from '../types';

interface SubmitChallengeProps {
  onSubmit: (challenge: UserChallenge) => void;
}

export function SubmitChallenge({ onSubmit }: SubmitChallengeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [challenge, setChallenge] = useState<UserChallenge>({
    title: '',
    category: 'fitness',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(challenge);
    setChallenge({ title: '', category: 'fitness', description: '' });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mt-8 mx-auto block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        Submit New Challenge
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Submit a New Challenge</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={challenge.title}
            onChange={(e) => setChallenge({ ...challenge, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={challenge.category}
            onChange={(e) => setChallenge({ ...challenge, category: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="fitness">Fitness</option>
            <option value="coding">Coding</option>
            <option value="self-improvement">Self-Improvement</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={challenge.description}
            onChange={(e) => setChallenge({ ...challenge, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}