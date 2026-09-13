import React, { useEffect } from 'react';

import { View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import styles from './CardProductSkeleton.component.styles';

const CardProductSkeleton = (): React.ReactNode => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, { duration: 800 }), -1, true);
  }, [opacity]);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.imageSkeleton, animStyle]} />
      <View style={styles.content}>
        <Animated.View style={[styles.textSkeletonShort, animStyle]} />
        <Animated.View style={[styles.textSkeletonLong, animStyle]} />
        <Animated.View style={[styles.textSkeletonPrice, animStyle]} />
      </View>
    </View>
  );
};

export default CardProductSkeleton;