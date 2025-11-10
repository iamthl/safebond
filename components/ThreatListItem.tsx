// components/ThreatListItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react-native';
import { DetectedThreat, RiskLevel } from '../types/threats';
import { COLORS, SIZES } from '../constants/theme';

type Props = {
  threat: DetectedThreat;
};

// Helper to get color and icon based on risk
const getRiskAppearance = (riskLevel: RiskLevel) => {
  switch (riskLevel) {
    case 'High':
      // Using hardcoded colors for risk, or you can add to your theme
      return { color: '#ef4444', icon: <AlertTriangle color="#ef4444" size={24} /> };
    case 'Medium':
      return { color: '#f59e0b', icon: <ShieldAlert color="#f59e0b" size={24} /> };
    case 'Low':
      return { color: COLORS.connected, icon: <ShieldCheck color={COLORS.connected} size={24} /> };
    default:
      return { color: COLORS.textSecondary, icon: <ShieldCheck color={COLORS.textSecondary} size={24} /> };
  }
};

export default function ThreatListItem({ threat }: Props) {
  const { color, icon } = getRiskAppearance(threat.riskLevel);

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[styles.riskText, { color }]}>{threat.riskLevel} Risk</Text>
          <Text style={styles.timestamp}>{threat.timestamp}</Text>
        </View>
        <Text style={styles.sender}>
          From: {threat.sender} ({threat.platform})
        </Text>
        <Text style={styles.message} numberOfLines={2}>
          {threat.message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: SIZES.padding,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  riskText: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: SIZES.body - 2, // Slightly smaller
    color: COLORS.textSecondary,
  },
  sender: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: SIZES.base / 2,
  },
  message: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});