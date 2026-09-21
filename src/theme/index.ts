import type { TextStyle } from 'react-native';

export const COLORS = {
  primary: '#ef6a5b',
  primaryDark: '#d95548',
  primaryLight: '#ff9b85',
  accent: '#168c8c',
  accentSecondary: '#f4b942',
  background: '#f5f2ec',
  surface: '#fffdf9',
  card: '#ffffff',
  cardBorder: '#e6e0d7',
  textPrimary: '#172b3a',
  textSecondary: '#536573',
  textMuted: '#81909a',
  border: '#e6e0d7',
  inputBg: '#f8f6f1',
  success: '#168c8c',
  warning: '#c88618',
  error: '#c94d4d',
  activeBadge: '#168c8c18',
  pausedBadge: '#c8861818',
  completedBadge: '#168c8c18',
  draftBadge: '#81909a18',
};

export const TYPOGRAPHY = {
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted },
  body: { fontSize: 14, fontWeight: '400', color: COLORS.textSecondary, lineHeight: 21 },
  caption: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted },
  label: { fontSize: 11, fontWeight: '800', color: COLORS.accent },
} satisfies Record<string, TextStyle>;

export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 };
export const RADIUS = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, full: 9999 };
