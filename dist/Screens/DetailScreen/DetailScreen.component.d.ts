import React from 'react';
import type { DetailScreenComponentProps } from './DetailScreen.types';
import type { ProductType } from '../../Types';
export declare const _renderTags: (tags: string[], isLoading: boolean) => React.JSX.Element;
export declare const _renderDescription: (description: string, isLoading: boolean) => React.JSX.Element;
export declare const _renderProductSuggestion: (products: ProductType[], isLoading: boolean, selectProductSuggestion: (id: string) => void) => React.JSX.Element;
declare const DetailScreenComponent: {
    ({ data, isLoading, goBack, refetch, isRefecthing, selectProductSuggestion, showBottomSheet, onModalHide, }: DetailScreenComponentProps): React.JSX.Element;
    displayName: string;
};
export default DetailScreenComponent;
//# sourceMappingURL=DetailScreen.component.d.ts.map