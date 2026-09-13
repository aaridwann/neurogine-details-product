import React, { useEffect } from 'react';

import { Text, View } from 'react-native';

import { noop } from 'lodash';
import LottieView from 'lottie-react-native';
import { ArrowLeft, Bell } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './Header.component.styles';
import { HeaderButton } from './HeaderButton.component';
import FireworkLottie from '../../Assets/Lottie/sparks.json';

import type { AnimationStyle, HeaderProps } from './Header.component.types';
import type { VoidFunction } from '../../Types';

const _renderLeftContent = (onBackPress: VoidFunction = noop) => (
  <HeaderButton onPress={onBackPress}>
    <ArrowLeft color="#0F172A" size={20} strokeWidth={2.2} />
  </HeaderButton>
);

const _renderMiddleContent = (
  animatedTitleStyle: AnimationStyle,
  title: string,
  subtitle: string,
) => (
  <Animated.View style={[styles.titleContainer, animatedTitleStyle]}>
    <Text numberOfLines={1} style={styles.titleText}>
      {title}
    </Text>
    {subtitle && (
      <Text numberOfLines={1} style={styles.subtitleText}>
        {subtitle}
      </Text>
    )}
  </Animated.View>
);

const _renderRightContent = (
  onNotificationPress: VoidFunction = noop,
  showNotificationBadge: boolean,
): React.ReactNode => (
  <View style={styles.rightActionContainer}>
    <HeaderButton onPress={onNotificationPress}>
      <Bell color="#0F172A" size={18} strokeWidth={2} />
      {showNotificationBadge && <View style={styles.badge} />}
    </HeaderButton>
    <View style={styles.lottieContainer} pointerEvents="none">
      <LottieView
        autoPlay
        loop
        source={FireworkLottie}
        style={styles.lottie}
      />
    </View>
  </View>
);

export const HeaderComponent: React.FC<HeaderProps> = ({
  title = 'Catalog',
  subtitle = 'Discover Products',
  onBackPress,
  onNotificationPress,
  showNotificationBadge = true,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-8);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    translateY.value = withTiming(0, { duration: 400 });
  }, [opacity, translateY]);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        {_renderLeftContent(onBackPress)}
        {_renderMiddleContent(animatedTitleStyle, title, subtitle)}
        {_renderRightContent(onNotificationPress, showNotificationBadge)}
      </View>
    </SafeAreaView>
  );
};

export default HeaderComponent;