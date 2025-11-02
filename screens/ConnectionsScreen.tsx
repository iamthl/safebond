import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const connections: string[] = ['WhatsApp', 'Messenger', 'Telegram', 'Zalo'];

const ConnectionsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Connection Manager</Text>
        <Text style={styles.headerSubtitle}>
          Manage API tokens and platform integrations
        </Text>
        {connections.map((platform) => (
          <View key={platform} style={styles.connectionCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{platform}</Text>
              <View style={styles.connectedBadge}>
                <Text style={styles.connectedText}>✓ Connected</Text>
              </View>
            </View>
            <Text style={styles.tokenText}>
              {platform.substring(0, 2).toLowerCase()}_***_***_***
            </Text>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>
                Request Partnership Access
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
  connectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SIZES.padding,
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
  tokenText: {
    color: COLORS.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', 
    fontSize: 14,
    marginTop: SIZES.padding,
  },
  secondaryButton: {
    backgroundColor: '#373E47',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: SIZES.padding,
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ConnectionsScreen;
