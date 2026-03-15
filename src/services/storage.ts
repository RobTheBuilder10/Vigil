import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_PROFILE: '@vigil_user_profile',
  ONBOARDING_COMPLETE: '@vigil_onboarding_complete',
  VIGIL_STREAK: '@vigil_streak',
  ARSENAL_VERSES: '@vigil_arsenal',
  PRAYER_ENTRIES: '@vigil_prayers',
  DAILY_BRIEFING: '@vigil_daily_briefing',
  ACTIVE_MISSIONS: '@vigil_missions',
  BOOKMARKS: '@vigil_bookmarks',
  READING_PROGRESS: '@vigil_reading_progress',
  SETTINGS: '@vigil_settings',
  BROTHERHOOD_POSTS: '@vigil_brotherhood_posts',
};

export const storage = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  async set(key: string, value: unknown): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      // silently fail
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // silently fail
    }
  },

  // Convenience methods
  async isOnboardingComplete(): Promise<boolean> {
    return (await this.get<boolean>(KEYS.ONBOARDING_COMPLETE)) ?? false;
  },

  async setOnboardingComplete(): Promise<void> {
    await this.set(KEYS.ONBOARDING_COMPLETE, true);
  },

  async getVigilStreak() {
    return this.get(KEYS.VIGIL_STREAK);
  },

  async setVigilStreak(streak: unknown) {
    await this.set(KEYS.VIGIL_STREAK, streak);
  },

  async getArsenalVerses() {
    return this.get(KEYS.ARSENAL_VERSES);
  },

  async setArsenalVerses(verses: unknown) {
    await this.set(KEYS.ARSENAL_VERSES, verses);
  },

  async getPrayerEntries() {
    return this.get(KEYS.PRAYER_ENTRIES);
  },

  async setPrayerEntries(entries: unknown) {
    await this.set(KEYS.PRAYER_ENTRIES, entries);
  },

  async getActiveMissions() {
    return this.get(KEYS.ACTIVE_MISSIONS);
  },

  async setActiveMissions(missions: unknown) {
    await this.set(KEYS.ACTIVE_MISSIONS, missions);
  },

  async getBrotherhoodPosts() {
    return this.get(KEYS.BROTHERHOOD_POSTS);
  },

  async setBrotherhoodPosts(posts: unknown) {
    await this.set(KEYS.BROTHERHOOD_POSTS, posts);
  },

  KEYS,
};
