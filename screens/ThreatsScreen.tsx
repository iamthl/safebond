// screens/ThreatsScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

// Import all our components and data
import { DetectedThreat } from '../types/threats';
import { MOCK_THREATS } from '../constants/mockData';
import ThreatListItem from '../components/ThreatListItem';
import ThreatLineChart from '../components/ThreatLineChart'; // Import the new chart-kit version

const filters: string[] = ['All', 'Calls', 'Messages', 'High risk'];

const ThreatsScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [threats, setThreats] = useState<DetectedThreat[]>(MOCK_THREATS);

  // TODO: Add filtering logic
  // const filteredThreats = threats.filter(...)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Threat Center</Text>
        <Text style={styles.headerSubtitle}>
          Monitor and analyze detected threats in real-time
        </Text>

        {/* --- 1. CHART (Data is all platforms, grouped by time) --- */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>
            Scams Over Time
          </Text>
          {/* This now renders our new, beautiful chart */}
          <ThreatLineChart threats={threats} />
        </View>

        {/* --- 2. RECENT ALERTS --- */}
        <Text style={styles.listTitle}>Recent Alerts</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && { backgroundColor: COLORS.primary },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === filter && { color: COLORS.background },
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- 3. THREAT LIST --- */}
        <View style={styles.listContainer}>
          {threats.map((threat) => (
            <ThreatListItem key={threat.id} threat={threat} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLES ---
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
  chartCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16, // Match chart's internal radius
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  listTitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding,
    marginTop: SIZES.base,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  filterButton: {
    backgroundColor: COLORS.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  listContainer: {
    // This container just holds the list items
  },
});

export default ThreatsScreen;