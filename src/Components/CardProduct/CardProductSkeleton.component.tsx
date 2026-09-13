import React, { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

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

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9', width: 160, overflow: 'hidden' },
  imageSkeleton: { width: '100%', height: 140, backgroundColor: '#E2E8F0' },
  content: { padding: 10, gap: 8 },
  textSkeletonShort: { width: 60, height: 10, backgroundColor: '#E2E8F0', borderRadius: 4 },
  textSkeletonLong: { width: '100%', height: 12, backgroundColor: '#E2E8F0', borderRadius: 4 },
  textSkeletonPrice: { width: 80, height: 14, backgroundColor: '#E2E8F0', borderRadius: 4 },
});

export default CardProductSkeleton;