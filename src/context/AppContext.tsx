import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storage } from '../services/storage';
import { ArsenalVerse, VigilStreak, PrayerEntry, UserMission, BrotherhoodPost, WatchingOverOption, VigilDay } from '../types';

interface AppState {
  onboardingComplete: boolean;
  watchingOver: WatchingOverOption[];
  arsenalVerses: ArsenalVerse[];
  vigilStreak: VigilStreak;
  prayerEntries: PrayerEntry[];
  activeMissions: UserMission[];
  brotherhoodPosts: BrotherhoodPost[];
  dailyBriefingCompleted: boolean;
}

interface AppContextType extends AppState {
  completeOnboarding: (watchingOver: WatchingOverOption[]) => Promise<void>;
  addArsenalVerse: (verse: ArsenalVerse) => Promise<void>;
  removeArsenalVerse: (id: string) => Promise<void>;
  updateTodayVigil: (field: keyof VigilDay, value: boolean) => Promise<void>;
  addPrayerEntry: (entry: PrayerEntry) => Promise<void>;
  markPrayerAnswered: (id: string) => Promise<void>;
  completeDailyBriefing: () => Promise<void>;
  joinMission: (missionId: string) => Promise<void>;
  addBrotherhoodPost: (post: BrotherhoodPost) => Promise<void>;
  reactToPost: (postId: string, reaction: 'pray' | 'standWithYou' | 'amen') => Promise<void>;
}

const defaultStreak: VigilStreak = {
  currentStreak: 0,
  longestStreak: 0,
  totalDays: 0,
  history: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    onboardingComplete: false,
    watchingOver: [],
    arsenalVerses: [],
    vigilStreak: defaultStreak,
    prayerEntries: [],
    activeMissions: [],
    brotherhoodPosts: [],
    dailyBriefingCompleted: false,
  });

  useEffect(() => {
    loadState();
  }, []);

  const loadState = async () => {
    const [onboarding, arsenal, streak, prayers, missions, posts] = await Promise.all([
      storage.isOnboardingComplete(),
      storage.getArsenalVerses(),
      storage.getVigilStreak(),
      storage.getPrayerEntries(),
      storage.getActiveMissions(),
      storage.getBrotherhoodPosts(),
    ]);

    setState(prev => ({
      ...prev,
      onboardingComplete: onboarding,
      arsenalVerses: (arsenal as ArsenalVerse[]) || [],
      vigilStreak: (streak as VigilStreak) || defaultStreak,
      prayerEntries: (prayers as PrayerEntry[]) || [],
      activeMissions: (missions as UserMission[]) || [],
      brotherhoodPosts: (posts as BrotherhoodPost[]) || [],
    }));
  };

  const completeOnboarding = useCallback(async (watchingOver: WatchingOverOption[]) => {
    await storage.setOnboardingComplete();
    setState(prev => ({ ...prev, onboardingComplete: true, watchingOver }));
  }, []);

  const addArsenalVerse = useCallback(async (verse: ArsenalVerse) => {
    setState(prev => {
      const updated = [...prev.arsenalVerses, verse];
      storage.setArsenalVerses(updated);
      return { ...prev, arsenalVerses: updated };
    });
  }, []);

  const removeArsenalVerse = useCallback(async (id: string) => {
    setState(prev => {
      const updated = prev.arsenalVerses.filter(v => v.id !== id);
      storage.setArsenalVerses(updated);
      return { ...prev, arsenalVerses: updated };
    });
  }, []);

  const updateTodayVigil = useCallback(async (field: keyof VigilDay, value: boolean) => {
    setState(prev => {
      const today = new Date().toISOString().split('T')[0];
      const history = [...prev.vigilStreak.history];
      let todayEntry = history.find(h => h.date === today);

      if (!todayEntry) {
        todayEntry = {
          date: today,
          scriptureReading: false,
          prayer: false,
          reflection: false,
          disciplineChallenge: false,
          completed: false,
        };
        history.push(todayEntry);
      }

      (todayEntry as Record<string, unknown>)[field] = value;
      todayEntry.completed = todayEntry.scriptureReading && todayEntry.prayer && todayEntry.reflection && todayEntry.disciplineChallenge;

      // Calculate streak
      let currentStreak = 0;
      const sortedHistory = history.sort((a, b) => b.date.localeCompare(a.date));
      for (const day of sortedHistory) {
        if (day.completed) currentStreak++;
        else break;
      }

      const updated: VigilStreak = {
        currentStreak,
        longestStreak: Math.max(prev.vigilStreak.longestStreak, currentStreak),
        totalDays: history.filter(h => h.completed).length,
        history,
      };

      storage.setVigilStreak(updated);
      return { ...prev, vigilStreak: updated };
    });
  }, []);

  const addPrayerEntry = useCallback(async (entry: PrayerEntry) => {
    setState(prev => {
      const updated = [entry, ...prev.prayerEntries];
      storage.setPrayerEntries(updated);
      return { ...prev, prayerEntries: updated };
    });
  }, []);

  const markPrayerAnswered = useCallback(async (id: string) => {
    setState(prev => {
      const updated = prev.prayerEntries.map(p =>
        p.id === id ? { ...p, answered: true, answeredAt: new Date().toISOString() } : p
      );
      storage.setPrayerEntries(updated);
      return { ...prev, prayerEntries: updated };
    });
  }, []);

  const completeDailyBriefing = useCallback(async () => {
    setState(prev => ({ ...prev, dailyBriefingCompleted: true }));
  }, []);

  const joinMission = useCallback(async (missionId: string) => {
    const newMission: UserMission = {
      missionId,
      startDate: new Date().toISOString(),
      currentDay: 1,
      completedDays: [],
      completed: false,
    };
    setState(prev => {
      const updated = [...prev.activeMissions, newMission];
      storage.setActiveMissions(updated);
      return { ...prev, activeMissions: updated };
    });
  }, []);

  const addBrotherhoodPost = useCallback(async (post: BrotherhoodPost) => {
    setState(prev => {
      const updated = [post, ...prev.brotherhoodPosts];
      storage.setBrotherhoodPosts(updated);
      return { ...prev, brotherhoodPosts: updated };
    });
  }, []);

  const reactToPost = useCallback(async (postId: string, reaction: 'pray' | 'standWithYou' | 'amen') => {
    setState(prev => {
      const updated = prev.brotherhoodPosts.map(p => {
        if (p.id !== postId) return p;
        const reactions = { ...p.reactions };
        reactions[reaction] = (reactions[reaction] || 0) + 1;
        return { ...p, reactions, userReaction: reaction };
      });
      storage.setBrotherhoodPosts(updated);
      return { ...prev, brotherhoodPosts: updated };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        completeOnboarding,
        addArsenalVerse,
        removeArsenalVerse,
        updateTodayVigil,
        addPrayerEntry,
        markPrayerAnswered,
        completeDailyBriefing,
        joinMission,
        addBrotherhoodPost,
        reactToPost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
