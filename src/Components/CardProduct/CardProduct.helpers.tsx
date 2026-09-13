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

export const calcOriginalPrice = (price: number, discount = 0): string => {
  if (discount <= 0) return '';

  return (price * (1 + discount / 100)).toFixed(2);
};