import type { ModalBaseProps } from 'react-native';
import type { VoidFunction } from '../../Types';
import type { BottomSheetBackdropProps, BottomSheetProps } from '@gorhom/bottom-sheet';
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
export interface CustomBottomSheetProps extends Partial<BottomSheetProps> {
    title?: string;
    snapPoints?: string[];
    children: React.ReactNode;
    showCloseButton?: boolean;
}
export type CustomBottomSheetRef = BottomSheetMethods;
export interface CustomBottomSheetProps extends ModalBaseProps {
    show?: boolean;
    onClose?: VoidFunction;
    onCloseBottomSheet?: VoidFunction;
    onShowBottomSheet?: VoidFunction;
    sheetColor?: string;
}
export interface HeaderProps {
    title?: string;
    showCloseButton: boolean;
    onClosePress: () => void;
}
export interface PropsBottomSheet {
    bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
    snapPoints: string[];
    renderBackdrop: (props: BottomSheetBackdropProps) => React.JSX.Element;
    onChange: (index: number) => void;
    sheetColor?: string;
}
//# sourceMappingURL=BottomSheet.types.d.ts.map