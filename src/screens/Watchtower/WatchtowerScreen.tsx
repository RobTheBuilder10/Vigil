import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, VerseCard, Card, SectionHeader, Button, Divider } from '../../components';
import { useApp } from '../../context/AppContext';
import { dailyBriefings } from '../../data/sampleVerses';

export const WatchtowerScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { vigilStreak, dailyBriefingCompleted, completeDailyBriefing } = useApp();
  const [expanded, setExpanded] = useState(false);
  const briefing = dailyBriefings['default'];

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>{dateStr}</Text>
            <Text style={styles.title}>STAND WATCH</Text>
          </View>
          <TouchableOpacity
            style={styles.streakBadge}
            onPress={() => navigation.navigate('TheVigil')}
          >
            <Ionicons name="flame" size={20} color={colors.bronze} />
            <Text style={styles.streakNumber}>{vigilStreak.currentStreak}</Text>
          </TouchableOpacity>
        </View>

        <Divider />

        {/* Daily Briefing */}
        <SectionHeader title="DAILY WATCH BRIEFING" />

        <Card style={styles.briefingCard}>
          <View style={styles.briefingHeader}>
            <Ionicons name="radio-outline" size={20} color={colors.bronze} />
            <Text style={styles.briefingLabel}>TODAY'S BRIEFING</Text>
            {dailyBriefingCompleted && (
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            )}
          </View>

          <VerseCard verse={briefing.verse} compact />

          <TouchableOpacity
            style={styles.expandBtn}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.expandText}>
              {expanded ? 'COLLAPSE' : 'READ FULL BRIEFING'}
            </Text>
            <Ionicons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={colors.bronze}
            />
          </TouchableOpacity>

          {expanded && (
            <View style={styles.briefingContent}>
              <View style={styles.briefingSection}>
                <Text style={styles.sectionLabel}>INTERPRETATION</Text>
                <Text style={styles.sectionText}>{briefing.interpretation}</Text>
              </View>

              <View style={styles.briefingSection}>
                <Text style={styles.sectionLabel}>MISSION FOR TODAY</Text>
                <Text style={styles.sectionText}>{briefing.missionForToday}</Text>
              </View>

              <View style={styles.briefingSection}>
                <Text style={styles.sectionLabel}>PRAYER</Text>
                <Text style={[styles.sectionText, styles.prayerText]}>{briefing.prayer}</Text>
              </View>

              {!dailyBriefingCompleted && (
                <Button
                  title="MARK COMPLETE"
                  onPress={completeDailyBriefing}
                  fullWidth
                  style={styles.completeBtn}
                />
              )}
            </View>
          )}
        </Card>

        {/* Quick Actions */}
        <SectionHeader title="QUICK ACTIONS" />

        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Bible')}
          >
            <Ionicons name="book-outline" size={28} color={colors.bronze} />
            <Text style={styles.actionLabel}>READ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Arsenal')}
          >
            <Ionicons name="shield-outline" size={28} color={colors.bronze} />
            <Text style={styles.actionLabel}>ARSENAL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, styles.battleAction]}
            onPress={() => navigation.navigate('BattleMode')}
          >
            <Ionicons name="flash-outline" size={28} color={colors.mutedGold} />
            <Text style={[styles.actionLabel, styles.battleLabel]}>BATTLE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('More', { screen: 'PrayerJournal' })}
          >
            <Ionicons name="journal-outline" size={28} color={colors.bronze} />
            <Text style={styles.actionLabel}>PRAY</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Vigil Progress */}
        <SectionHeader title="TODAY'S VIGIL" />

        <Card>
          <View style={styles.vigilItems}>
            {[
              { key: 'scriptureReading', label: 'Scripture Reading', icon: 'book-outline' },
              { key: 'prayer', label: 'Prayer', icon: 'hand-left-outline' },
              { key: 'reflection', label: 'Reflection', icon: 'bulb-outline' },
              { key: 'disciplineChallenge', label: 'Discipline Challenge', icon: 'barbell-outline' },
            ].map(item => {
              const todayEntry = vigilStreak.history.find(
                h => h.date === new Date().toISOString().split('T')[0]
              );
              const completed = todayEntry ? (todayEntry as Record<string, unknown>)[item.key] as boolean : false;

              return (
                <TouchableOpacity
                  key={item.key}
                  style={styles.vigilItem}
                  onPress={() => navigation.navigate('TheVigil')}
                >
                  <View style={styles.vigilItemLeft}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={completed ? colors.bronze : colors.textMuted}
                    />
                    <Text style={[styles.vigilItemLabel, completed && styles.vigilItemCompleted]}>
                      {item.label}
                    </Text>
                  </View>
                  <View style={[styles.checkbox, completed && styles.checkboxChecked]}>
                    {completed && <Ionicons name="checkmark" size={14} color={colors.black} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Notification Banner */}
        <Card style={styles.notifCard}>
          <View style={styles.notifRow}>
            <Ionicons name="notifications-outline" size={18} color={colors.bronze} />
            <Text style={styles.notifText}>Your Vigil continues today. Strength is built daily.</Text>
          </View>
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: spacing.md,
  },
  dateText: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginBottom: 4,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  streakNumber: {
    ...typography.h4,
    color: colors.bronze,
  },
  briefingCard: {
    padding: 0,
    overflow: 'hidden',
  },
  briefingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: spacing.md,
    paddingBottom: 0,
  },
  briefingLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    flex: 1,
  },
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: 6,
  },
  expandText: {
    ...typography.labelSmall,
    color: colors.bronze,
  },
  briefingContent: {
    padding: spacing.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  briefingSection: {
    marginTop: spacing.md,
  },
  sectionLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginBottom: 6,
  },
  sectionText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  prayerText: {
    fontStyle: 'italic',
    color: colors.textAccent,
  },
  completeBtn: {
    marginTop: spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  battleAction: {
    borderColor: colors.darkBronze,
    backgroundColor: 'rgba(176, 141, 87, 0.08)',
  },
  actionLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
  battleLabel: {
    color: colors.mutedGold,
  },
  vigilItems: {
    gap: 2,
  },
  vigilItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  vigilItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vigilItemLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  vigilItemCompleted: {
    color: colors.textPrimary,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gunmetal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.bronze,
    borderColor: colors.bronze,
  },
  notifCard: {
    marginTop: spacing.lg,
    backgroundColor: 'rgba(176, 141, 87, 0.06)',
    borderColor: colors.darkBronze,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notifText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
  },
});
