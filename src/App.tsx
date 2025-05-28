import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { DailyChallenge } from './components/DailyChallenge';
import { ProgressHistory } from './components/ProgressHistory';
import { SubmitChallenge } from './components/SubmitChallenge';
import { useLocalStorage } from './hooks/useLocalStorage';
import { challenges } from './data/challenges';
import type { Challenge, UserProgress, UserChallenge } from './types';

function App() {
  const [userChallenges, setUserChallenges] = useLocalStorage<Challenge[]>('user-challenges', []);
  const [progress, setProgress] = useLocalStorage<UserProgress[]>('progress', []);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [streak, setStreak] = useState(0);

  const allChallenges = [...challenges, ...userChallenges];

  useEffect(() => {
    getNewChallenge();
    calculateStreak();
  }, []);

  const getNewChallenge = () => {
    const randomIndex = Math.floor(Math.random() * allChallenges.length);
    setCurrentChallenge(allChallenges[randomIndex]);
  };

  const calculateStreak = () => {
    let currentStreak = 0;
    const sortedProgress = [...progress].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (let i = 0; i < sortedProgress.length; i++) {
      if (sortedProgress[i].status === 'completed') {
        currentStreak++;
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const handleComplete = () => {
    if (!currentChallenge) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const newProgress: UserProgress = {
      date: today,
      challengeId: currentChallenge.id,
      status: 'completed'
    };

    setProgress([newProgress, ...progress]);
    calculateStreak();
    getNewChallenge();
  };

  const handleSkip = () => {
    if (!currentChallenge) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const newProgress: UserProgress = {
      date: today,
      challengeId: currentChallenge.id,
      status: 'skipped'
    };

    setProgress([newProgress, ...progress]);
    setStreak(0);
    getNewChallenge();
  };

  const handleSubmitChallenge = (newChallenge: UserChallenge) => {
    const challenge: Challenge = {
      ...newChallenge,
      id: `user-${Date.now()}`
    };
    setUserChallenges([...userChallenges, challenge]);
  };

  if (!currentChallenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Daily Challenge & Progress Tracker</h1>
        
        <DailyChallenge
          challenge={currentChallenge}
          onComplete={handleComplete}
          onSkip={handleSkip}
          onRefresh={getNewChallenge}
          streak={streak}
        />

        <ProgressHistory progress={progress} />
        
        <SubmitChallenge onSubmit={handleSubmitChallenge} />
      </div>
    </div>
  );
}

export default App;