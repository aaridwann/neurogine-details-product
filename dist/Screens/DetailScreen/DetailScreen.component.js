import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { get, isUndefined, noop } from 'lodash';
import ButtonComponent from '@Neurogine/ui-kit-button';
import GeneralText, { Constants } from '@Neurogine/ui-kit-general-text';
import styles from './DetailsScreen.styles';
import BadgeTextComponent from '../../Components/Badge';
import BottomSheet from '../../Components/BottomSheet';
import CardProduct from '../../Components/CardProduct';
import { ReviewCard } from '../../Components/CommentSection/CommentSection.component';
import ImageSlider from '../../Components/ImageSlider/ImageSlider.component';
import ReloadScreen from '../../Components/ReloadScreen/ReloadScreen.component';
import Skeleton from '../../Components/Shimmering/Shimmering.component';
import fixture from '../../Fixture/Products.json';
import { mapProductToTwoSlides } from '../../Utils/Data/Data.utils';
const { VARIANT } = Constants;
const STAR_SIZE = 12;
const _renderImageSlide = (product, isLoading) => {
    const slidesData = mapProductToTwoSlides(product);
    return (_jsx(ImageSlider, { autoPlayInterval: 3500, data: slidesData, isLoading: isLoading }));
};
const _renderTitle = (title, isLoading) => (isLoading ?
    _jsx(Skeleton, { width: '70%', height: 24, borderRadius: 6 }) :
    _jsx(GeneralText, { variant: VARIANT.HEADLINE3, children: title }));
const _renderRating = (rating, reviewCount, isLoading) => (_jsx(View, { style: styles.ratingContainer, children: isLoading ? (_jsxs(React.Fragment, { children: [_jsx(Skeleton, { borderRadius: 4, height: 20, width: 24 }), _jsx(Skeleton, { borderRadius: 4, height: 20, width: 40 }), _jsx(Skeleton, { borderRadius: 4, height: 20, width: 80 })] })) : (_jsxs(React.Fragment, { children: [_jsx(Ionicons, { color: "#FBBF24", name: "star", size: STAR_SIZE }), _jsx(GeneralText, { variant: VARIANT.BODY1, children: rating }), _jsxs(GeneralText, { variant: VARIANT.BODY3, children: ["(", reviewCount, " reviews)"] })] })) }));
const calculateOriginalPrice = (price, discountPercentage) => {
    return Math.round(price * (1 + discountPercentage / 100) * 100) / 100;
};
const _renderPrice = (price, discountPercentage, isLoading) => (_jsx(View, { style: styles.priceContainer, children: isLoading ? (_jsxs(React.Fragment, { children: [_jsx(Skeleton, { borderRadius: 4, height: 20, width: 100 }), _jsx(Skeleton, { borderRadius: 4, height: 20, width: 60 }), _jsx(Skeleton, { borderRadius: 4, height: 20, width: 30 })] })) : (_jsxs(React.Fragment, { children: [_jsxs(GeneralText, { variant: VARIANT.HEADLINE2, children: ["$", price] }), _jsxs(GeneralText, { style: styles.priceOriginalText, variant: VARIANT.HEADLINE4, children: ["$", calculateOriginalPrice(price, discountPercentage)] }), _jsx(BadgeTextComponent, { backgroundColor: "rgba(0, 86, 148, 0.6)", color: "#FFFFFF", text: `${discountPercentage}%` })] })) }));
export const _renderTags = (tags, isLoading) => (_jsx(View, { style: styles.tagsContainer, children: isLoading ? (_jsxs(React.Fragment, { children: [_jsx(Skeleton, { borderRadius: 8, height: 32, width: 60 }), _jsx(Skeleton, { borderRadius: 8, height: 32, width: 60 }), _jsx(Skeleton, { borderRadius: 8, height: 32, width: 60 })] })) : (!isUndefined(tags) && (_jsx(React.Fragment, { children: tags.map((tag) => (_jsx(BadgeTextComponent, { backgroundColor: "#EDEDED", color: "#777777", style: styles.tagsBadge, text: tag.toUpperCase() }, tag))) }))) }));
const _getShippingItems = (warranty, shipping, status) => [
    { key: 'warranty', icon: 'shield-checkmark-outline', label: 'Warranty', value: warranty },
    { key: 'shipping', icon: 'cube-outline', label: 'Shipping', value: shipping },
    { key: 'status', icon: 'checkmark-circle-outline', label: 'Status', value: status, iconColor: '#10B981', textStyle: { color: '#10B981' } },
];
const ShippingRowItem = ({ item }) => (_jsxs(View, { style: styles.row, children: [_jsx(Ionicons, { color: item.iconColor || '#adadadff', name: item.icon, size: 18 }), _jsxs(GeneralText, { variant: VARIANT.LABEL3, style: [styles.text, item.textStyle], children: [item.label, ": ", item.value] })] }));
const _renderShippingAndStatus = (warrantyInformation, shippingInformation, availabilityStatus, isLoading) => {
    const items = _getShippingItems(warrantyInformation, shippingInformation, availabilityStatus);
    return (_jsx(View, { style: styles.shippingAndStatusContainer, children: _jsx(View, { style: styles.shippingAndStatusList, children: isLoading ? (_jsxs(View, { style: styles.shippingAndStatusSkeletonGroup, children: [_jsx(Skeleton, { borderRadius: 8, height: 18, width: "35%" }), _jsx(Skeleton, { borderRadius: 8, height: 18, width: "50%" }), _jsx(Skeleton, { borderRadius: 8, height: 18, width: "25%" })] })) : (_jsx(React.Fragment, { children: items.map((item) => (_jsx(ShippingRowItem, { item: item }, item.key))) })) }) }));
};
export const _renderDescription = (description, isLoading) => (_jsxs(View, { style: styles.descriptionWrapper, children: [isLoading ? (_jsx(Skeleton, { borderRadius: 8, height: 24, width: "35%" })) : (_jsx(GeneralText, { variant: VARIANT.HEADLINE3, children: "Description" })), isLoading ? (_jsxs(View, { style: styles.descriptionSkeletonGroup, children: [_jsx(Skeleton, { borderRadius: 8, height: 14, width: "35%" }), _jsx(Skeleton, { borderRadius: 8, height: 14, width: "50%" }), _jsx(Skeleton, { borderRadius: 8, height: 14, width: "25%" }), _jsx(Skeleton, { borderRadius: 8, height: 14, width: "45%" }), _jsx(Skeleton, { borderRadius: 8, height: 14, width: "80%" })] })) : (_jsx(GeneralText, { style: styles.descriptionBody, variant: VARIANT.BODY3, children: description }))] }));
const _renderReview = (reviews, isLoading) => (_jsxs(View, { children: [isLoading ?
            _jsx(Skeleton, { width: '35%', height: 24, borderRadius: 8 }) :
            _jsx(GeneralText, { variant: VARIANT.HEADLINE3, children: "Reviews" }), _jsx(View, { style: styles.listReview, children: reviews.map((item, index) => (_jsx(ReviewCard, { isLoading: isLoading, review: item }, `${item.reviewerEmail}-${index}`))) })] }));
