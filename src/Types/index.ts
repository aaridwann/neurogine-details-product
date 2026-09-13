import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export interface DetailFeatureParamList extends Record<string, object | undefined> {
  DetailScreen: { itemId: number; title?: string } | undefined;
}

export type DetailScreenProps = NativeStackScreenProps<DetailFeatureParamList, 'DetailScreen'>;

export type VoidFunction = () => void;

export interface ReviewProductType {
  rating: number,
  comment: string,
  date: string,
  reviewerName: string,
  reviewerEmail: string
};

export interface ProductType {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  tags: string[],
  brand: string,
  sku: string,
  weight: number,
  dimensions: {
    width: number,
    height: number,
    depth: number
  },
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus: string,
  reviews: ReviewProductType[],
  returnPolicy: string,
  minimumOrderQuantity: number,
  meta: {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string
  },
  images: string[],
  thumbnail: string
};

export type Navigation = NativeStackNavigationProp<ParamListBase>