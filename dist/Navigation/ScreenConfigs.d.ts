import { ComponentType } from 'react';
import { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetailFeatureParamList } from '../Types';
export interface ScreenConfig<T extends keyof DetailFeatureParamList> {
    name: T;
    component: ComponentType<NativeStackScreenProps<DetailFeatureParamList, T>>;
    options?: NativeStackNavigationOptions;
}
declare const detailScreenRoutes: ScreenConfig<'DetailScreen'>[];
export default detailScreenRoutes;
//# sourceMappingURL=ScreenConfigs.d.ts.map