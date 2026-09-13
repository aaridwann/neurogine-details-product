import React, { forwardRef, useImperativeHandle, useRef, useMemo, useEffect, useCallback } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import styles from './BottomSheet.component.styles';

import type { CustomBottomSheetProps as BaseProps, CustomBottomSheetProps, CustomBottomSheetRef, HeaderProps, PropsBottomSheet } from './BottomSheet.types';
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

const _renderHeader = ({ title, showCloseButton, onClosePress }: HeaderProps): React.ReactNode =>
  (title || showCloseButton) && (
    <View style={styles.header}>
      <Text style={styles.titleText}>{title || ''}</Text>
      {showCloseButton && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onClosePress}
          style={styles.closeButton}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );

const _getPropsBottomSheet = ({
  bottomSheetRef,
  snapPoints,
  renderBackdrop,
  onChange,
  sheetColor,
}: PropsBottomSheet) => ({
  ref: bottomSheetRef,
  index: -1,
  snapPoints,
  enablePanDownToClose: true,
  backdropComponent: renderBackdrop,
  backgroundStyle: sheetColor ? { backgroundColor: sheetColor } : styles.sheetBackground,
  handleIndicatorStyle: styles.indicator,
  onChange,
});

const CustomBottomSheet = forwardRef<CustomBottomSheetRef, CustomBottomSheetProps>(
  (
    {
      show = false,
      onClose,
      onCloseBottomSheet,
      onShowBottomSheet,
      title,
      snapPoints: customSnapPoints,
      children,
      showCloseButton = false,
      sheetColor,
      ...restProps
    },
    ref,
  ) => {
    const bottomSheetRef = useRef<GorhomBottomSheet>(null);
    const snapPoints = useMemo(() => customSnapPoints || ['50%', '85%'], [customSnapPoints]);

    useImperativeHandle(ref, () => bottomSheetRef.current!, []);

    useEffect(() => {
      if (show) bottomSheetRef.current?.snapToIndex(0);
      else bottomSheetRef.current?.close();
    }, [show]);

    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          onClose?.();
          onCloseBottomSheet?.();
        } else {
          onShowBottomSheet?.();
        }
      },
      [onClose, onCloseBottomSheet, onShowBottomSheet],
    );

    const handleClosePress = useCallback(() => {
      bottomSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.4}
        />
      ),
      [],
    );

    return (
      <GorhomBottomSheet
        {...restProps}
        {..._getPropsBottomSheet({
          bottomSheetRef, snapPoints, renderBackdrop, onChange: handleSheetChanges, sheetColor,
        })}
      >
        <BottomSheetView style={styles.contentContainer}>
          {_renderHeader({ title, showCloseButton, onClosePress: handleClosePress })}
          <View style={styles.body}>{children}</View>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  },
);

export default React.memo(CustomBottomSheet);