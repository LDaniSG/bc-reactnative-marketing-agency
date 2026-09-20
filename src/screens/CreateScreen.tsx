import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, StatusBar, ScrollView, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { CreateCampaignScreenProps } from '../navigation/types';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { useCreateCampaign } from '../hooks/useItems';

export function CreateScreen({ navigation }: CreateCampaignScreenProps): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [industry, setIndustry] = useState('');
  const [channel, setChannel] = useState<'Meta Ads' | 'Google Search' | 'LinkedIn Ads' | 'TikTok Ads' | 'Email Marketing'>('Meta Ads');
  const [budget, setBudget] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const createMutation = useCreateCampaign();

  const handleSubmit = () => {
    if (!title.trim() || !clientName.trim()) return;
    createMutation.mutate(
      {
        title: title.trim(),
        clientName: clientName.trim(),
        industry: industry.trim() || 'General Business',
        channel,
        budget: Number(budget) || 10000,
        subtitle: subtitle.trim() || 'Custom digital marketing acquisition strategy',
      },
      {
        onSuccess: () => navigation.goBack(),
      }
    );
  };

  const isPending = createMutation.isPending;
  const canSubmit = title.trim().length > 0 && clientName.trim().length > 0 && !isPending;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.sectionLabel}>Client & Campaign Details</Text>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Campaign Title *</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g., Q4 Enterprise Lead Gen" placeholderTextColor={COLORS.textMuted} />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Client Name *</Text>
            <TextInput style={styles.input} value={clientName} onChangeText={setClientName} placeholder="e.g., Apex Global Corp" placeholderTextColor={COLORS.textMuted} />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Industry</Text>
            <TextInput style={styles.input} value={industry} onChangeText={setIndustry} placeholder="e.g., E-Commerce / SaaS / Healthcare" placeholderTextColor={COLORS.textMuted} />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Budget (USD)</Text>
            <TextInput style={styles.input} value={budget} onChangeText={setBudget} placeholder="e.g., 15000" keyboardType="numeric" placeholderTextColor={COLORS.textMuted} />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Strategy Overview</Text>
            <TextInput style={[styles.input, styles.multiline]} value={subtitle} onChangeText={setSubtitle} placeholder="Describe campaign goals and target audience..." placeholderTextColor={COLORS.textMuted} multiline numberOfLines={3} textAlignVertical="top" />
          </View>
          <Pressable style={[styles.button, !canSubmit && styles.buttonDisabled]} onPress={handleSubmit} disabled={!canSubmit}>
            {isPending ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={styles.buttonText}>Publish Campaign</Text>}
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md },
  sectionLabel: { fontSize: 12, fontWeight: '800', color: COLORS.primary, letterSpacing: 1 },
  field: { gap: SPACING.xs },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  input: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.sm, padding: SPACING.md, color: COLORS.textPrimary, fontSize: 14 },
  multiline: { minHeight: 80 },
  button: { backgroundColor: COLORS.primary, padding: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center', marginTop: SPACING.md },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  cancelButton: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { color: COLORS.textMuted, fontSize: 14 },
});
