import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import get from 'lodash/get';
import DetailScreenComponent from './DetailScreen.component';
import useProductDetail from '../../Hooks/UseProductDetail/UseProductDetail.hooks';
/**
 * DetailScreenContainer is a container component for the DetailScreen.
 * It is also responsible for handling the navigation events.
 * @param {Object} props - The component props.
 * @param {Object} props.route - The route object.
 * @param {Object} props.navigation - The navigation object.
 * @returns {React.Component} The DetailScreenComponent.
 */
const DetailsScreen = ({ route, navigation }) => {
    const id = get(route, 'params.id', '');
    const hooks = useProductDetail(id);
    const selectProductSuggestion = React.useCallback((id) => {
        navigation.push('DetailScreen', { id });
    }, []);
    const onModalHide = React.useCallback(() => {
        if (hooks.isError)
            navigation.goBack();
    }, [hooks.isError, navigation]);
    return (_jsx(DetailScreenComponent, { goBack: navigation.goBack, onModalHide: onModalHide, showBottomSheet: hooks.showBottomSheet, refetch: hooks.refetch, isRefecthing: hooks.fetchStatus === 'fetching' && hooks.data, data: hooks.data, navigation: navigation, isLoading: hooks.isLoading || !hooks.data, selectProductSuggestion: selectProductSuggestion }));
};
DetailsScreen.displayName = 'DetailScreen';
export default React.memo(DetailsScreen);
