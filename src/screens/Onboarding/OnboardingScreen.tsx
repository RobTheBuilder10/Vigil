import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components';
import { useApp } from '../../context/AppContext';
import { WatchingOverOption } from '../../types';

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: 'eye-outline' as const,
    title: 'VIGIL',
    subtitle: 'STAND WATCH',
    description: 'A spiritual command center for men who refuse to be passive in their faith.',
  },
  {
    icon: 'book-outline' as const,
    title: 'SCRIPTURE',
    subtitle: 'ARM YOURSELF',
    description: 'Read, memorize, and wield the Word of God as your primary weapon.',
  },
  {
    icon: 'flame-outline' as const,
    title: 'DISCIPLINE',
    subtitle: 'FORGE CONSISTENCY',
    description: 'Build unbreakable daily habits through The Vigil streak system.',
  },
  {
    icon: 'people-outline' as const,
    title: 'BROTHERHOOD',
    subtitle: 'STAND TOGETHER',
    description: 'No man stands alone. Find accountability and strength in community.',
  },
];

const watchOptions: { id: WatchingOverOption; label: string; icon: string }[] = [
  { id: 'family', label: 'Family', icon: 'home-outline' },
  { id: 'faith', label: 'Faith', icon: 'book-outline' },
  { id: 'discipline', label: 'Discipline', icon: 'fitness-outline' },
  { id: 'leadership', label: 'Leadership', icon: 'flag-outline' },
  { id: 'purpose', label: 'Purpose', icon: 'compass-outline' },
  { id: 'overcoming_temptation', label: 'Overcoming Temptation', icon: 'shield-outline' },
];

export const OnboardingScreen: React.FC = () => {
  const { completeOnboarding } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<WatchingOverOption[]>([]);
  const [showWatchQuestion, setShowWatchQuestion] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlide + 1 });
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowWatchQuestion(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleOption = (id: WatchingOverOption) => {
    setSelectedOptions(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    if (selectedOptions.length > 0) {
      completeOnboarding(selectedOptions);
    }
  };

  if (showWatchQuestion) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.watchContainer}>
          <Ionicons name="eye-outline" size={48} color={colors.bronze} />
          <Text style={styles.watchTitle}>WHAT ARE YOU{'\n'}STANDING WATCH OVER?</Text>
          <Text style={styles.watchSubtitle}>Select all that apply</Text>

          <View style={styles.optionsGrid}>
            {watchOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedOptions.includes(option.id) && styles.optionCardSelected,
                ]}
                onPress={() => toggleOption(option.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={selectedOptions.includes(option.id) ? colors.bronze : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.optionLabel,
                    selectedOptions.includes(option.id) && styles.optionLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title="BEGIN YOUR VIGIL"
            onPress={handleComplete}
            disabled={selectedOptions.length === 0}
            fullWidth
            size="large"
            style={styles.beginButton}
          />
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={64} color={colors.bronze} />
            </View>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
            <View style={styles.divider} />
            <Text style={styles.slideDescription}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentSlide && styles.dotActive]}
            />
          ))}
        </View>

        <Button
          title={currentSlide === slides.length - 1 ? 'CONTINUE' : 'NEXT'}
          onPress={handleNext}
          size="large"
          fullWidth
        />

        {currentSlide < slides.length - 1 && (
          <TouchableOpacity
            onPress={() => {
              setShowWatchQuestion(true);
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }).start();
            }}
            style={styles.skipBtn}
          >
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.bronze,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  slideTitle: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
    fontSize: 36,
    letterSpacing: 6,
  },
  slideSubtitle: {
    ...typography.label,
    color: colors.bronze,
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 4,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: colors.bronze,
    marginVertical: 24,
  },
  slideDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gunmetal,
  },
  dotActive: {
    backgroundColor: colors.bronze,
    width: 24,
  },
  skipBtn: {
    marginTop: 16,
    padding: 8,
  },
  skipText: {
    ...typography.labelSmall,
    color: colors.textMuted,
  },
  // Watch question styles
  watchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  watchTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 32,
  },
  watchSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 32,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  optionCard: {
    width: (width - 84) / 2,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    gap: 8,
  },
  optionCardSelected: {
    borderColor: colors.bronze,
    backgroundColor: 'rgba(176, 141, 87, 0.1)',
  },
  optionLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: colors.bronze,
  },
  beginButton: {
    marginTop: 8,
  },
});
