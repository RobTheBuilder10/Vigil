import React from 'react';
import { View, StyleSheet, StatusBar, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
}

export const ScreenContainer: React.FC<Props> = ({ children, style, noPadding }) => (
  <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="light-content" backgroundColor={colors.background} />
    <View style={[styles.container, noPadding && styles.noPadding, style]}>
      {children}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  noPadding: {
    paddingHorizontal: 0,
  },
});
