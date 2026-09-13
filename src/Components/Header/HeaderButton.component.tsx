import React from 'react';

import { Pressable, StyleSheet } from 'react-native';

import { noop } from 'lodash';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import type { HeaderButtonProps } from './Header.component.types';

/**
 * HeaderButtonComponent is a component for the HeaderButton.
 * It is responsible for displaying the data from the Redux store.
 * @param {Object} props - The component props.
 * @param {Object} props.children - The children.
 * @param {Object} props.onPress - The callback function to go back.
 * @returns {React.Component} The HeaderButtonComponent.
 */
export const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
  onPress = noop,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 10, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 300 });
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.iconButton, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});