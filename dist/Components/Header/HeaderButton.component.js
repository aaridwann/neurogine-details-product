import { jsx as _jsx } from "react/jsx-runtime";
import { Pressable, StyleSheet } from 'react-native';
import { noop } from 'lodash';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
/**
 * HeaderButtonComponent is a component for the HeaderButton.
 * It is responsible for displaying the data from the Redux store.
 * @param {Object} props - The component props.
 * @param {Object} props.children - The children.
 * @param {Object} props.onPress - The callback function to go back.
 * @returns {React.Component} The HeaderButtonComponent.
 */
export const HeaderButton = ({ children, onPress = noop, }) => {
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
    return (_jsx(Pressable, { onPress: onPress, onPressIn: handlePressIn, onPressOut: handlePressOut, children: _jsx(Animated.View, { style: [styles.iconButton, animatedStyle], children: children }) }));
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
