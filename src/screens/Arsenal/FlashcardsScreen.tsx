import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, Button } from '../../components';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');

export const FlashcardsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { arsenalVerses } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const flipAnim = useRef(new Animated.Value(0)).current;

  const verses = arsenalVerses.length > 0 ? arsenalVerses : [];

  if (verses.length === 0) {
    return (
      <ScreenContainer>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>NO VERSES IN ARSENAL</Text>
          <Text style={styles.emptyText}>Add verses to begin training.</Text>
          <Button title="GO BACK" onPress={() => navigation.goBack()} variant="secondary" />
        </View>
      </ScreenContainer>
    );
  }

  const currentVerse = verses[currentIndex];
  const isComplete = currentIndex >= verses.length;

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: showAnswer ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setShowAnswer(!showAnswer);
  };

  const handleResponse = (knew: boolean) => {
    setScore(prev => ({
      correct: prev.correct + (knew ? 1 : 0),
      total: prev.total + 1,
    }));
    setShowAnswer(false);
    flipAnim.setValue(0);
    setCurrentIndex(prev => prev + 1);
  };

  if (isComplete) {
    const percentage = Math.round((score.correct / score.total) * 100);
    return (
      <ScreenContainer>
        <View style={styles.completeContainer}>
          <Ionicons name="shield-checkmark" size={64} color={colors.bronze} />
          <Text style={styles.completeTitle}>DRILL COMPLETE</Text>
          <Text style={styles.completeScore}>{percentage}%</Text>
          <Text style={styles.completeLabel}>
            {score.correct} / {score.total} RECALLED
          </Text>
          <Button
            title="DRILL AGAIN"
            onPress={() => {
              setCurrentIndex(0);
              setScore({ correct: 0, total: 0 });
              setShowAnswer(false);
            }}
            style={styles.retryBtn}
          />
          <Button
            title="DONE"
            onPress={() => navigation.goBack()}
            variant="ghost"
          />
        </View>
      </ScreenContainer>
    );
  }

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.progress}>
          {currentIndex + 1} / {verses.length}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={flipCard} activeOpacity={0.9}>
          {/* Front - Reference */}
          <Animated.View
            style={[
              styles.card,
              { transform: [{ rotateY: frontRotate }] },
              !showAnswer && styles.cardVisible,
            ]}
          >
            <Text style={styles.cardLabel}>WHAT VERSE IS THIS?</Text>
            <Text style={styles.cardReference}>
              {currentVerse.verse.book} {currentVerse.verse.chapter}:{currentVerse.verse.verse}
            </Text>
            <Text style={styles.tapHint}>TAP TO REVEAL</Text>
          </Animated.View>

          {/* Back - Text */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { transform: [{ rotateY: backRotate }] },
              showAnswer && styles.cardVisible,
            ]}
          >
            <Text style={styles.cardLabel}>
              {currentVerse.verse.book} {currentVerse.verse.chapter}:{currentVerse.verse.verse}
            </Text>
            <Text style={styles.cardText}>"{currentVerse.verse.text}"</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {showAnswer && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>DID YOU KNOW IT?</Text>
          <View style={styles.responseButtons}>
            <TouchableOpacity
              style={[styles.responseBtn, styles.noBtn]}
              onPress={() => handleResponse(false)}
            >
              <Ionicons name="close" size={24} color={colors.error} />
              <Text style={styles.noBtnText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.responseBtn, styles.yesBtn]}
              onPress={() => handleResponse(true)}
            >
              <Ionicons name="checkmark" size={24} color={colors.success} />
              <Text style={styles.yesBtnText}>YES</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  progress: {
    ...typography.label,
    color: colors.textSecondary,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width - 60,
    minHeight: 300,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    opacity: 0,
  },
  cardVisible: {
    position: 'relative',
    opacity: 1,
  },
  cardBack: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.bronze,
  },
  cardLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  cardReference: {
    ...typography.h2,
    color: colors.bronze,
    textAlign: 'center',
  },
  cardText: {
    ...typography.scripture,
    color: colors.textPrimary,
    textAlign: 'center',
    fontSize: 18,
  },
  tapHint: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginTop: spacing.xl,
  },
  responseContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  responseLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  responseButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  responseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  noBtn: {
    borderColor: colors.error,
    backgroundColor: 'rgba(139, 37, 0, 0.1)',
  },
  yesBtn: {
    borderColor: colors.success,
    backgroundColor: 'rgba(46, 90, 46, 0.1)',
  },
  noBtnText: {
    ...typography.button,
    color: colors.error,
  },
  yesBtnText: {
    ...typography.button,
    color: colors.success,
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
  },
  emptyText: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  completeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  completeTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  completeScore: {
    ...typography.number,
    color: colors.bronze,
    fontSize: 64,
  },
  completeLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
  retryBtn: {
    marginTop: spacing.lg,
    width: 200,
  },
});
