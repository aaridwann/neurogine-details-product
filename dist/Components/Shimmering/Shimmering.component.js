import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, } from 'react-native-reanimated';
import styles from './Shimmering.component.styles';
const Skeleton = ({ width = '100%', height = 16, borderRadius = 4, style, }) => {
    const opacity = useSharedValue(0.3);
    useEffect(() => {
        opacity.value = withRepeat(withSequence(withTiming(1, { duration: 800 }), withTiming(0.3, { duration: 800 })), -1, true);
    }, [opacity]);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    return (_jsx(Animated.View, { style: [
            styles.skeleton,
            {
                width,
                height,
                borderRadius,
            },
            style,
            animatedStyle,
        ] }));
};
export default Skeleton;
