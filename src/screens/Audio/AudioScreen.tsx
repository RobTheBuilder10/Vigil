import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, Card, SectionHeader, ProgressBar } from '../../components';
import { bibleBooks } from '../../data/bibleBooks';

export const AudioScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBook, setCurrentBook] = useState('Psalms');
  const [currentChapter, setCurrentChapter] = useState(23);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [progress, setProgress] = useState(0.35);

  const popularBooks = [
    { name: 'Psalms', chapters: 150 },
    { name: 'Proverbs', chapters: 31 },
    { name: 'John', chapters: 21 },
    { name: 'Romans', chapters: 16 },
    { name: 'Genesis', chapters: 50 },
    { name: 'Isaiah', chapters: 66 },
  ];

  const sleepTimerOptions = [15, 30, 45, 60];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>SCRIPTURE AUDIO</Text>
        <Text style={styles.subtitle}>DEEP MASCULINE NARRATION</Text>
      </View>

      {/* Now Playing Card */}
      <Card style={styles.playerCard}>
        <Text style={styles.nowPlaying}>NOW PLAYING</Text>
        <Text style={styles.bookTitle}>{currentBook}</Text>
        <Text style={styles.chapterTitle}>CHAPTER {currentChapter}</Text>

        <ProgressBar progress={progress} style={styles.progressBar} />

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>3:24</Text>
          <Text style={styles.timeText}>9:48</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="play-skip-back" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={32}
              color={colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="play-skip-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Sleep Timer */}
        <View style={styles.timerSection}>
          <Ionicons name="moon-outline" size={16} color={colors.textMuted} />
          <Text style={styles.timerLabel}>SLEEP TIMER</Text>
          <View style={styles.timerOptions}>
            {sleepTimerOptions.map(mins => (
              <TouchableOpacity
                key={mins}
                style={[styles.timerBtn, sleepTimer === mins && styles.timerBtnActive]}
                onPress={() => setSleepTimer(sleepTimer === mins ? null : mins)}
              >
                <Text style={[styles.timerText, sleepTimer === mins && styles.timerTextActive]}>
                  {mins}m
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Card>

      {/* Quick Listen */}
      <SectionHeader title="QUICK LISTEN" />

      <FlatList
        data={popularBooks}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.quickCard, currentBook === item.name && styles.quickCardActive]}
            onPress={() => {
              setCurrentBook(item.name);
              setCurrentChapter(1);
            }}
          >
            <Ionicons name="headset-outline" size={22} color={colors.bronze} />
            <Text style={styles.quickName}>{item.name}</Text>
            <Text style={styles.quickChapters}>{item.chapters} ch</Text>
          </TouchableOpacity>
        )}
      />

      {/* Chapters */}
      <SectionHeader title={`${currentBook.toUpperCase()} CHAPTERS`} />

      <FlatList
        data={Array.from({ length: Math.min(popularBooks.find(b => b.name === currentBook)?.chapters || 10, 30) }, (_, i) => i + 1)}
        keyExtractor={item => item.toString()}
        numColumns={5}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.chapterBtn,
              currentChapter === item && styles.chapterBtnActive,
            ]}
            onPress={() => setCurrentChapter(item)}
          >
            <Text style={[
              styles.chapterNum,
              currentChapter === item && styles.chapterNumActive,
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.chaptersGrid}
      />

      <View style={{ height: 40 }} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.md,
    marginBottom: spacing.md,
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
  playerCard: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  nowPlaying: {
    ...typography.labelSmall,
    color: colors.bronze,
    marginBottom: spacing.sm,
  },
  bookTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  chapterTitle: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  progressBar: {
    height: 3,
    marginBottom: spacing.xs,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.md,
  },
  timeText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    marginBottom: spacing.lg,
  },
  controlBtn: {
    padding: 8,
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.bronze,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
  },
  timerLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  timerOptions: {
    flexDirection: 'row',
    gap: 6,
    marginLeft: 'auto',
  },
  timerBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timerBtnActive: {
    borderColor: colors.bronze,
    backgroundColor: 'rgba(176, 141, 87, 0.15)',
  },
  timerText: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  timerTextActive: {
    color: colors.bronze,
  },
  quickCard: {
    width: 100,
    padding: spacing.md,
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },
  quickCardActive: {
    borderColor: colors.bronze,
  },
  quickName: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  quickChapters: {
    ...typography.caption,
    color: colors.textMuted,
  },
  chaptersGrid: {
    gap: 8,
    paddingBottom: 20,
  },
  chapterBtn: {
    flex: 1,
    maxWidth: '20%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    margin: 2,
  },
  chapterBtnActive: {
    borderColor: colors.bronze,
    backgroundColor: 'rgba(176, 141, 87, 0.15)',
  },
  chapterNum: {
    ...typography.body,
    color: colors.textSecondary,
  },
  chapterNumActive: {
    color: colors.bronze,
    fontWeight: '700',
  },
});
