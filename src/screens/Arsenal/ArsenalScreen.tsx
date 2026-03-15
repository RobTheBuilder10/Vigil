import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, Card, VerseCard, Button, SectionHeader } from '../../components';
import { useApp } from '../../context/AppContext';
import { ArsenalCategory, ArsenalVerse } from '../../types';

const categories: { id: ArsenalCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'fear', label: 'FEAR' },
  { id: 'courage', label: 'COURAGE' },
  { id: 'temptation', label: 'TEMPTATION' },
  { id: 'leadership', label: 'LEADERSHIP' },
  { id: 'endurance', label: 'ENDURANCE' },
];

export const ArsenalScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { arsenalVerses, removeArsenalVerse } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ArsenalCategory | 'all'>('all');

  const filteredVerses = selectedCategory === 'all'
    ? arsenalVerses
    : arsenalVerses.filter(v => v.category === selectedCategory);

  const handleRemove = (verse: ArsenalVerse) => {
    Alert.alert(
      'Remove from Arsenal',
      `Remove ${verse.verse.book} ${verse.verse.chapter}:${verse.verse.verse}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeArsenalVerse(verse.id) },
      ]
    );
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>THE ARSENAL</Text>
            <Text style={styles.subtitle}>VERSE MEMORY SYSTEM</Text>
          </View>
          {arsenalVerses.length > 0 && (
            <TouchableOpacity
              style={styles.flashcardBtn}
              onPress={() => navigation.navigate('ArsenalFlashcards')}
            >
              <Ionicons name="flash-outline" size={18} color={colors.bronze} />
              <Text style={styles.flashcardText}>DRILL</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{arsenalVerses.length}</Text>
            <Text style={styles.statLabel}>STORED</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {arsenalVerses.filter(v => v.mastery >= 80).length}
            </Text>
            <Text style={styles.statLabel}>MASTERED</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {arsenalVerses.filter(v => v.nextReview && new Date(v.nextReview) <= new Date()).length}
            </Text>
            <Text style={styles.statLabel}>DUE</Text>
          </View>
        </View>
      </View>

      {/* Category Filter */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === item.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === item.id && styles.categoryTextActive,
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      {/* Verse List */}
      {filteredVerses.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="shield-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>ARSENAL EMPTY</Text>
          <Text style={styles.emptyText}>
            Save verses from the Bible reader to build your arsenal.
            Train scripture recall for moments of stress.
          </Text>
          <Button
            title="OPEN SCRIPTURE"
            onPress={() => navigation.navigate('Bible')}
            variant="secondary"
            style={styles.emptyBtn}
          />
        </View>
      ) : (
        <FlatList
          data={filteredVerses}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.verseItem}>
              <VerseCard
                verse={item.verse}
                saved
                compact
                onSave={() => handleRemove(item)}
              />
              <View style={styles.verseMeta}>
                <View style={styles.masteryContainer}>
                  <Text style={styles.masteryLabel}>MASTERY</Text>
                  <View style={styles.masteryBar}>
                    <View style={[styles.masteryFill, { width: `${item.mastery}%` }]} />
                  </View>
                  <Text style={styles.masteryPercent}>{item.mastery}%</Text>
                </View>
                <Text style={styles.reviewCount}>{item.reviewCount} reviews</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  flashcardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(176, 141, 87, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.bronze,
  },
  flashcardText: {
    ...typography.labelSmall,
    color: colors.bronze,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.border,
  },
  categoryList: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    flexGrow: 0,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  categoryChipActive: {
    borderColor: colors.bronze,
    backgroundColor: 'rgba(176, 141, 87, 0.15)',
  },
  categoryText: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  categoryTextActive: {
    color: colors.bronze,
  },
  listContent: {
    paddingBottom: 40,
    gap: 12,
  },
  verseItem: {
    gap: 8,
  },
  verseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  masteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  masteryLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    fontSize: 9,
  },
  masteryBar: {
    flex: 1,
    height: 3,
    backgroundColor: colors.gunmetal,
    borderRadius: 2,
    maxWidth: 80,
  },
  masteryFill: {
    height: 3,
    backgroundColor: colors.bronze,
    borderRadius: 2,
  },
  masteryPercent: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    fontSize: 10,
  },
  reviewCount: {
    ...typography.labelSmall,
    color: colors.textMuted,
    fontSize: 10,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textSecondary,
    marginTop: 8,
  },
  emptyText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyBtn: {
    marginTop: 12,
  },
});
