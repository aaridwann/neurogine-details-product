import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface DetailFeatureParamList {
  DetailScreen: { itemId: number; title?: string } | undefined;
}

export type DetailScreenProps = NativeStackScreenProps<DetailFeatureParamList, 'DetailScreen'>;
