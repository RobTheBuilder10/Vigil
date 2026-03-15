import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, Card, ProgressBar, Divider } from '../../components';
import { useApp } from '../../context/AppContext';
import { VigilDay } from '../../types';

const VIGIL_ITEMS: { key: keyof VigilDay; label: string; icon: string }[] = [
  { key: 'scriptureReading', label: 'Scripture Reading', icon: 'book-outline' },
  { key: 'prayer', label: 'Prayer', icon: 'hand-left-outline' },
  { key: 'reflection', label: 'Reflection', icon: 'bulb-outline' },
  { key: 'disciplineChallenge', label: 'Discipline Challenge', icon: 'barbell-outline' },
];

export const VigilScreen: React.FC = () => {
  const { vigilStreak, updateTodayVigil } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = vigilStreak.history.find(h => h.date === today) || {
    date: today,
    scriptureReading: false,
    prayer: false,
    reflection: false,
    disciplineChallenge: false,
    completed: false,
  };

  const completedCount = VIGIL_ITEMS.filter(
    item => (todayEntry as Record<string, unknown>)[item.key]
  ).length;
  const progress = completedCount / VIGIL_ITEMS.length;

  // Generate last 7 days for the tally view
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const entry = vigilStreak.history.find(h => h.date === dateStr);
    return {
      date: dateStr,
      dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase().slice(0, 2),
      completed: entry?.completed || false,
      isToday: dateStr === today,
    };
  });

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>THE VIGIL</Text>
          <Text style={styles.subtitle}>DAILY DISCIPLINE TRACKER</Text>
        </View>

        {/* Streak Display */}
        <Card style={styles.streakCard}>
          <View style={styles.streakCenter}>
            <View style={styles.streakCircle}>
              <Ionicons name="flame" size={36} color={colors.bronze} />
              <Text style={styles.streakNumber}>{vigilStreak.currentStreak}</Text>
              <Text style={styles.streakLabel}>DAY STREAK</Text>
            </View>
          </View>

          <View style={styles.streakStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{vigilStreak.longestStreak}</Text>
              <Text style={styles.statLabel}>LONGEST</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{vigilStreak.totalDays}</Text>
              <Text style={styles.statLabel}>TOTAL DAYS</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedCount}/{VIGIL_ITEMS.length}</Text>
              <Text style={styles.statLabel}>TODAY</Text>
            </View>
          </View>
        </Card>

        {/* 7-Day Tally View */}
        <Card style={styles.tallyCard}>
          <Text style={styles.tallyTitle}>WEEKLY WATCH</Text>
          <View style={styles.tallyRow}>
            {last7Days.map(day => (
              <View key={day.date} style={styles.tallyItem}>
                <Text style={[styles.tallyDay, day.isToday && styles.tallyDayToday]}>
                  {day.dayLabel}
                </Text>
                <View style={[
                  styles.tallyMark,
                  day.completed && styles.tallyMarkCompleted,
                  day.isToday && !day.completed && styles.tallyMarkToday,
                ]}>
                  {day.completed ? (
                    <Text style={styles.tallyCheck}>|</Text>
                  ) : (
                    <Text style={styles.tallyEmpty}>-</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Today's Tasks */}
        <View style={styles.tasksHeader}>
          <Text style={styles.tasksTitle}>TODAY'S WATCH</Text>
          <ProgressBar progress={progress} style={styles.progressBar} />
        </View>

        <Card>
          {VIGIL_ITEMS.map((item, index) => {
            const completed = (todayEntry as Record<string, unknown>)[item.key] as boolean;
            return (
              <React.Fragment key={item.key}>
                <TouchableOpacity
                  style={styles.taskItem}
                  onPress={() => updateTodayVigil(item.key, !completed)}
                  activeOpacity={0.6}
                >
                  <View style={styles.taskLeft}>
                    <View style={[styles.taskCheckbox, completed && styles.taskCheckboxDone]}>
                      {completed && <Ionicons name="checkmark" size={16} color={colors.black} />}
                    </View>
                    <View>
                      <Text style={[styles.taskLabel, completed && styles.taskLabelDone]}>
                        {item.label}
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={completed ? colors.bronze : colors.textMuted}
                  />
                </TouchableOpacity>
                {index < VIGIL_ITEMS.length - 1 && <Divider style={{ marginVertical: 0 }} />}
              </React.Fragment>
            );
          })}
        </Card>

        {todayEntry.completed && (
          <Card style={styles.completionCard}>
            <Ionicons name="shield-checkmark" size={32} color={colors.bronze} />
            <Text style={styles.completionTitle}>VIGIL COMPLETE</Text>
            <Text style={styles.completionText}>
              You stood watch today. Your discipline builds strength.
            </Text>
          </Card>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginTop: 4,
  },
  streakCard: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  streakCenter: {
    marginBottom: spacing.lg,
  },
  streakCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: colors.bronze,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(176, 141, 87, 0.05)',
  },
  streakNumber: {
    ...typography.number,
    color: colors.textPrimary,
    marginTop: -4,
  },
  streakLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginTop: -4,
  },
  streakStats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.numberSmall,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  tallyCard: {
    marginTop: spacing.md,
  },
  tallyTitle: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  tallyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tallyItem: {
    alignItems: 'center',
    gap: 8,
  },
  tallyDay: {
    ...typography.labelSmall,
    color: colors.textMuted,
    fontSize: 10,
  },
  tallyDayToday: {
    color: colors.bronze,
  },
  tallyMark: {
    width: 32,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tallyMarkCompleted: {
    backgroundColor: 'rgba(176, 141, 87, 0.15)',
    borderColor: colors.bronze,
  },
  tallyMarkToday: {
    borderColor: colors.gunmetal,
    borderStyle: 'dashed',
  },
  tallyCheck: {
    ...typography.h3,
    color: colors.bronze,
    fontWeight: '900',
  },
  tallyEmpty: {
    ...typography.body,
    color: colors.textMuted,
  },
  tasksHeader: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  tasksTitle: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 3,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gunmetal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCheckboxDone: {
    backgroundColor: colors.bronze,
    borderColor: colors.bronze,
  },
  taskLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  taskLabelDone: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  completionCard: {
    marginTop: spacing.lg,
    alignItems: 'center',
    backgroundColor: 'rgba(176, 141, 87, 0.06)',
    borderColor: colors.darkBronze,
    gap: 8,
  },
  completionTitle: {
    ...typography.h3,
    color: colors.bronze,
  },
  completionText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
