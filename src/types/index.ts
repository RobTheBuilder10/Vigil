// Bible types
export interface BibleBook {
  id: string;
  name: string;
  shortName: string;
  chapters: number;
  testament: 'old' | 'new';
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: BibleTranslation;
}

export type BibleTranslation = 'ESV' | 'NKJV' | 'NASB' | 'KJV';

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

// Arsenal types
export type ArsenalCategory = 'fear' | 'courage' | 'temptation' | 'leadership' | 'endurance' | 'general';

export interface ArsenalVerse {
  id: string;
  verse: BibleVerse;
  category: ArsenalCategory;
  savedAt: string;
  lastReviewed?: string;
  reviewCount: number;
  nextReview?: string;
  mastery: number; // 0-100
}

// Streak types
export interface VigilDay {
  [key: string]: string | boolean;
  date: string;
  scriptureReading: boolean;
  prayer: boolean;
  reflection: boolean;
  disciplineChallenge: boolean;
  completed: boolean;
}

export interface VigilStreak {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  history: VigilDay[];
}

// Watchtower types
export interface DailyBriefing {
  id: string;
  date: string;
  verse: BibleVerse;
  interpretation: string;
  missionForToday: string;
  prayer: string;
  completed: boolean;
}

// Brotherhood types
export interface BrotherhoodPost {
  id: string;
  userId: string;
  userName: string;
  type: 'prayer_request' | 'testimony' | 'encouragement';
  content: string;
  createdAt: string;
  reactions: {
    pray: number;
    standWithYou: number;
    amen: number;
  };
  userReaction?: 'pray' | 'standWithYou' | 'amen';
}

export interface Brotherhood {
  id: string;
  name: string;
  leaderId: string;
  members: string[];
  readingPlan?: string;
  createdAt: string;
}

// Mission types
export type MissionDuration = 7 | 14 | 30;

export interface Mission {
  id: string;
  title: string;
  description: string;
  duration: MissionDuration;
  days: MissionDay[];
  category: string;
  badge: string;
  isPremium: boolean;
}

export interface MissionDay {
  day: number;
  scripture: string;
  reflection: string;
  challenge: string;
  completed: boolean;
}

export interface UserMission {
  missionId: string;
  startDate: string;
  currentDay: number;
  completedDays: number[];
  completed: boolean;
}

// Prayer types
export interface PrayerEntry {
  id: string;
  content: string;
  scripture?: string;
  createdAt: string;
  answered: boolean;
  answeredAt?: string;
}

// User types
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  watchingOver: WatchingOverOption[];
  isPremium: boolean;
  createdAt: string;
  onboardingCompleted: boolean;
}

export type WatchingOverOption = 'family' | 'faith' | 'discipline' | 'leadership' | 'purpose' | 'overcoming_temptation';

// Battle Mode types
export interface BattleCategory {
  id: string;
  name: string;
  icon: string;
  verses: BibleVerse[];
  prayers: string[];
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Auth: undefined;
  BibleReader: { book?: string; chapter?: number };
  ChapterView: { book: string; chapter: number };
  VerseDetail: { book: string; chapter: number; verse: number };
  ArsenalFlashcards: undefined;
  BattleMode: undefined;
  MissionDetail: { missionId: string };
  BrotherhoodDetail: { brotherhoodId: string };
  CreateBrotherhood: undefined;
  CreatePost: undefined;
  PrayerEntry: { entryId?: string };
  Premium: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Watchtower: undefined;
  Bible: undefined;
  TheVigil: undefined;
  Arsenal: undefined;
  More: undefined;
};
