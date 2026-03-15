import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import { BibleVerse } from '../types';

interface Props {
  verse: BibleVerse;
  onSave?: () => void;
  onPress?: () => void;
  saved?: boolean;
  compact?: boolean;
}

export const VerseCard: React.FC<Props> = ({ verse, onSave, onPress, saved, compact }) => {
  const content = (
    <View style={[styles.container, compact && styles.compact]}>
      <Text style={[styles.text, compact && styles.textCompact]}>"{verse.text}"</Text>
      <View style={styles.footer}>
        <Text style={styles.reference}>
          {verse.book} {verse.chapter}:{verse.verse}
        </Text>
        <View style={styles.actions}>
          <Text style={styles.translation}>{verse.translation}</Text>
          {onSave && (
            <TouchableOpacity onPress={onSave} style={styles.saveBtn}>
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={18}
                color={saved ? colors.bronze : colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 3,
    borderLeftColor: colors.bronze,
  },
  compact: {
    padding: spacing.md,
  },
  text: {
    ...typography.scripture,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  textCompact: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reference: {
    ...typography.scriptureReference,
    color: colors.textAccent,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  translation: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  saveBtn: {
    padding: 4,
  },
});
