import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type DetailFeatureParamList = {
  DetailScreen: { itemId: number; title?: string } | undefined;
};

export type DetailScreenProps = NativeStackScreenProps<DetailFeatureParamList, 'DetailScreen'>;
