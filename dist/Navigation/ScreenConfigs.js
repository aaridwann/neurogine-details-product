import { DetailsScreen } from '../Screens/DetailScreen/DetailScreen.container';
const detailScreenRoutes = [
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
