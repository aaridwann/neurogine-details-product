import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef, useImperativeHandle, useRef, useMemo, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetBackdrop, BottomSheetView, } from '@gorhom/bottom-sheet';
import styles from './BottomSheet.component.styles';
/**
 * Render header component of bottom sheet
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the bottom sheet.
 * @param {boolean} props.showCloseButton - Whether to show the close button.
 * @param {Function} props.onClosePress - The function to call when the close button is pressed.
 * @returns {React.Component} The header component.
 */
const _renderHeader = ({ title, showCloseButton, onClosePress }) => (title || showCloseButton) && (_jsxs(View, { style: styles.header, children: [_jsx(Text, { style: styles.titleText, children: title || '' }), showCloseButton && (_jsx(TouchableOpacity, { activeOpacity: 0.6, onPress: onClosePress, style: styles.closeButton, children: _jsx(Text, { style: styles.closeText, children: "\u2715" }) }))] }));
/**
 * Get props for bottom sheet
 * @param {Object} props - The component props.
 * @param {Object} props.bottomSheetRef - The bottom sheet ref.
 * @param {Array} props.snapPoints - The snap points.
 * @param {Function} props.renderBackdrop - The render backdrop function.
 * @param {Function} props.onChange - The change function.
 * @param {string} props.sheetColor - The sheet color.
 * @returns {Object} The props for bottom sheet.
 */
const _getPropsBottomSheet = ({ bottomSheetRef, snapPoints, renderBackdrop, onChange, sheetColor, }) => ({
    ref: bottomSheetRef,
    index: -1,
    snapPoints,
    enablePanDownToClose: true,
    backdropComponent: renderBackdrop,
    backgroundStyle: sheetColor ? { backgroundColor: sheetColor } : styles.sheetBackground,
    handleIndicatorStyle: styles.indicator,
    onChange,
});
/**
 * handlerBottomSheetChanges
 * @param {VoidFunction} onClose -
 * @param {VoidFunction} onCloseBottomSheet
 * @param {VoidFunction} onShowBottomSheet
 * @returns {Function}
 */
const useSheetChanges = (onClose, onCloseBottomSheet, onShowBottomSheet) => useCallback((index) => {
    if (index === -1) {
        onClose?.();
        onCloseBottomSheet?.();
    }
    else {
        onShowBottomSheet?.();
    }
}, [onClose, onCloseBottomSheet, onShowBottomSheet]);
const useSheetVisibility = (ref, show) => {
    useEffect(() => {
        if (show)
            ref.current?.snapToIndex(0);
        else
            ref.current?.close();
    }, [show, ref]);
};
const useBackdropRenderer = () => useCallback((props) => (_jsx(BottomSheetBackdrop, { ...props, disappearsOnIndex: -1, appearsOnIndex: 0, opacity: 0.4 })), []);
const CustomBottomSheet = forwardRef((props, ref) => {
    const { show = false, onClose, onCloseBottomSheet, onShowBottomSheet, title, snapPoints: customSnapPoints, children, showCloseButton = false, sheetColor, ...restProps } = props;
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => customSnapPoints || ['50%', '85%'], [customSnapPoints]);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => bottomSheetRef.current, []);
    useSheetVisibility(bottomSheetRef, show);
    const handleSheetChanges = useSheetChanges(onClose, onCloseBottomSheet, onShowBottomSheet);
    const handleClosePress = useCallback(() => bottomSheetRef.current?.close(), []);
    const renderBackdrop = useBackdropRenderer();
    const sheetProps = _getPropsBottomSheet({
        bottomSheetRef, snapPoints, renderBackdrop, onChange: handleSheetChanges, sheetColor,
    });
    return (_jsx(GorhomBottomSheet, { ...restProps, ...sheetProps, children: _jsxs(BottomSheetView, { style: styles.contentContainer, children: [_renderHeader({ title, showCloseButton, onClosePress: handleClosePress }), _jsx(View, { style: styles.body, children: children })] }) }));
});
export default React.memo(CustomBottomSheet);
