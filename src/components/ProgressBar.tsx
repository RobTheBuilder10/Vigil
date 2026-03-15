import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius } from '../theme';

interface Props {
  progress: number; // 0-1
  height?: number;
  color?: string;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<Props> = ({
  progress,
  height = 4,
  color = colors.bronze,
  style,
}) => (
  <View style={[styles.track, { height }, style]}>
    <View
      style={[
        styles.fill,
        {
          height,
          width: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
          backgroundColor: color,
        },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: colors.gunmetal,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: borderRadius.round,
  },
});
