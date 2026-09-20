export const COLORS = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  accent: '#38bdf8',
  background: '#0f172a',
  surface: '#1e293b',
  card: '#1e293b',
  cardBorder: '#334155',
  text: '#f8fafc',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  border: '#334155',
  inputBg: '#0f172a',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  activeBadge: '#22c55e20',
};

export const TYPOGRAPHY = {
  title: { fontSize: 24, fontWeight: '800' as const, color: COLORS.textPrimary },
  subtitle: { fontSize: 14, fontWeight: '500' as const, color: COLORS.textMuted },
  body: { fontSize: 14, fontWeight: '400' as const, color: COLORS.textSecondary },
  caption: { fontSize: 12, fontWeight: '600' as const, color: COLORS.textMuted },
  label: { fontSize: 12, fontWeight: '700' as const, color: COLORS.primary },
};

export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 };
export const RADIUS = { sm: 8, md: 12, lg: 16, full: 9999 };
