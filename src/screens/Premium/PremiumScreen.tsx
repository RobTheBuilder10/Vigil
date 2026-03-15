import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, Card, Button, Divider } from '../../components';

const FEATURES = [
  { icon: 'search-outline', title: 'Advanced Scripture Search', desc: 'Deep search across all translations' },
  { icon: 'headset-outline', title: 'Full Audio Bible Library', desc: 'Professional narration, all 66 books' },
  { icon: 'flag-outline', title: 'Exclusive Missions', desc: 'Premium guided challenges and devotionals' },
  { icon: 'flash-outline', title: 'Scripture Memory Trainer', desc: 'Advanced spaced repetition system' },
  { icon: 'school-outline', title: 'Leadership Devotionals', desc: 'Deep study for men who lead' },
  { icon: 'analytics-outline', title: 'Brotherhood Analytics', desc: 'Group insights for brotherhood leaders' },
  { icon: 'document-text-outline', title: 'Long Form Teachings', desc: 'In-depth studies and commentary' },
  { icon: 'cloud-download-outline', title: 'Offline Audio', desc: 'Download chapters for offline listening' },
];

export const PremiumScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.iconRing}>
            <Ionicons name="shield" size={48} color={colors.mutedGold} />
          </View>
          <Text style={styles.heroTitle}>VIGIL COMMAND</Text>
          <Text style={styles.heroSubtitle}>PREMIUM ACCESS</Text>
          <View style={styles.heroDivider} />
          <Text style={styles.heroDesc}>
            Unlock the full arsenal. Advanced tools for men who are serious about spiritual growth.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon as any} size={22} color={colors.bronze} />
              </View>
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <Divider style={{ marginVertical: spacing.lg }} />

        {/* Pricing */}
        <View style={styles.pricingSection}>
          <Text style={styles.pricingTitle}>CHOOSE YOUR PLAN</Text>

          <TouchableOpacity style={styles.planCard}>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>BEST VALUE</Text>
            </View>
            <Text style={styles.planName}>ANNUAL</Text>
            <Text style={styles.planPrice}>$49.99</Text>
            <Text style={styles.planPeriod}>per year</Text>
            <Text style={styles.planSave}>Save 58%</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.planCard, styles.planCardSecondary]}>
            <Text style={styles.planName}>MONTHLY</Text>
            <Text style={styles.planPrice}>$9.99</Text>
            <Text style={styles.planPeriod}>per month</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="ACTIVATE VIGIL COMMAND"
          onPress={() => {}}
          fullWidth
          size="large"
          style={styles.activateBtn}
        />

        <Text style={styles.terms}>
          Cancel anytime. Subscription auto-renews.
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: spacing.sm,
  },
  closeBtn: {
    padding: 4,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  iconRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.mutedGold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.06)',
    marginBottom: spacing.lg,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.mutedGold,
    letterSpacing: 4,
  },
  heroSubtitle: {
    ...typography.label,
    color: colors.textMuted,
    marginTop: 4,
  },
  heroDivider: {
    width: 40,
    height: 2,
    backgroundColor: colors.mutedGold,
    marginVertical: spacing.lg,
  },
  heroDesc: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresSection: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(176, 141, 87, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  featureDesc: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  pricingSection: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  pricingTitle: {
    ...typography.label,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.bronze,
    padding: spacing.lg,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  planCardSecondary: {
    borderColor: colors.border,
    borderWidth: 1,
  },
  planBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.bronze,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderBottomLeftRadius: borderRadius.sm,
  },
  planBadgeText: {
    ...typography.labelSmall,
    color: colors.black,
    fontSize: 9,
  },
  planName: {
    ...typography.label,
    color: colors.textSecondary,
  },
  planPrice: {
    ...typography.number,
    color: colors.textPrimary,
    fontSize: 36,
    marginTop: 4,
  },
  planPeriod: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  planSave: {
    ...typography.labelSmall,
    color: colors.bronze,
    marginTop: 4,
  },
  activateBtn: {
    backgroundColor: colors.mutedGold,
  },
  terms: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
