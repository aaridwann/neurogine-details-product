import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { noop } from 'lodash';
import { ArrowLeft, Bell } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Header.component.styles';
import { HeaderButton } from './HeaderButton.component';
/**
 * Render Left Content
 * @param {ReactNode} onBackPress - Back press handler
 * @returns {ReactNode} - Render left content
 */
const _renderLeftContent = (onBackPress = noop) => (_jsx(HeaderButton, { onPress: onBackPress, children: _jsx(ArrowLeft, { color: "#0F172A", size: 20, strokeWidth: 2.2 }) }));
/**
 * Render Middle Content
 * @param {ReactNode} animatedTitleStyle - Animated title style
 * @param {string} title - Title
 * @param {string} subtitle - Subtitle
 * @returns {ReactNode} - Render middle content
 */
const _renderMiddleContent = (animatedTitleStyle, title, subtitle) => (_jsxs(Animated.View, { style: [styles.titleContainer, animatedTitleStyle], children: [_jsx(Text, { numberOfLines: 1, style: styles.titleText, children: title }), subtitle && (_jsx(Text, { numberOfLines: 1, style: styles.subtitleText, children: subtitle }))] }));
/**
 * Render Right Content
 * @param {VoidFunction} onNotificationPress - Notification press handler
 * @param {boolean} showNotificationBadge - Show notification badge
 * @returns {ReactNode} - Render right content
 */
const _renderRightContent = (onNotificationPress = noop, showNotificationBadge) => (_jsx(View, { style: styles.rightActionContainer, children: _jsxs(HeaderButton, { onPress: onNotificationPress, children: [_jsx(Bell, { color: "#0F172A", size: 18, strokeWidth: 2 }), showNotificationBadge && _jsx(View, { style: styles.badge })] }) }));
/**
 * Main Component
 * @param {string} title - Title
 * @param {string} subtitle - Subtitle
 * @param {VoidFunction} onBackPress - Back press handler
 * @param {VoidFunction} onNotificationPress - Notification press handler
 * @param {boolean} showNotificationBadge - Show notification badge
 * @returns {ReactNode} - Render header
 */
const HeaderComponent = ({ title = 'Catalog', subtitle = 'Discover Products', onBackPress, onNotificationPress, showNotificationBadge = true, }) => {
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
    return (_jsx(SafeAreaView, { edges: ['top'], style: styles.safeArea, children: _jsxs(View, { style: styles.container, children: [_renderLeftContent(onBackPress), _renderMiddleContent(animatedTitleStyle, title, subtitle), _renderRightContent(onNotificationPress, showNotificationBadge)] }) }));
};
export default HeaderComponent;
