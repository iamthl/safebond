import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Home,
  Shield,
  BarChart2,
  Zap,
  Settings,
  CreditCard,
  LucideIcon,
} from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../types/navigation';

const tabIcons: Record<keyof RootTabParamList, LucideIcon> = {
  Home: Home,
  Protection: Shield,
  Threats: BarChart2,
  Connections: Zap,
  Settings: Settings,
  Pricing: CreditCard,
};

const tabOrder: (keyof RootTabParamList)[] = [
  'Home',
  'Protection',
  'Threats',
  'Connections',
  'Settings',
  'Pricing',
];

const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {tabOrder.map((name) => {
        const route = state.routes.find((r) => r.name === name);
        if (!route) return null;

        const { options } = descriptors[route.key];
        const isFocused = state.index === state.routes.indexOf(route);
        const Icon = tabIcons[name];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(name);
          }
        };

        const color = isFocused ? COLORS.primary : COLORS.textSecondary;

        return (
          <TouchableOpacity
            key={name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabItem}
          >
            <View
              style={[
                styles.tabIconContainer,
                isFocused && { backgroundColor: 'rgba(99, 230, 190, 0.2)' },
              ]}
            >
              <Icon color={color} size={24} />
            </View>
            <Text style={[styles.tabLabel, { color: color }]}>{name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderColor: '#2a3038',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  tabIconContainer: {
    width: 56,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default CustomBottomTabBar;

