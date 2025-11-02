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

// Define the types for our data
type Feature = {
  text: string;
  included: boolean;
};

type Plan = {
  name: string;
  subtitle: string;
  price: string;
  period?: string;
  features: Feature[];
  buttonText: string;
  recommended: boolean;
};

const plans: Plan[] = [
  {
    name: 'Free',
    subtitle: 'Freemium',
    price: 'Free',
    features: [
      { text: 'Text scam detection', included: true },
      { text: 'Voice/video protection', included: false },
      { text: 'Cross-app integration', included: false },
      { text: 'Real-time alerts', included: false },
      { text: 'Multiple devices', included: false },
    ],
    buttonText: 'Get Started',
    recommended: false,
  },
  {
    name: 'Premium Personal',
    subtitle: 'Most Popular',
    price: '$5.99',
    period: '/month or $59/year',
    features: [
      { text: 'Text + Voice + Video detection', included: true },
      { text: '"Verify Sender" button', included: true },
      { text: 'Real-time alerts on 3 devices', included: true },
      { text: 'Team dashboard', included: false },
      { text: 'Parental controls', included: false },
    ],
    buttonText: 'Upgrade to Premium',
    recommended: true,
  },
  {
    name: 'Family / Team Plan',
    subtitle: 'Best for Groups',
    price: '$19.99',
    period: '/month',
    features: [
      { text: 'Up to 6 users', included: true },
      { text: 'Shared scam alerts', included: true },
      { text: 'Team/Family dashboard', included: true },
      { text: 'Parental control & reports', included: true },
      { text: 'Priority support', included: true },
    ],
    buttonText: 'Upgrade to Family Plan',
    recommended: false,
  },
];

type CardProps = {
  plan: Plan;
};

const PricingCard: React.FC<CardProps> = ({ plan }) => (
  <View
    style={[
      styles.pricingCard,
      plan.recommended && styles.pricingCardRecommended,
    ]}
  >
    {plan.recommended && (
      <View style={styles.recommendedBadge}>
        <Text style={styles.recommendedText}>Recommended</Text>
      </View>
    )}
    <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
    <Text style={styles.planTitle}>{plan.name}</Text>
    <View style={styles.priceContainer}>
      <Text style={styles.planPrice}>{plan.price}</Text>
      {plan.period && <Text style={styles.planPeriod}>{plan.period}</Text>}
    </View>
    <View style={styles.featureList}>
      {plan.features.map((feature) => (
        <Text
          key={feature.text}
          style={[
            styles.featureText,
            !feature.included && styles.featureTextDisabled,
          ]}
        >
          {feature.included ? '✓' : '✕'} {feature.text}
        </Text>
      ))}
    </View>
    <TouchableOpacity
      style={[
        styles.primaryButton,
        !plan.recommended && {
          backgroundColor: COLORS.card,
          borderWidth: 1,
          borderColor: COLORS.primary,
        },
      ]}
    >
      <Text
        style={[
          styles.primaryButtonText,
          !plan.recommended && { color: COLORS.primary },
        ]}
      >
        {plan.buttonText}
      </Text>
    </TouchableOpacity>
  </View>
);

const PricingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Choose Your Protection Plan</Text>
        <Text style={styles.headerSubtitle}>
          Stay safe from AI scams — for yourself, your family, or your business.
        </Text>
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
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
    paddingVertical: SIZES.padding,
    paddingBottom: 100,
    paddingHorizontal: SIZES.padding, 
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

  pricingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: SIZES.padding, 
    borderWidth: 2,
    borderColor: COLORS.card,
    justifyContent: 'space-between',
  },
  pricingCardRecommended: {
    borderColor: COLORS.primary,
  },
  recommendedBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 16,
    right: 16,
  },
  recommendedText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  planSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  planTitle: {
    color: COLORS.text,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: SIZES.padding,
  },
  planPrice: {
    color: COLORS.text,
    fontSize: 40,
    fontWeight: 'bold',
  },
  planPeriod: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginLeft: 4,
    marginBottom: 6,
  },
  featureList: {
    marginVertical: SIZES.padding,
    flex: 1,
  },
  featureText: {
    color: COLORS.text,
    fontSize: 15,
    marginBottom: 12,
  },
  featureTextDisabled: {
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: SIZES.padding,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PricingScreen;

