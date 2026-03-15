import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer, Card, Divider } from '../../components';

const menuItems = [
  { icon: 'flash-outline', label: 'Battle Mode', screen: 'BattleMode', color: colors.mutedGold },
  { icon: 'people-outline', label: 'Brotherhood', screen: 'Brotherhood', color: colors.bronze },
  { icon: 'flag-outline', label: 'Missions', screen: 'Missions', color: colors.bronze },
  { icon: 'journal-outline', label: 'Prayer Journal', screen: 'PrayerJournal', color: colors.bronze },
  { icon: 'headset-outline', label: 'Scripture Audio', screen: 'Audio', color: colors.bronze },
  { icon: 'shield-outline', label: 'Vigil Command', screen: 'Premium', color: colors.mutedGold },
  { icon: 'settings-outline', label: 'Settings', screen: 'Settings', color: colors.textSecondary },
];

export const MoreScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>MORE</Text>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.screen}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.6}
              >
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </TouchableOpacity>
              {index < menuItems.length - 1 && <Divider style={{ marginVertical: 0 }} />}
            </React.Fragment>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Ionicons name="eye-outline" size={24} color={colors.textMuted} />
          <Text style={styles.appName}>VIGIL</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appTagline}>Scripture + Discipline + Brotherhood + Vigilance</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.md,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  menuList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: 4,
  },
  appName: {
    ...typography.label,
    color: colors.textMuted,
    marginTop: 8,
    letterSpacing: 4,
  },
  appVersion: {
    ...typography.caption,
    color: colors.textMuted,
  },
  appTagline: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
