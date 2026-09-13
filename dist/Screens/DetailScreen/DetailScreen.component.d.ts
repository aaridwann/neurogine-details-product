import React from 'react';
import { type TextStyle } from 'react-native';
import { type IoniconsIconName } from '@react-native-vector-icons/ionicons';
import type { DetailScreenComponentProps } from './DetailScreen.types';
import type { ProductType } from '../../Types';
export interface InfoItem {
    key: string;
    icon: IoniconsIconName;
    label: string;
    value: string;
    textStyle?: TextStyle;
    iconColor?: string;
}
export declare const _renderTags: (tags: string[], isLoading: boolean) => React.JSX.Element;
export declare const _renderDescription: (description: string, isLoading: boolean) => React.JSX.Element;
export declare const _renderProductSuggestion: (products: ProductType[], isLoading: boolean, selectProductSuggestion: any) => React.JSX.Element;
declare const DetailScreenComponent: ({ data, isLoading, refetch, isRefecthing, selectProductSuggestion, }: DetailScreenComponentProps) => React.JSX.Element;
export default DetailScreenComponent;
//# sourceMappingURL=DetailScreen.component.d.ts.map