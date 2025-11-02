import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

type SettingRowProps = {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const SettingRow: React.FC<SettingRowProps> = ({
  title,
  subtitle,
  value,
  onValueChange,
}) => (
  <View style={styles.settingRow}>
    <View style={{ flex: 1, paddingRight: SIZES.padding }}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingSubtitle}>{subtitle}</Text>
    </View>
    <Switch
      trackColor={{ false: COLORS.disabled, true: COLORS.primary }}
      thumbColor={COLORS.white}
      onValueChange={onValueChange}
      value={value}
    />
  </View>
);

const SettingsScreen: React.FC = () => {
  const [isAnonymized, setIsAnonymized] = useState(true);
  const [isTeamSync, setIsTeamSync] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Settings & Privacy</Text>
        <Text style={styles.headerSubtitle}>
          Configure your protection preferences
        </Text>

        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Privacy</Text>
          <SettingRow
            title="Share Anonymized Threat Fingerprints"
            subtitle="Help improve Safebond by sharing anonymized threat patterns. No raw data leaves your device."
            value={isAnonymized}
            onValueChange={setIsAnonymized}
          />
        </View>

        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Protection Mode</Text>
          <SettingRow
            title="Family Mode / Team Sync"
            subtitle="Enable synchronized protection across family members or team members."
            value={isTeamSync}
            onValueChange={setIsTeamSync}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SIZES.padding,
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  headerSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.padding,
  },
  settingsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
    paddingBottom: SIZES.base,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SIZES.padding,
    borderTopWidth: 1,
    borderColor: '#2a3038',
  },
  settingTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default SettingsScreen;
