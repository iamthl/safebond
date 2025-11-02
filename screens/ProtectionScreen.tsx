import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import {
  Smartphone,
  MessageSquare,
  Send,
  Zap,
  LucideIcon,
} from 'lucide-react-native';

type Platform = {
  name: string;
  risk: number;
  connected: boolean;
  icon: LucideIcon;
};

const platforms: Platform[] = [
  { name: 'WhatsApp', risk: 1, connected: true, icon: Smartphone },
  { name: 'Messenger', risk: 21, connected: true, icon: MessageSquare },
  { name: 'Telegram', risk: 21, connected: true, icon: Send },
  { name: 'Zalo', risk: 17, connected: true, icon: Zap },
  { name: 'SMS', risk: 21, connected: true, icon: MessageSquare },
];

type CardProps = {
  platform: Platform;
};

const ProtectionCard: React.FC<CardProps> = ({ platform }) => {
  const Icon = platform.icon;
  return (
    <View style={styles.platformCard}>
      <View style={styles.cardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon color={COLORS.textSecondary} size={20} style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>{platform.name}</Text>
        </View>
        <View style={styles.connectedBadge}>
          <Text style={styles.connectedText}>✓ Connected</Text>
        </View>
      </View>
      <Text style={styles.cardSubtitle}>{platform.name} monitoring active</Text>

      <View style={{ marginTop: SIZES.padding }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <Text style={styles.riskLabel}>Risk Level</Text>
          <Text style={styles.riskPercent}>{platform.risk}%</Text>
        </View>
        <View style={styles.riskBarContainer}>
          <View
            style={[
              styles.riskBarFill,
              {
                width: `${platform.risk}%`,
                backgroundColor:
                  platform.risk > 20 ? COLORS.riskMedium : COLORS.connected,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.cardButtonRow}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: COLORS.disabled }]}
        >
          <Text style={styles.secondaryButtonText}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProtectionScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Multi-Platform Protection Active</Text>
        <Text style={styles.headerSubtitle}>
          Real-time monitoring across all connected platforms
        </Text>
        <View style={styles.cardGrid}>
          {platforms.map((platform) => (
            <ProtectionCard key={platform.name} platform={platform} />
          ))}
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
    paddingBottom: 100, // For tab bar
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
  cardGrid: {
    width: '100%',
  },
  platformCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SIZES.padding,
    width: '100%',
    marginBottom: SIZES.padding,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
  },
  connectedBadge: {
    backgroundColor: 'rgba(48, 209, 88, 0.1)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  connectedText: {
    color: COLORS.connected,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  riskLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  riskBarContainer: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  riskBarFill: {
    height: '100%',
  },
  riskPercent: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardButtonRow: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
    marginHorizontal: -4,
  },
  secondaryButton: {
    backgroundColor: '#373E47',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProtectionScreen;
