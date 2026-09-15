import React, { useEffect, type ReactNode } from 'react';

import { Text, View } from 'react-native';

import { noop } from 'lodash';
import { ArrowLeft, Bell } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './Header.component.styles';
import { HeaderButton } from './HeaderButton.component';

import type { AnimationStyle, HeaderProps } from './Header.component.types';
import type { VoidFunction } from '../../Types';

/**
 * Render Left Content
 * @param {ReactNode} onBackPress - Back press handler
 * @returns {ReactNode} - Render left content
 */
const _renderLeftContent = (onBackPress: VoidFunction = noop): ReactNode => (
  <HeaderButton onPress={onBackPress}>
    <ArrowLeft color="#0F172A" size={20} strokeWidth={2.2} />
  </HeaderButton>
);

/**
 * Render Middle Content
 * @param {ReactNode} animatedTitleStyle - Animated title style
 * @param {string} title - Title
 * @param {string} subtitle - Subtitle
 * @returns {ReactNode} - Render middle content
 */
const _renderMiddleContent = (
  animatedTitleStyle: AnimationStyle,
  title: string,
  subtitle: string,
): ReactNode => (
  <Animated.View style={[styles.titleContainer, animatedTitleStyle]}>
    <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
    {subtitle && (<Text numberOfLines={1} style={styles.subtitleText}>{subtitle}</Text>)}
  </Animated.View>
);

/**
 * Render Right Content
 * @param {VoidFunction} onNotificationPress - Notification press handler
 * @param {boolean} showNotificationBadge - Show notification badge
 * @returns {ReactNode} - Render right content
 */
const _renderRightContent = (
  onNotificationPress: VoidFunction = noop, showNotificationBadge: boolean,
): React.ReactNode => (
  <View style={styles.rightActionContainer}>
    <HeaderButton onPress={onNotificationPress}>
      <Bell color="#0F172A" size={18} strokeWidth={2} />
      {showNotificationBadge && <View style={styles.badge} />}
    </HeaderButton>
  </View>
);

/**
 * Main Component
 * @param {string} title - Title
 * @param {string} subtitle - Subtitle
 * @param {VoidFunction} onBackPress - Back press handler
 * @param {VoidFunction} onNotificationPress - Notification press handler
 * @param {boolean} showNotificationBadge - Show notification badge
 * @returns {ReactNode} - Render header
 */
const HeaderComponent: React.FC<HeaderProps> = ({
  title = 'Catalog',
  subtitle = 'Discover Products',
  onBackPress,
  onNotificationPress,
  showNotificationBadge = true,
}): ReactNode => {
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