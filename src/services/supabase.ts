import { createClient } from '@supabase/supabase-js';

// These would be replaced with actual Supabase credentials
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

// Database schema types for Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          watching_over: string[];
          is_premium: boolean;
          created_at: string;
          onboarding_completed: boolean;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      arsenal_verses: {
        Row: {
          id: string;
          user_id: string;
          book: string;
          chapter: number;
          verse: number;
          text: string;
          translation: string;
          category: string;
          mastery: number;
          review_count: number;
          next_review: string | null;
          created_at: string;
        };
      };
      vigil_streaks: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          scripture_reading: boolean;
          prayer: boolean;
          reflection: boolean;
          discipline_challenge: boolean;
          completed: boolean;
        };
      };
      brotherhood_posts: {
        Row: {
          id: string;
          user_id: string;
          user_name: string;
          type: 'prayer_request' | 'testimony' | 'encouragement';
          content: string;
          pray_count: number;
          stand_with_you_count: number;
          amen_count: number;
          created_at: string;
        };
      };
      brotherhoods: {
        Row: {
          id: string;
          name: string;
          leader_id: string;
          reading_plan: string | null;
          created_at: string;
        };
      };
      brotherhood_members: {
        Row: {
          brotherhood_id: string;
          user_id: string;
          joined_at: string;
        };
      };
      prayer_entries: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          scripture: string | null;
          answered: boolean;
          answered_at: string | null;
          created_at: string;
        };
      };
      user_missions: {
        Row: {
          id: string;
          user_id: string;
          mission_id: string;
          start_date: string;
          current_day: number;
          completed_days: number[];
          completed: boolean;
          created_at: string;
        };
      };
      daily_briefing_completions: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          completed: boolean;
        };
      };
    };
  };
}

/*
-- Supabase SQL Schema:

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT '',
  watching_over TEXT[] DEFAULT '{}',
  is_premium BOOLEAN DEFAULT FALSE,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE arsenal_verses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  book TEXT NOT NULL,
  chapter INT NOT NULL,
  verse INT NOT NULL,
  text TEXT NOT NULL,
  translation TEXT NOT NULL DEFAULT 'KJV',
  category TEXT NOT NULL DEFAULT 'general',
  mastery INT DEFAULT 0,
  review_count INT DEFAULT 0,
  next_review TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vigil_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  scripture_reading BOOLEAN DEFAULT FALSE,
  prayer BOOLEAN DEFAULT FALSE,
  reflection BOOLEAN DEFAULT FALSE,
  discipline_challenge BOOLEAN DEFAULT FALSE,
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, date)
);

CREATE TABLE brotherhood_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('prayer_request', 'testimony', 'encouragement')),
  content TEXT NOT NULL CHECK (char_length(content) <= 300),
  pray_count INT DEFAULT 0,
  stand_with_you_count INT DEFAULT 0,
  amen_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE brotherhoods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  leader_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reading_plan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE brotherhood_members (
  brotherhood_id UUID REFERENCES brotherhoods(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (brotherhood_id, user_id)
);

CREATE TABLE prayer_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  scripture TEXT,
  answered BOOLEAN DEFAULT FALSE,
  answered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mission_id TEXT NOT NULL,
  start_date DATE NOT NULL,
  current_day INT DEFAULT 1,
  completed_days INT[] DEFAULT '{}',
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE daily_briefing_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, date)
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE arsenal_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE vigil_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE brotherhood_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can read own arsenal" ON arsenal_verses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own streaks" ON vigil_streaks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can read posts" ON brotherhood_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON brotherhood_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can manage own prayers" ON prayer_entries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own missions" ON user_missions FOR ALL USING (auth.uid() = user_id);
*/
