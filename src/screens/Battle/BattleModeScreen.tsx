import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, VerseCard, Card } from '../../components';
import { battleCategories } from '../../data/sampleVerses';

const { width } = Dimensions.get('window');

type BattlePhase = 'select' | 'active' | 'breathing';

export const BattleModeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [phase, setPhase] = useState<BattlePhase>('select');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [showPrayer, setShowPrayer] = useState(false);
  const breathAnim = useRef(new Animated.Value(0.3)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const category = battleCategories.find(c => c.id === selectedCategory);

  // Pulse animation for battle mode indicator
  useEffect(() => {
    if (phase === 'active') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [phase]);

  const startBreathing = () => {
    setPhase('breathing');
    setBreathCount(0);
    runBreathCycle();
  };

  const runBreathCycle = () => {
    setBreathPhase('inhale');
    Animated.sequence([
      // Inhale - 4 seconds
      Animated.timing(breathAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
      // Hold - 4 seconds
      Animated.delay(4000),
      // Exhale - 4 seconds
      Animated.timing(breathAnim, { toValue: 0.3, duration: 4000, useNativeDriver: true }),
    ]).start(() => {
      setBreathCount(prev => {
        if (prev < 4) {
          runBreathCycle();
          return prev + 1;
        }
        setPhase('active');
        return 0;
      });
    });

    // Update phase labels
    setTimeout(() => setBreathPhase('hold'), 4000);
    setTimeout(() => setBreathPhase('exhale'), 8000);
  };

  const nextVerse = () => {
    if (category && currentVerseIndex < category.verses.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
    }
  };

  const prevVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(prev => prev - 1);
    }
  };

  // Category Selection
  if (phase === 'select') {
    return (
      <ScreenContainer>
        <View style={styles.selectHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.selectContent}>
          <Ionicons name="flash" size={48} color={colors.mutedGold} />
          <Text style={styles.selectTitle}>BATTLE MODE</Text>
          <Text style={styles.selectSubtitle}>SPIRITUAL FIRST AID</Text>
          <Text style={styles.selectDescription}>
            What are you facing right now?
          </Text>

          <View style={styles.categoryGrid}>
            {battleCategories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                onPress={() => {
                  setSelectedCategory(cat.id);
                  setPhase('active');
                  setCurrentVerseIndex(0);
                  setShowPrayer(false);
                }}
                activeOpacity={0.7}
              >
                <Ionicons name={cat.icon as any} size={28} color={colors.bronze} />
                <Text style={styles.categoryName}>{cat.name.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScreenContainer>
    );
  }

  // Breathing Exercise
  if (phase === 'breathing') {
    return (
      <ScreenContainer>
        <View style={styles.breathContainer}>
          <Text style={styles.breathTitle}>BREATHE</Text>
          <Text style={styles.breathInstruction}>
            {breathPhase === 'inhale' ? 'BREATHE IN' : breathPhase === 'hold' ? 'HOLD' : 'BREATHE OUT'}
          </Text>

          <Animated.View
            style={[
              styles.breathCircle,
              { transform: [{ scale: breathAnim }] },
            ]}
          />

          <Text style={styles.breathCount}>{breathCount + 1} / 5</Text>

          <TouchableOpacity
            style={styles.skipBreath}
            onPress={() => setPhase('active')}
          >
            <Text style={styles.skipBreathText}>SKIP</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  // Active Battle Mode
  if (!category) return null;

  return (
    <ScreenContainer>
      <View style={styles.activeHeader}>
        <TouchableOpacity onPress={() => setPhase('select')}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Animated.View style={[styles.battleIndicator, { transform: [{ scale: pulseAnim }] }]}>
          <Ionicons name="flash" size={16} color={colors.mutedGold} />
          <Text style={styles.battleIndicatorText}>BATTLE MODE</Text>
        </Animated.View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={22} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.activeContent}>
        <Text style={styles.categoryTitle}>{category.name.toUpperCase()}</Text>

        {/* Verse Display */}
        <View style={styles.verseSection}>
          <VerseCard verse={category.verses[currentVerseIndex]} />
          <View style={styles.verseNav}>
            <TouchableOpacity
              onPress={prevVerse}
              disabled={currentVerseIndex === 0}
              style={styles.verseNavBtn}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={currentVerseIndex === 0 ? colors.textMuted : colors.bronze}
              />
            </TouchableOpacity>
            <Text style={styles.verseCounter}>
              {currentVerseIndex + 1} / {category.verses.length}
            </Text>
            <TouchableOpacity
              onPress={nextVerse}
              disabled={currentVerseIndex === category.verses.length - 1}
              style={styles.verseNavBtn}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color={currentVerseIndex === category.verses.length - 1 ? colors.textMuted : colors.bronze}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Prayer */}
        <TouchableOpacity
          style={styles.prayerToggle}
          onPress={() => setShowPrayer(!showPrayer)}
        >
          <Ionicons name="hand-left-outline" size={18} color={colors.bronze} />
          <Text style={styles.prayerToggleText}>
            {showPrayer ? 'HIDE PRAYER' : 'SHOW PRAYER'}
          </Text>
        </TouchableOpacity>

        {showPrayer && (
          <Card style={styles.prayerCard}>
            <Text style={styles.prayerText}>
              {category.prayers[currentVerseIndex % category.prayers.length]}
            </Text>
          </Card>
        )}

        {/* Breathing Button */}
        <TouchableOpacity style={styles.breathBtn} onPress={startBreathing}>
          <Ionicons name="water-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.breathBtnText}>BREATHING EXERCISE</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  // Select phase
  selectHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: spacing.md,
  },
  selectContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  selectTitle: {
    ...typography.h1,
    color: colors.mutedGold,
    marginTop: spacing.md,
  },
  selectSubtitle: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginTop: 4,
  },
  selectDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
  },
  categoryCard: {
    width: (width - 74) / 2,
    paddingVertical: 28,
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryName: {
    ...typography.label,
    color: colors.textSecondary,
    fontSize: 12,
  },
  // Breathing phase
  breathContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  breathInstruction: {
    ...typography.label,
    color: colors.bronze,
    marginBottom: spacing.xxl,
  },
  breathCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: colors.bronze,
    backgroundColor: 'rgba(176, 141, 87, 0.08)',
  },
  breathCount: {
    ...typography.label,
    color: colors.textMuted,
    marginTop: spacing.xxl,
  },
  skipBreath: {
    marginTop: spacing.lg,
    padding: 8,
  },
  skipBreathText: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  // Active phase
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  battleIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.darkBronze,
  },
  battleIndicatorText: {
    ...typography.labelSmall,
    color: colors.mutedGold,
  },
  activeContent: {
    paddingBottom: 40,
  },
  categoryTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginVertical: spacing.lg,
  },
  verseSection: {
    gap: spacing.md,
  },
  verseNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  verseNavBtn: {
    padding: 8,
  },
  verseCounter: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  prayerToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: spacing.lg,
  },
  prayerToggleText: {
    ...typography.labelSmall,
    color: colors.bronze,
  },
  prayerCard: {
    backgroundColor: 'rgba(176, 141, 87, 0.06)',
    borderColor: colors.darkBronze,
  },
  prayerText: {
    ...typography.body,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 26,
  },
  breathBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: spacing.lg,
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  breathBtnText: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
});
