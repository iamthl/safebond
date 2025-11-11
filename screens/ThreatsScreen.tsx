// screens/ThreatsScreen.tsx
import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  NativeEventEmitter, // <-- Import NativeEventEmitter
  NativeModules,      // <-- Import NativeModules
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

import { DetectedThreat } from '../types/threats';
// import { MOCK_THREATS } from '../constants/mockData'; // <-- No longer needed
import ThreatListItem from '../components/ThreatListItem';
import ThreatLineChart from '../components/ThreatLineChart';

// --- IMPORTANT ---
// This assumes you have created a native module named "ThreatDetectorModule"
// The name must match what you create in your native (Swift/Kotlin) code.
const { ThreatDetectorModule } = NativeModules;
const threatEventEmitter = new NativeEventEmitter(ThreatDetectorModule);
// ---------------

const filters: string[] = ['All', 'Calls', 'Messages', 'High risk'];

const ThreatsScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // 1. Initialize state with an empty array, not MOCK_THREATS
  const [threats, setThreats] = useState<DetectedThreat[]>([]);

  // 2. Add a useEffect hook to listen for native events
  useEffect(() => {
    // --- Suggestion: Load saved threats from storage here ---
    // e.g., loadThreatsFromStorage().then(savedThreats => setThreats(savedThreats));

    // 3. Subscribe to the "onThreatDetected" event from your native code
    const subscription = threatEventEmitter.addListener(
      'onThreatDetected',
      (newThreat: DetectedThreat) => {
        console.log('New threat detected:', newThreat);
        
        // 4. Add the new threat to the top of the list
        setThreats(prevThreats => [newThreat, ...prevThreats]);

        // --- Suggestion: Save the new threat to storage here ---
        // e.g., saveThreatToStorage(newThreat);
      }
    );

    // 5. Clean up the listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []); // The empty array [] means this runs once when the component mounts

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
          <Text style={styles.cardTitle}>Threats Over Time</Text>
          <ThreatLineChart threats={threats} /> {/* Chart now uses real data */}
        </View>

        {/* --- 2. FILTERS --- */}
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(filter)}>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- 3. RECENT ALERTS --- */}
        <Text style={styles.listTitle}>Recent Alerts</Text>
        <View>
          {/* 6. The list now renders the real threats from state */}
          {threats.length === 0 ? (
            <Text style={styles.noThreatsText}>No threats detected yet.</Text>
          ) : (
            threats.map((threat) => (
              <ThreatListItem key={threat.id} threat={threat} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  // ... (all your existing styles) ...
  noThreatsText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SIZES.padding,
    fontSize: SIZES.body,
  },
  // ... (rest of your styles) ...
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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default ThreatsScreen;