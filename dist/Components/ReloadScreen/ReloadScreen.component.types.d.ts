import type { Navigation, VoidFunction } from '../../Types';
import type { SharedValue } from 'react-native-reanimated';
export interface ReloadScreenProps {
    onReload: VoidFunction;
    title?: string;
    description?: string;
    buttonText?: string;
    lottieSource?: string;
    navigation: Navigation;
    secondButtonText?: string;
    secondButtonOnPress?: VoidFunction;
}
export interface ReloadButtonProps {
    onPress: VoidFunction;
    buttonText: string;
    scale: SharedValue<number>;
    secondButtonText: string;
    secondButtonOnPress: VoidFunction;
}
//# sourceMappingURL=ReloadScreen.component.types.d.ts.map