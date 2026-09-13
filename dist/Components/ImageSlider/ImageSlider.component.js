import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState, } from 'react';
import { FlatList, Image, View, } from 'react-native';
import get from 'lodash/get';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, } from 'react-native-reanimated';
import GeneralText, { Constants } from '@Neurogine/ui-kit-general-text';
import { ITEM_WIDTH, SLIDER_HEIGHT } from './ImageSlider.component.configs';
import styles from './ImageSlider.component.styles';
import Skeleton from '../Shimmering/Shimmering.component';
const { VARIANT } = Constants;
/**
 * generate slide next index
 * @param {number} currentIndex - current index
 * @param {number} totalItems - total items
 * @returns {number} - next index
 */
const getNextSlideIndex = (currentIndex = 0, totalItems = 0) => {
    const safeTotal = Math.max(0, totalItems);
    if (safeTotal <= 1)
        return 0;
    return (currentIndex + 1) % safeTotal;
};
/**
 * Render shimmering component
 * @returns {ReactNode} - Render shimmering component
 */
const renderShimmerSkeleton = () => (_jsxs(View, { style: styles.imageSliderCardContainer, children: [_jsx(Skeleton, { borderRadius: 0, height: SLIDER_HEIGHT, width: ITEM_WIDTH }), _jsxs(View, { style: styles.imageSliderTextContainer, children: [_jsx(Skeleton, { borderRadius: 4, height: 12, style: styles.imageSliderSkeletonSubtitleMargin, width: "35%" }), _jsx(Skeleton, { borderRadius: 6, height: 22, width: "70%" })] }), _jsxs(View, { style: styles.imageSliderSkeletonPagination, children: [_jsx(Skeleton, { borderRadius: 3, height: 6, style: styles.imageSliderDotMargin, width: 6 }), _jsx(Skeleton, { borderRadius: 3, height: 6, style: styles.imageSliderDotMargin, width: 20 }), _jsx(Skeleton, { borderRadius: 3, height: 6, style: styles.imageSliderDotMargin, width: 6 })] })] }));
/**
 * Render pagination dots
 * @param {number} total - Total pagination dots
 * @param {number} activeIndex - Active pagination index
 * @returns {ReactNode} - Render pagination dots
 */
const PaginationDots = ({ total = 0, activeIndex = 0 }) => {
    const safeTotal = Math.max(0, total);
    if (safeTotal <= 0)
        return null;
    return (_jsx(View, { style: styles.imageSliderPaginationContainer, children: Array.from({ length: safeTotal }).map((_, index) => (_jsx(View, { style: [
                styles.imageSliderDot,
                index === activeIndex ? styles.imageSliderActiveDot : styles.imageSliderInactiveDot,
            ] }, `dot-${index}`))) }));
};
/**
 * Render slide item
 * @param {object} item - Item
 * @param {boolean} isActive - Active state
 * @returns {ReactNode} - Render slide item
 */
const SlideItem = ({ item, isActive = false }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(16);
    const imageUri = get(item, 'image', '');
    const title = get(item, 'title', '');
    const subtitle = get(item, 'subtitle', '');
    useEffect(() => {
        if (isActive) {
            opacity.value = withDelay(350, withTiming(1, { duration: 400 }));
            translateY.value = withDelay(350, withTiming(0, { duration: 400 }));
        }
        else {
            opacity.value = withTiming(0, { duration: 200 });
            translateY.value = withTiming(16, { duration: 200 });
        }
    }, [isActive, opacity, translateY]);
    const animatedTextStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));
    return (_jsxs(View, { style: styles.imageSliderCardContainer, children: [Boolean(imageUri) && (_jsx(Image, { resizeMode: "cover", source: { uri: imageUri }, style: styles.imageSliderImage })), _jsx(View, { style: styles.imageSliderOverlay }), (Boolean(title) || Boolean(subtitle)) && (_jsxs(Animated.View, { style: [styles.imageSliderTextContainer, animatedTextStyle], children: [Boolean(subtitle) && (_jsx(GeneralText, { style: styles.imageSliderSubtitle, variant: VARIANT.HEADLINE3, children: subtitle })), Boolean(title) && (_jsx(GeneralText, { style: styles.imageSliderTitle, variant: VARIANT.HEADLINE2, children: title }))] }))] }));
};
/**
 * Get item layout config for FlatList
 * @param {number} _ - Index
 * @param {number} index - Index
 * @returns {object} - Item layout config
 */
const getItemLayoutConfig = (_, index) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
});
const _gerFlatListProps = (data, handleScroll, flatListRef, activeIndex) => ({
    data,
    decelerationRate: 'fast',
    getItemLayout: getItemLayoutConfig,
    horizontal: true,
    keyExtractor: (item, index) => get(item, 'id', `slide-${index}`),
    onScroll: handleScroll,
    pagingEnabled: true,
    ref: flatListRef,
    renderItem: ({ item, index }) => (_jsx(SlideItem, { isActive: index === activeIndex, item: item })),
    scrollEventThrottle: 16,
    showsHorizontalScrollIndicator: false,
});
const ImageSlider = ({ data = [], autoPlayInterval = 4000, isLoading = false, }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const safeData = Array.isArray(data) ? data : [];
    const totalLength = safeData.length;
    const handleScroll = useCallback((e) => {
        const xOffset = get(e, 'nativeEvent.contentOffset.x', 0);
        const newIndex = Math.round(xOffset / ITEM_WIDTH);
        setActiveIndex(newIndex);
    }, []);
    useEffect(() => {
        if (isLoading || totalLength <= 1)
            return;
        const timer = setInterval(() => {
            const nextIdx = getNextSlideIndex(activeIndex, totalLength);
            flatListRef.current?.scrollToIndex({ index: nextIdx, animated: true });
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [activeIndex, totalLength, autoPlayInterval, isLoading]);
    if (isLoading)
        return _jsx(View, { style: styles.imageSliderWrapper, children: renderShimmerSkeleton() });
    return (_jsxs(View, { style: styles.imageSliderWrapper, children: [_jsx(FlatList, { ..._gerFlatListProps(safeData, handleScroll, flatListRef, activeIndex) }), _jsx(PaginationDots, { activeIndex: activeIndex, total: totalLength })] }));
};
export default ImageSlider;
