import type { StyleProp, ViewStyle } from 'react-native';

export interface BadgeTextComponentProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}
