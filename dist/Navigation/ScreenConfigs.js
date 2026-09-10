import React from 'react';
import { DetailRoutes } from '../Shared';
const DetailsScreen = React.lazy(() => import('../Screens/DetailScreen'));
/**
 * Configuration for detail screens
 * @returns {ScreenConfig<"DetailScreen">} Array of ScreenConfig objects
 */
const DetailScreens = [
    {
        name: DetailRoutes.DETAIL_ROUTE,
        component: DetailsScreen,
        options: {
            title: 'Detail Feature',
            headerStyle: { backgroundColor: '#6200ee' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
        },
    },
];
export default DetailScreens;
