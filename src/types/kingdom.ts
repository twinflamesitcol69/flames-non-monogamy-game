
export interface Player {
  name: string;
  gender: 'male' | 'female' | 'nonbinary';
  orientation: 'heterosexual' | 'homosexual' | 'bisexual' | 'queer' | 'heteroflexible';
}

export interface Activity {
  id: string;
  level: 1 | 2 | 3;
  minPlayers: number;
  maxPlayers: number;
  placeholders: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type GameLevel = 1 | 2 | 3;
export type GameStep = 'welcome' | 'setup' | 'level-select' | 'playing' | 'level-complete' | 'game-complete' | 'feedback' | 'complete';

export interface PlayerSelection {
  [placeholder: string]: Player;
}