export const _renderProductSuggestion = (products, isLoading, selectProductSuggestion) => (_jsxs(View, { style: styles.productSuggestionWrapper, children: [_jsx(GeneralText, { style: styles.productSuggestionTitle, variant: VARIANT.HEADLINE3, children: "Products You May Like" }), _jsx(FlatList, { contentContainerStyle: styles.productSuggestionListContainer, data: isLoading ? [1, 2, 3] : products, horizontal: true, keyExtractor: (item, index) => isLoading ? `skeleton-${index}` : item?.id?.toString(), renderItem: ({ item }) => (_jsx(CardProduct, { isLoading: isLoading, onPress: (p) => selectProductSuggestion(p?.id), product: isLoading ? undefined : item })), showsHorizontalScrollIndicator: false })] }));
const _renderStickyContent = (isLoading) => (_jsxs(View, { style: styles.containerButton, children: [isLoading ? (_jsx(Skeleton, { borderRadius: 60, height: 48, width: "15%" })) : (_jsx(ButtonComponent, { isLoading: isLoading, onPress: noop, style: styles.wishlistButton, title: _jsx(Ionicons, { color: "#acacacff", name: "heart-outline", size: 24 }) })), isLoading ? (_jsx(Skeleton, { borderRadius: 60, height: 48, width: "80%" })) : (_jsx(ButtonComponent, { isLoading: isLoading, onPress: noop, style: styles.cartButton, title: _jsx(GeneralText, { style: styles.cartButtonText, variant: VARIANT.LABEL1, children: "Add to Cart" }) }))] }));
const _renderDetailBody = (data, isLoading, selectProductSuggestion) => (_jsxs(View, { style: styles.detailScreenBodyContainer, children: [_renderTitle(data.title, isLoading), _renderRating(data.rating, get(data, 'reviews.length', 0), isLoading), _renderPrice(data.price, data.discountPercentage, isLoading), _renderTags(data.tags, isLoading), _renderShippingAndStatus(data.warrantyInformation, data.shippingInformation, data.availabilityStatus, isLoading), _renderDescription(data.description, isLoading), _renderReview(get(data, 'reviews', []), isLoading), _renderProductSuggestion(fixture, isLoading, selectProductSuggestion)] }));
const _gerPropsPullToRefresh = (refreshing, onRefresh) => ({
    refreshControl: _jsx(RefreshControl, { colors: ['#3aa6ffff', '#6db5ffff'], onRefresh: onRefresh, progressBackgroundColor: "#FFFFFF", refreshing: refreshing, tintColor: "#3aa6ffff", title: 'Loading...', titleColor: "#3aa6ffff" }),
});
const _renderBottomSheet = (showBottomSheet, refetch, goBack, onModalHide) => (_jsx(BottomSheet, { onCloseBottomSheet: onModalHide, snapPoints: ['80%'], sheetColor: "#558cc3ff", show: showBottomSheet, children: _jsx(ReloadScreen, { secondButtonOnPress: goBack, onReload: refetch }) }));
const _getScrollViewConfig = (refreshing, onRefresh) => ({
    ..._gerPropsPullToRefresh(refreshing, onRefresh),
    contentContainerStyle: styles.detailScreenScrollContent,
});
const DetailScreenComponent = ({ data = {}, isLoading = true, goBack, refetch, isRefecthing, selectProductSuggestion = noop, showBottomSheet, onModalHide, }) => (_jsxs(React.Fragment, { children: [_jsxs(ScrollView, { ..._getScrollViewConfig(isRefecthing, refetch), children: [_renderImageSlide(data, isLoading), _renderDetailBody(data, isLoading, selectProductSuggestion)] }), _renderStickyContent(isLoading), _renderBottomSheet(showBottomSheet, refetch, goBack, onModalHide)] }));
DetailScreenComponent.displayName = 'DetailScreenComponent';
export default DetailScreenComponent;
