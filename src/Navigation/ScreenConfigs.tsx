import React from 'react';

import HeaderComponent from '../Components/Header/Header.component';
import { DetailRoutes } from '../Shared';

import type { ScreenConfig } from './ScreemConfigs.types';

const DetailsScreen = React.lazy(() => import('../Screens/DetailScreen'));

/**
 * Configuration for detail screens
 * @returns {ScreenConfig<"DetailScreen">} Array of ScreenConfig objects
 */
const DetailScreens: ScreenConfig<typeof DetailRoutes.DETAIL_ROUTE>[] = [
  {
    name: DetailRoutes.DETAIL_ROUTE,
    component: DetailsScreen,
    options: {
      header: (props) => <HeaderComponent
        onBackPress={props.navigation.goBack}
        onNotificationPress={() => console.log('Notification Pressed')}
        subtitle="Explore Exclusive Collections"
        title="Store Catalog"
        showNotificationBadge
      />,
    },
  },
];

export default DetailScreens;