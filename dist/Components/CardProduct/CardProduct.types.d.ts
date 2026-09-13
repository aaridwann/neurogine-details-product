export interface ProductItem {
    id: number;
    title: string;
    brand?: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    thumbnail: string;
}
export interface CardProductProps {
    product?: ProductItem;
    isLoading?: boolean;
    onPress?: (product: ProductItem) => void;
}
//# sourceMappingURL=CardProduct.types.d.ts.map