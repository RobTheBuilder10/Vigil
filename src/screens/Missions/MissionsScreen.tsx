import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, Card, Button, SectionHeader, ProgressBar } from '../../components';
import { useApp } from '../../context/AppContext';
import { missionsData } from '../../data/sampleVerses';

const DURATION_ICONS: Record<number, string> = {
  7: 'flash-outline',
  14: 'shield-outline',
  30: 'trophy-outline',
};

export const MissionsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { activeMissions, joinMission } = useApp();

  const isActive = (missionId: string) => activeMissions.some(m => m.missionId === missionId);

  const getActiveMission = (missionId: string) => activeMissions.find(m => m.missionId === missionId);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>MISSIONS</Text>
        <Text style={styles.subtitle}>GUIDED CHALLENGES</Text>
      </View>

      {/* Active Missions */}
      {activeMissions.length > 0 && (
        <>
          <SectionHeader title="ACTIVE MISSIONS" />
          {activeMissions.map(am => {
            const mission = missionsData.find(m => m.id === am.missionId);
            if (!mission) return null;
            const progress = am.completedDays.length / mission.duration;
            return (
              <Card key={am.missionId} style={styles.activeMissionCard}>
                <View style={styles.activeMissionHeader}>
                  <View style={styles.activeMissionInfo}>
                    <Text style={styles.activeMissionTitle}>{mission.title}</Text>
                    <Text style={styles.activeMissionDay}>
                      DAY {am.currentDay} OF {mission.duration}
                    </Text>
                  </View>
                  <View style={styles.progressCircle}>
                    <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
                  </View>
                </View>
                <ProgressBar progress={progress} style={styles.missionProgress} />
              </Card>
            );
          })}
        </>
      )}

      {/* Available Missions */}
      <SectionHeader title="AVAILABLE MISSIONS" />

      <FlatList
        data={missionsData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const active = isActive(item.id);
          return (
            <Card style={styles.missionCard}>
              <View style={styles.missionTop}>
                <View style={styles.missionIcon}>
                  <Ionicons
                    name={(DURATION_ICONS[item.duration] || 'flag-outline') as any}
                    size={24}
                    color={colors.bronze}
                  />
                </View>
                <View style={styles.missionInfo}>
                  <View style={styles.missionTitleRow}>
                    <Text style={styles.missionTitle}>{item.title}</Text>
                    {item.isPremium && (
                      <View style={styles.premiumBadge}>
                        <Ionicons name="star" size={10} color={colors.mutedGold} />
                        <Text style={styles.premiumText}>COMMAND</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.missionDesc}>{item.description}</Text>
                </View>
              </View>

              <View style={styles.missionBottom}>
                <View style={styles.missionMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
                    <Text style={styles.metaText}>{item.duration} DAYS</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="ribbon-outline" size={14} color={colors.textMuted} />
                    <Text style={styles.metaText}>{item.badge.toUpperCase()}</Text>
                  </View>
                </View>
                <Button
                  title={active ? 'ACTIVE' : item.isPremium ? 'UNLOCK' : 'JOIN'}
                  onPress={() => !active && !item.isPremium && joinMission(item.id)}
                  size="small"
                  variant={active ? 'ghost' : item.isPremium ? 'secondary' : 'primary'}
                  disabled={active}
                />
              </View>
            </Card>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.md,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  activeMissionCard: {
    marginBottom: spacing.sm,
    borderColor: colors.bronze,
  },
  activeMissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activeMissionInfo: {
    flex: 1,
  },
  activeMissionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  activeMissionDay: {
    ...typography.labelSmall,
    color: colors.bronze,
    marginTop: 2,
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.bronze,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercent: {
    ...typography.labelSmall,
    color: colors.bronze,
    fontSize: 12,
  },
  missionProgress: {
    height: 3,
  },
  listContent: {
    gap: 10,
    paddingBottom: 40,
  },
  missionCard: {
    gap: spacing.md,
  },
  missionTop: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  missionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(176, 141, 87, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionInfo: {
    flex: 1,
  },
  missionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  missionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
  },
  premiumText: {
    ...typography.labelSmall,
    color: colors.mutedGold,
    fontSize: 8,
  },
  missionDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  missionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  missionMeta: {
    flexDirection: 'row',
    gap: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...typography.labelSmall,
    color: colors.textMuted,
    fontSize: 10,
  },
});
