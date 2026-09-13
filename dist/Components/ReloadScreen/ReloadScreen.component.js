import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { noop } from 'lodash';
import LottieView from 'lottie-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
import GeneralText, { Constants } from '@Neurogine/ui-kit-general-text';
import styles from './ReloadScreen.component.styles';
import RefreshLottie from '../../Assets/Lottie/Refresh.json';
const { VARIANT } = Constants;
/**
 * render Lottie Animation
 * @param {string} source - source assets
 * @returns {ReactNode}
 */
const renderLottieAnimation = (source) => (_jsx(View, { style: styles.lottieWrapper, children: _jsx(LottieView, { autoPlay: true, loop: true, source: source || RefreshLottie, style: styles.lottie }) }));
/**
 * render Content Text
 * @param {string} title - title
 * @param {string} description - description
 * @returns {ReactNode} - Render Content Text
 */
const renderContentText = (title, description) => (_jsxs(View, { style: styles.textContainer, children: [_jsx(GeneralText, { style: styles.title, variant: VARIANT.HEADLINE2, children: title }), _jsx(GeneralText, { style: styles.description, variant: VARIANT.BODY2, children: description })] }));
/**
 * handle press in
 * @param {Animated.SharedValue<number>} scale - scale animation
 */
const handlePressIn = (scale) => {
    scale.value = withSpring(0.95);
};
/**
 * handle press out
 * @param {Animated.SharedValue<number>} scale - scale animation
 * @param {VoidFunction} onPress - press handler
 */
const handlePressOut = (scale, onPress) => {
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
const _renderButton = (scale, onPress, buttonText) => (_jsx(Pressable, { onPressIn: () => handlePressIn(scale), onPressOut: () => handlePressOut(scale, onPress), style: styles.button, children: _jsx(GeneralText, { style: styles.buttonText, variant: VARIANT.LABEL1, children: buttonText }) }));
/**
 * render Reload Button
 * @param {VoidFunction} onPress - reload press handler
 * @param {string} buttonText - button text
 * @param {Animated.SharedValue<number>} scale - scale animation
 * @param {string} secondButtonText - second button text
 * @param {VoidFunction} secondButtonOnPress - second button press handler
 * @returns {ReactNode} - Render Reload Button
 */
const ReloadButton = ({ onPress, buttonText, scale, secondButtonText, secondButtonOnPress }) => {
    const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
    return (_jsxs(Animated.View, { style: [styles.buttonWrapper, animatedStyle], children: [_renderButton(scale, onPress, buttonText), secondButtonText && _renderButton(scale, secondButtonOnPress, secondButtonText)] }));
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
export const ReloadScreen = ({ onReload = noop, title = 'Connection is broken', description = 'Failed to load data. Please check your internet connection and try again.', buttonText = 'Try again', lottieSource, navigation, secondButtonText = 'Back', secondButtonOnPress = noop, }) => {
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
    return (_jsx(View, { style: styles.container, children: _jsxs(View, { style: styles.content, children: [renderLottieAnimation(lottieSource), renderContentText(title, description), _jsx(ReloadButton, { onPress: onReload, buttonText: buttonText, scale: buttonScale, secondButtonText: secondButtonText, secondButtonOnPress: secondButtonOnPress })] }) }));
};
ReloadScreen.displayName = 'ReloadScreen';
export default React.memo(ReloadScreen);
