import type { Navigation, ProductType } from '../../Types';
export interface DetailScreenComponentProps {
    itemId?: number;
    title?: string;
    refetch: () => void;
    data?: ProductType;
    navigation: Navigation;
    isLoading: boolean;
    isRefecthing: false | ProductType | undefined;
    selectProductSuggestion: (id: string) => void;
}
//# sourceMappingURL=DetailScreen.types.d.ts.map