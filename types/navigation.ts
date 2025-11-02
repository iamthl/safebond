import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Home: undefined;
  Protection: undefined;
  Threats: undefined;
  Connections: undefined;
  Settings: undefined;
  Pricing: undefined;
};

export type AppBottomTabScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;
