import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, SectionHeader } from '../../components';
import { bibleBooks } from '../../data/bibleBooks';
import { BibleTranslation } from '../../types';

const translations: BibleTranslation[] = ['KJV', 'ESV', 'NKJV', 'NASB'];

export const BibleScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedTranslation, setSelectedTranslation] = useState<BibleTranslation>('KJV');
  const [testament, setTestament] = useState<'old' | 'new'>('old');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = bibleBooks.filter(b =>
    b.testament === testament &&
    (searchQuery ? b.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  const openChapterPicker = (bookName: string, chapters: number) => {
    navigation.navigate('ChapterView', { book: bookName, chapter: 1 });
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SCRIPTURE</Text>
        <View style={styles.translationRow}>
          {translations.map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.translationBtn, selectedTranslation === t && styles.translationBtnActive]}
              onPress={() => setSelectedTranslation(t)}
            >
              <Text style={[styles.translationText, selectedTranslation === t && styles.translationTextActive]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Testament Toggle */}
      <View style={styles.testamentToggle}>
        <TouchableOpacity
          style={[styles.testamentBtn, testament === 'old' && styles.testamentBtnActive]}
          onPress={() => setTestament('old')}
        >
          <Text style={[styles.testamentText, testament === 'old' && styles.testamentTextActive]}>
            OLD TESTAMENT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.testamentBtn, testament === 'new' && styles.testamentBtnActive]}
          onPress={() => setTestament('new')}
        >
          <Text style={[styles.testamentText, testament === 'new' && styles.testamentTextActive]}>
            NEW TESTAMENT
          </Text>
        </TouchableOpacity>
      </View>

      {/* Book List */}
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => openChapterPicker(item.name, item.chapters)}
            activeOpacity={0.6}
          >
            <View style={styles.bookInfo}>
              <Text style={styles.bookName}>{item.name}</Text>
              <Text style={styles.bookChapters}>{item.chapters} chapters</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
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
    marginBottom: spacing.md,
  },
  translationRow: {
    flexDirection: 'row',
    gap: 8,
  },
  translationBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  translationBtnActive: {
    borderColor: colors.bronze,
    backgroundColor: 'rgba(176, 141, 87, 0.15)',
  },
  translationText: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  translationTextActive: {
    color: colors.bronze,
  },
  testamentToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    padding: 3,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  testamentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: borderRadius.sm - 2,
  },
  testamentBtnActive: {
    backgroundColor: colors.gunmetal,
  },
  testamentText: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  testamentTextActive: {
    color: colors.textPrimary,
  },
  listContent: {
    paddingBottom: 40,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  bookInfo: {
    flex: 1,
  },
  bookName: {
    ...typography.body,
    color: colors.textPrimary,
  },
  bookChapters: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
});
