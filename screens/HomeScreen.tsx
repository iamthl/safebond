import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';
import { AppBottomTabScreenProps } from '../types/navigation';

type Props = AppBottomTabScreenProps<'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const onActivate = () => {
    navigation.navigate('Protection');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ShieldCheck color={COLORS.primary} size={64} />
        <Text style={styles.headerTitle}>Safebond AI</Text>
        <Text style={styles.headerSubtitle}>Your Connected Cyber Defense</Text>
        <Text style={styles.bodyText}>
          Safebond monitors calls & messages across all your favorite apps —
          privately, in real time.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={onActivate}>
          <Text style={styles.primaryButtonText}>Activate Cross-App Protection</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          All data stays on your device. No uploads. No tracking.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  headerTitle: {
    fontSize: SIZES.h1 + 4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.padding,
  },
  headerSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.base,
  },
  bodyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '90%',
    marginVertical: SIZES.padding * 2,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: SIZES.padding,
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SIZES.padding,
  },
});

export default HomeScreen;
