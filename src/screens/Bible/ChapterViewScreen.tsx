import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components';
import { sampleVerses } from '../../data/sampleVerses';
import { bibleBooks } from '../../data/bibleBooks';
import { useApp } from '../../context/AppContext';
import { ArsenalVerse, BibleVerse } from '../../types';

export const ChapterViewScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { book, chapter } = route.params;
  const { arsenalVerses, addArsenalVerse, removeArsenalVerse, updateTodayVigil } = useApp();
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [distractionFree, setDistractionFree] = useState(false);

  const chapterKey = `${book}-${chapter}`;
  const verses = sampleVerses[chapterKey] || generatePlaceholderVerses(book, chapter);
  const bookData = bibleBooks.find(b => b.name === book);
  const maxChapter = bookData?.chapters || 1;

  // Mark scripture reading
  React.useEffect(() => {
    updateTodayVigil('scriptureReading', true);
  }, []);

  const isVerseInArsenal = (verse: BibleVerse) =>
    arsenalVerses.some(a =>
      a.verse.book === verse.book &&
      a.verse.chapter === verse.chapter &&
      a.verse.verse === verse.verse
    );

  const toggleArsenal = (verse: BibleVerse) => {
    const existing = arsenalVerses.find(a =>
      a.verse.book === verse.book &&
      a.verse.chapter === verse.chapter &&
      a.verse.verse === verse.verse
    );
    if (existing) {
      removeArsenalVerse(existing.id);
    } else {
      const newVerse: ArsenalVerse = {
        id: `${verse.book}-${verse.chapter}-${verse.verse}-${Date.now()}`,
        verse,
        category: 'general',
        savedAt: new Date().toISOString(),
        reviewCount: 0,
        mastery: 0,
      };
      addArsenalVerse(newVerse);
    }
  };

  const goToChapter = (ch: number) => {
    if (ch >= 1 && ch <= maxChapter) {
      navigation.replace('ChapterView', { book, chapter: ch });
    }
  };

  return (
    <ScreenContainer noPadding={distractionFree}>
      {/* Header */}
      {!distractionFree && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.bookTitle}>{book}</Text>
            <Text style={styles.chapterTitle}>CHAPTER {chapter}</Text>
          </View>
          <TouchableOpacity onPress={() => setDistractionFree(true)} style={styles.modeBtn}>
            <Ionicons name="expand-outline" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      )}

      {distractionFree && (
        <TouchableOpacity
          style={styles.exitDistraction}
          onPress={() => setDistractionFree(false)}
        >
          <Ionicons name="contract-outline" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      )}

      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.contentContainer,
          distractionFree && styles.distractionFreeContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {verses.map((verse) => (
          <TouchableOpacity
            key={verse.verse}
            onPress={() => setSelectedVerse(selectedVerse === verse.verse ? null : verse.verse)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.verseContainer,
                selectedVerse === verse.verse && styles.verseSelected,
              ]}
            >
              <Text style={styles.verseNumber}>{verse.verse}</Text>
              <Text style={[styles.verseText, distractionFree && styles.verseTextLarge]}>
                {verse.text}
              </Text>
            </View>
            {selectedVerse === verse.verse && (
              <View style={styles.verseActions}>
                <TouchableOpacity
                  style={styles.verseAction}
                  onPress={() => toggleArsenal(verse)}
                >
                  <Ionicons
                    name={isVerseInArsenal(verse) ? 'shield' : 'shield-outline'}
                    size={18}
                    color={isVerseInArsenal(verse) ? colors.bronze : colors.textSecondary}
                  />
                  <Text style={styles.verseActionText}>
                    {isVerseInArsenal(verse) ? 'IN ARSENAL' : 'ADD TO ARSENAL'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.verseAction}>
                  <Ionicons name="bookmark-outline" size={18} color={colors.textSecondary} />
                  <Text style={styles.verseActionText}>BOOKMARK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.verseAction}>
                  <Ionicons name="share-outline" size={18} color={colors.textSecondary} />
                  <Text style={styles.verseActionText}>SHARE</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Chapter Navigation */}
        <View style={styles.chapterNav}>
          {chapter > 1 && (
            <TouchableOpacity style={styles.chapterNavBtn} onPress={() => goToChapter(chapter - 1)}>
              <Ionicons name="chevron-back" size={18} color={colors.bronze} />
              <Text style={styles.chapterNavText}>CHAPTER {chapter - 1}</Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          {chapter < maxChapter && (
            <TouchableOpacity style={styles.chapterNavBtn} onPress={() => goToChapter(chapter + 1)}>
              <Text style={styles.chapterNavText}>CHAPTER {chapter + 1}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.bronze} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

function generatePlaceholderVerses(book: string, chapter: number) {
  const count = Math.floor(Math.random() * 15) + 10;
  return Array.from({ length: count }, (_, i) => ({
    book,
    chapter,
    verse: i + 1,
    text: `And the word of the Lord came forth, establishing truth in the hearts of the faithful. For in discipline there is strength, and in perseverance, the promise of glory.`,
    translation: 'KJV' as const,
  }));
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  bookTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  chapterTitle: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  modeBtn: {
    padding: 4,
  },
  exitDistraction: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: spacing.lg,
    paddingBottom: 60,
  },
  distractionFreeContent: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  verseContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: borderRadius.sm,
  },
  verseSelected: {
    backgroundColor: 'rgba(176, 141, 87, 0.08)',
  },
  verseNumber: {
    ...typography.caption,
    color: colors.bronze,
    width: 28,
    paddingTop: 4,
    fontWeight: '700',
  },
  verseText: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 30,
  },
  verseTextLarge: {
    fontSize: 22,
    lineHeight: 36,
  },
  verseActions: {
    flexDirection: 'row',
    paddingLeft: 28,
    paddingVertical: 8,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 4,
  },
  verseAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verseActionText: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    fontSize: 9,
  },
  chapterNav: {
    flexDirection: 'row',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  chapterNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  chapterNavText: {
    ...typography.labelSmall,
    color: colors.bronze,
  },
});
