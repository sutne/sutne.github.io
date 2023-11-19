export type Profile = {
  onlineId: string;
  accountId: string;
  avatar: string;
  trophySummary: TrophySummary;
};

export type TrophySummary = {
  level: number;
  earned: TrophyCount;
};

export type TrophyType = 'bronze' | 'silver' | 'gold' | 'platinum';
export type TrophyCount = {
  bronze: number;
  silver: number;
  gold: number;
  platinum: number;
};

export type RecentGame = {
  id: string;
  title: string;
  image: string;
  platform: string;
  lastPlayedAt: string;
};

export type TrophyGame = {
  id: string;
  title: string;
  image: string;
  platform: string;
  trophyCount: TrophyCount;
  earnedCount: TrophyCount;
  progress: number;
  firstTrophyEarnedAt?: string;
  lastTrophyEarnedAt?: string;
};

export type TrophyGroup = {
  name: string;
  icon: string;
  trophyCount: TrophyCount;
  earnedCount: TrophyCount;
  progress: number;
  trophies: Trophy[];
};

export type Trophy = {
  id: number;
  title: string;
  description: string;
  icon: string;
  type: TrophyType;
  isHidden: boolean;
  rarity?: string;
  isEarned: boolean;
  earnedAt?: string;
  progress?: {
    achieved: number;
    target: number;
  };
};
