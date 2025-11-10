// components/ThreatLineChart.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { DetectedThreat } from '../types/threats';
import { COLORS, SIZES } from '../constants/theme';

type DataPoint = {
  day: string;
  count: number;
};

/**
 * Processes mock timestamps into data for the line chart.
 * Groups ALL threats (regardless of platform) by day.
 */
const processData = (threats: DetectedThreat[]): { labels: string[]; data: number[] } => {
  const counts = {
    '3d ago': 0,
    '2d ago': 0,
    '1d ago': 0,
    Today: 0,
  };

  for (const threat of threats) {
    if (threat.timestamp.includes('m') || threat.timestamp.includes('h')) {
      counts.Today++;
    } else if (threat.timestamp.includes('1d')) {
      counts['1d ago']++;
    } else if (threat.timestamp.includes('2d')) {
      counts['2d ago']++;
    } else if (threat.timestamp.includes('3d')) {
      counts['3d ago']++;
    }
  }

  // Format for react-native-chart-kit
  return {
    labels: ['3d ago', '2d ago', '1d ago', 'Today'],
    data: [counts['3d ago'], counts['2d ago'], counts['1d ago'], counts.Today],
  };
};

// Define the style for the chart, matching your image
const chartConfig = {
  backgroundColor: COLORS.card,
  backgroundGradientFrom: COLORS.card,
  backgroundGradientTo: COLORS.card,
  decimalPlaces: 0, // No decimal places for counts
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Text color
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '5',
    strokeWidth: '2',
    stroke: COLORS.primary, // Dot color
  },
  propsForBackgroundLines: {
    stroke: COLORS.background, // Faint grid lines
    strokeDasharray: '4 8', // --- UPDATED: Was '', now a "4px line, 8px gap" pattern ---
  },
};

// Get screen width and calculate chart width
const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - (SIZES.padding * 4);

export default function ThreatLineChart({ threats }: { threats: DetectedThreat[] }) {
  const { labels, data } = processData(threats);

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
              color: (opacity = 1) => COLORS.primary, // Line color
              strokeWidth: 3,
            },
          ],
        }}
        width={chartWidth}
        height={180}
        yAxisLabel=""
        yAxisSuffix=""
        withInnerLines={true}
        withOuterLines={false}
        chartConfig={chartConfig}
        bezier // Makes the line smooth
        fromZero
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    // The chart component has its own background, so this just centers it
    alignItems: 'center',
  },
});