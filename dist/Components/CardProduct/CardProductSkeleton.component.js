import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, } from 'react-native-reanimated';
import styles from './CardProductSkeleton.component.styles';
const CardProductSkeleton = () => {
    const opacity = useSharedValue(0.3);
    useEffect(() => {
        opacity.value = withRepeat(withTiming(0.8, { duration: 800 }), -1, true);
    }, [opacity]);
    const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
    return (_jsxs(View, { style: styles.card, children: [_jsx(Animated.View, { style: [styles.imageSkeleton, animStyle] }), _jsxs(View, { style: styles.content, children: [_jsx(Animated.View, { style: [styles.textSkeletonShort, animStyle] }), _jsx(Animated.View, { style: [styles.textSkeletonLong, animStyle] }), _jsx(Animated.View, { style: [styles.textSkeletonPrice, animStyle] })] })] }));
};
export default CardProductSkeleton;
