import React from 'react';
import get from 'lodash/get';
// import { useSelector } from 'react-redux';
import DetailScreenComponent from './DetailScreen.component';
/**
 * DetailScreenContainer is a container component for the DetailScreen.
 * It is also responsible for handling the navigation events.
 * @param {Object} props - The component props.
 * @param {Object} props.route - The route object.
 * @param {Object} props.navigation - The navigation object.
 * @returns {React.Component} The DetailScreenComponent.
 */
const DetailsScreen = ({ route, navigation }) => {
    // const state = useSelector((state: any) => state);
    const itemId = get(route, 'params.itemId');
    const title = get(route, 'params.title');
    const handleGoBack = () => {
        navigation.goBack();
    };
    return (<DetailScreenComponent itemId={itemId} title={title} onGoBack={handleGoBack}/>);
};
DetailsScreen.displayName = 'DetailScreen';
export default React.memo(DetailsScreen);
