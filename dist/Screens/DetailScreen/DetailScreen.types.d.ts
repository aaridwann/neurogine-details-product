import type { TextStyle } from 'react-native';
import type { Navigation, ProductType, VoidFunction } from '../../Types';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons';
export interface DetailScreenComponentProps {
    id?: string;
    title?: string;
    refetch: () => void;
    data?: ProductType;
    navigation: Navigation;
    isLoading: boolean;
    isRefecthing: false | ProductType | undefined;
    selectProductSuggestion: (id: string) => void;
    showBottomSheet: boolean;
    goBack: VoidFunction;
    onModalHide: VoidFunction;
}
export interface InfoItem {
    key: string;
    icon: IoniconsIconName;
    label: string;
    value: string;
    textStyle?: TextStyle;
    iconColor?: string;
}
//# sourceMappingURL=DetailScreen.types.d.ts.map