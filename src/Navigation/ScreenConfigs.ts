import { ComponentType } from 'react';

import { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';

import { DetailsScreen } from '../Screens/DetailScreen/DetailScreen.container';
import { DetailFeatureParamList } from '../Types';

export interface ScreenConfig<T extends keyof DetailFeatureParamList> {
  name: T;
  component: ComponentType<NativeStackScreenProps<DetailFeatureParamList, T>>;
  options?: NativeStackNavigationOptions;
}

const detailScreenRoutes: ScreenConfig<'DetailScreen'>[] = [
  {
    name: 'DetailScreen',
    component: DetailsScreen,
    options: {
      title: 'Detail Feature',
      headerStyle: { backgroundColor: '#6200ee' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    },
  },
];

export default detailScreenRoutes;