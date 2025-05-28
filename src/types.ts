export interface Challenge {
  id: string;
  title: string;
  category: 'fitness' | 'coding' | 'self-improvement';
  description: string;
}

export interface UserProgress {
  date: string;
  challengeId: string;
  status: 'completed' | 'skipped';
}

export interface UserChallenge {
  title: string;
  category: 'fitness' | 'coding' | 'self-improvement';
  description: string;
}