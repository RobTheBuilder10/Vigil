import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  // Headers
  h1: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
  h4: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Body
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },

  // Scripture
  scripture: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 32,
    fontStyle: 'italic',
  },
  scriptureReference: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // Labels
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // Numbers
  number: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: -1,
  },
  numberSmall: {
    fontSize: 24,
    fontWeight: '700',
  },

  // Caption
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },

  // Button
  button: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
};
