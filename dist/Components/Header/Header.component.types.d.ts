import type { VoidFunction } from '../../Types';
import type { AnimatedStyleHandle, DefaultStyle } from 'react-native-reanimated/lib/typescript/hook/commonTypes';
export interface HeaderProps {
    title?: string;
    subtitle?: string;
    onBackPress?: VoidFunction;
    onNotificationPress?: VoidFunction;
    showNotificationBadge?: boolean;
}
export type AnimationStyle = AnimatedStyleHandle<DefaultStyle>;
export interface HeaderButtonProps {
    children: React.ReactNode;
    onPress?: VoidFunction;
}
//# sourceMappingURL=Header.component.types.d.ts.map