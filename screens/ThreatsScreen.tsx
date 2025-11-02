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

const filters: string[] = ['All', 'Calls', 'Messages', 'High risk'];

const ThreatsScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Threat Center</Text>
        <Text style={styles.headerSubtitle}>
          Monitor and analyze detected threats in real-time
        </Text>

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

        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Threats Detected Over Time</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>
              Chart Placeholder
              {'\n'}
              (Can use 'react-native-svg-charts')
            </Text>
          </View>
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
  chartCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SIZES.padding,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
  },
  chartPlaceholder: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a3038',
    borderRadius: 8,
    marginTop: SIZES.padding,
  },
  placeholderText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ThreatsScreen;
