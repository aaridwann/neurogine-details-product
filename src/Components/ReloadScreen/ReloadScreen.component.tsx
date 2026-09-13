import React, { type ReactNode, useEffect } from 'react';

import { Pressable, View } from 'react-native';

import { noop } from 'lodash';
import LottieView from 'lottie-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';

import GeneralText, { Constants } from '@Neurogine/ui-kit-general-text';

import styles from './ReloadScreen.component.styles';
import RefreshLottie from '../../Assets/Lottie/Refresh.json';

import type { ReloadButtonProps, ReloadScreenProps } from './ReloadScreen.component.types';
import type { VoidFunction } from '../../Types';

const { VARIANT } = Constants;

/**
 * render Lottie Animation
 * @param {string} source - source assets
 * @returns {ReactNode}
 */
const renderLottieAnimation = (source?: string): ReactNode => (
  <View style={styles.lottieWrapper}>
    <LottieView
      autoPlay
      loop
      source={source || RefreshLottie}
      style={styles.lottie}
    />
  </View>
);

/**
 * render Content Text
 * @param {string} title - title
 * @param {string} description - description
 * @returns {ReactNode} - Render Content Text
 */
const renderContentText = (title: string, description: string): ReactNode => (
  <View style={styles.textContainer}>
    <GeneralText style={styles.title} variant={VARIANT.HEADLINE2}>
      {title}
    </GeneralText>
    <GeneralText style={styles.description} variant={VARIANT.BODY2}>
      {description}
    </GeneralText>
  </View>
);

/**
 * handle press in
 * @param {Animated.SharedValue<number>} scale - scale animation
 */
const handlePressIn = (scale: SharedValue<number>): void => {
  scale.value = withSpring(0.95);
};

/**
 * handle press out
 * @param {Animated.SharedValue<number>} scale - scale animation
 * @param {VoidFunction} onPress - press handler
 */
const handlePressOut = (scale: SharedValue<number>, onPress: VoidFunction): void => {
  scale.value = withSpring(1);
  onPress();
};

/**
 * render button
 * @param {Animated.SharedValue<number>} scale - scale animation
 * @param {VoidFunction} onPress - press handler
 * @param {string} buttonText - button text
 * @returns {ReactNode} - Render Button
 */
const _renderButton = (
  scale: SharedValue<number>,
  onPress: VoidFunction,
  buttonText: string,
):ReactNode => (
  <Pressable
    onPressIn={() => handlePressIn(scale)}
    onPressOut={() => handlePressOut(scale, onPress)}
    style={styles.button}
  >
    <GeneralText style={styles.buttonText} variant={VARIANT.LABEL1}>
      {buttonText}
    </GeneralText>
  </Pressable>
);

/**
 * render Reload Button
 * @param {VoidFunction} onPress - reload press handler
 * @param {string} buttonText - button text
 * @param {Animated.SharedValue<number>} scale - scale animation
 * @param {string} secondButtonText - second button text
 * @param {VoidFunction} secondButtonOnPress - second button press handler
 * @returns {ReactNode} - Render Reload Button
 */
const ReloadButton = ({
  onPress,
  buttonText,
  scale,
  secondButtonText,
  secondButtonOnPress }: ReloadButtonProps): ReactNode => {
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={[styles.buttonWrapper, animatedStyle]}>
      {_renderButton(scale, onPress, buttonText)}
      {secondButtonText && _renderButton(scale, secondButtonOnPress, secondButtonText)}
    </Animated.View>
  );
};

/**
 * REload screen
 * @param {VoidFunction} onReload - reload handler
 * @param {string} title - title
 * @param {string} description - description
 * @param {string} buttonText - button text
 * @param {string} lottieSource - lottie source
 * @param {Navigation} navigation - navigation
 * @param {string} secondButtonText - second button text
 * @param {VoidFunction} secondButtonOnPress - second button press handler
 * @returns {ReactNode} - Render Reload Screen
 */
export const ReloadScreen: React.FC<ReloadScreenProps> = ({
  onReload = noop,
  title = 'Connection is broken',
  description = 'Failed to load data. Please check your internet connection and try again.',
  buttonText = 'Try again',
  lottieSource,
  navigation,
  secondButtonText = 'Back',
  secondButtonOnPress = noop,
}) => {
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });

    return () => {
      navigation?.setOptions({
        headerShown: true,
      });
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderLottieAnimation(lottieSource)}
        {renderContentText(title, description)}
        {<ReloadButton
          onPress={onReload}
          buttonText={buttonText}
          scale={buttonScale}
          secondButtonText={secondButtonText}
          secondButtonOnPress={secondButtonOnPress}
        />}
      </View>
    </View>
  );
};

ReloadScreen.displayName = 'ReloadScreen';

export default React.memo(ReloadScreen);