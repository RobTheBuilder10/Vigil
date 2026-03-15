import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, Card, Button, SectionHeader, Divider } from '../../components';
import { useApp } from '../../context/AppContext';
import { PrayerEntry } from '../../types';

export const PrayerJournalScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { prayerEntries, addPrayerEntry, markPrayerAnswered, updateTodayVigil } = useApp();
  const [showCompose, setShowCompose] = useState(false);
  const [content, setContent] = useState('');
  const [scripture, setScripture] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'answered'>('all');

  const filteredEntries = prayerEntries.filter(e => {
    if (filter === 'active') return !e.answered;
    if (filter === 'answered') return e.answered;
    return true;
  });

  const handleSubmit = () => {
    if (!content.trim()) return;
    const entry: PrayerEntry = {
      id: Date.now().toString(),
      content: content.trim(),
      scripture: scripture.trim() || undefined,
      createdAt: new Date().toISOString(),
      answered: false,
    };
    addPrayerEntry(entry);
    updateTodayVigil('prayer', true);
    setContent('');
    setScripture('');
    setShowCompose(false);
  };

  const handleMarkAnswered = (entry: PrayerEntry) => {
    Alert.alert(
      'Prayer Answered',
      'Mark this prayer as answered?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => markPrayerAnswered(entry.id) },
      ]
    );
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>PRAYER JOURNAL</Text>
          <Text style={styles.subtitle}>TACTICAL NOTEBOOK</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowCompose(!showCompose)}
        >
          <Ionicons name={showCompose ? 'close' : 'add'} size={22} color={colors.bronze} />
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{prayerEntries.length}</Text>
          <Text style={styles.statLabel}>TOTAL</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{prayerEntries.filter(p => !p.answered).length}</Text>
          <Text style={styles.statLabel}>ACTIVE</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{prayerEntries.filter(p => p.answered).length}</Text>
          <Text style={styles.statLabel}>ANSWERED</Text>
        </View>
      </View>

      {/* Compose */}
      {showCompose && (
        <Card style={styles.composeCard}>
          <Text style={styles.composeTitle}>NEW PRAYER</Text>
          <TextInput
            style={styles.input}
            placeholder="Write your prayer..."
            placeholderTextColor={colors.textMuted}
            value={content}
            onChangeText={setContent}
            multiline
          />
          <TextInput
            style={[styles.input, styles.scriptureInput]}
            placeholder="Attach scripture (optional)"
            placeholderTextColor={colors.textMuted}
            value={scripture}
            onChangeText={setScripture}
          />
          <Button title="LOG PRAYER" onPress={handleSubmit} fullWidth disabled={!content.trim()} />
        </Card>
      )}

      {/* Filter */}
      <View style={styles.filterRow}>
        {(['all', 'active', 'answered'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Prayer List */}
      {filteredEntries.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="journal-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>NO PRAYERS YET</Text>
          <Text style={styles.emptyText}>Begin logging your prayers. Watch God work.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEntries}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={item.answered ? { ...styles.entryCard, ...styles.entryCardAnswered } : styles.entryCard}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryDate}>{formatDate(item.createdAt)}</Text>
                {item.answered && (
                  <View style={styles.answeredBadge}>
                    <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                    <Text style={styles.answeredText}>ANSWERED</Text>
                  </View>
                )}
              </View>
              <Text style={styles.entryContent}>{item.content}</Text>
              {item.scripture && (
                <View style={styles.entryScripture}>
                  <Ionicons name="book-outline" size={14} color={colors.bronze} />
                  <Text style={styles.entryScriptureText}>{item.scripture}</Text>
                </View>
              )}
              {!item.answered && (
                <TouchableOpacity
                  style={styles.markAnsweredBtn}
                  onPress={() => handleMarkAnswered(item)}
                >
                  <Text style={styles.markAnsweredText}>MARK AS ANSWERED</Text>
                </TouchableOpacity>
              )}
              {item.answered && item.answeredAt && (
                <Text style={styles.answeredDate}>
                  Answered {formatDate(item.answeredAt)}
                </Text>
              )}
            </Card>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
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
  composeCard: {
    marginBottom: spacing.md,
    borderColor: colors.bronze,
    gap: spacing.md,
  },
  composeTitle: {
    ...typography.label,
    color: colors.textSecondary,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  scriptureInput: {
    minHeight: 44,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterBtnActive: {
    borderColor: colors.bronze,
    backgroundColor: 'rgba(176, 141, 87, 0.15)',
  },
  filterText: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  filterTextActive: {
    color: colors.bronze,
  },
  listContent: {
    gap: 10,
    paddingBottom: 40,
  },
  entryCard: {
    gap: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.bronze,
  },
  entryCardAnswered: {
    borderLeftColor: colors.success,
    opacity: 0.8,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDate: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  answeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  answeredText: {
    ...typography.labelSmall,
    color: colors.success,
    fontSize: 9,
  },
  entryContent: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  entryScripture: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: spacing.xs,
  },
  entryScriptureText: {
    ...typography.bodySmall,
    color: colors.textAccent,
    fontStyle: 'italic',
  },
  markAnsweredBtn: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  markAnsweredText: {
    ...typography.labelSmall,
    color: colors.bronze,
    textAlign: 'center',
  },
  answeredDate: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});
