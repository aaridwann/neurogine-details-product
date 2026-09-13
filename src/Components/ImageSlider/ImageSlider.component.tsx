import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  FlatList,
  Image,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type FlatListProps,
} from 'react-native';

import get from 'lodash/get';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import GeneralText from '@Neurogine/ui-kit-general-text';
import { VARIANT } from '@Neurogine/ui-kit-general-text/dist/Constants';

import { ITEM_WIDTH, SLIDER_HEIGHT } from './ImageSlider.component.configs';
import styles from './ImageSlider.component.styles';
import Skeleton from '../Shimmering/Shimmering.component';

import type { ExtendedImageSliderProps, PaginationProps, SlideItemProps, SliderItem } from './ImageSlider.component.types';

/**
 * generate slide next index
 * @param {number} currentIndex - current index
 * @param {number} totalItems - total items
 * @returns {number} - next index
 */
const getNextSlideIndex = (currentIndex = 0, totalItems = 0): number => {
  const safeTotal = Math.max(0, totalItems);

  if (safeTotal <= 1) return 0;

  return (currentIndex + 1) % safeTotal;
};

/**
 * Render shimmering component
 * @returns {ReactNode} - Render shimmering component
 */
const renderShimmerSkeleton = (): ReactNode => (
  <View style={styles.imageSliderCardContainer}>
    <Skeleton borderRadius={0} height={SLIDER_HEIGHT} width={ITEM_WIDTH} />
    <View style={styles.imageSliderTextContainer}>
      <Skeleton borderRadius={4} height={12} style={styles.imageSliderSkeletonSubtitleMargin} width="35%" />
      <Skeleton borderRadius={6} height={22} width="70%" />
    </View>
    <View style={styles.imageSliderSkeletonPagination}>
      <Skeleton borderRadius={3} height={6} style={styles.imageSliderDotMargin} width={6} />
      <Skeleton borderRadius={3} height={6} style={styles.imageSliderDotMargin} width={20} />
      <Skeleton borderRadius={3} height={6} style={styles.imageSliderDotMargin} width={6} />
    </View>
  </View>
);

/**
 * Render pagination dots
 * @param {number} total - Total pagination dots
 * @param {number} activeIndex - Active pagination index
 * @returns {ReactNode} - Render pagination dots
 */
const PaginationDots: React.FC<PaginationProps> = ({ total = 0, activeIndex = 0 }): ReactNode => {
  const safeTotal = Math.max(0, total);

  if (safeTotal <= 0) return null;

  return (
    <View style={styles.imageSliderPaginationContainer}>
      {Array.from({ length: safeTotal }).map((_, index) => (
        <View
          key={`dot-${index}`}
          style={[
            styles.imageSliderDot,
            index === activeIndex ? styles.imageSliderActiveDot : styles.imageSliderInactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

/**
 * Render slide item
 * @param {object} item - Item
 * @param {boolean} isActive - Active state
 * @returns {ReactNode} - Render slide item
 */
const SlideItem: React.FC<SlideItemProps> = ({ item, isActive = false }): ReactNode => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);
  const imageUri = get(item, 'image', '');
  const title = get(item, 'title', '');
  const subtitle = get(item, 'subtitle', '');

  useEffect(() => {
    if (isActive) {
      opacity.value = withDelay(350, withTiming(1, { duration: 400 }));
      translateY.value = withDelay(350, withTiming(0, { duration: 400 }));
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(16, { duration: 200 });
    }
  }, [isActive, opacity, translateY]);

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.imageSliderCardContainer}>
      {Boolean(imageUri) && (
        <Image resizeMode="cover" source={{ uri: imageUri }} style={styles.imageSliderImage} />
      )}
      <View style={styles.imageSliderOverlay} />
      {(Boolean(title) || Boolean(subtitle)) && (
        <Animated.View style={[styles.imageSliderTextContainer, animatedTextStyle]}>
          {Boolean(subtitle) && (
            <GeneralText style={styles.imageSliderSubtitle} variant={VARIANT.HEADLINE3}>
              {subtitle}
            </GeneralText>
          )}
          {Boolean(title) && (
            <GeneralText style={styles.imageSliderTitle} variant={VARIANT.HEADLINE2}>
              {title}
            </GeneralText>
          )}
        </Animated.View>
      )}
    </View>
  );
};

/**
 * Get item layout config for FlatList
 * @param {number} _ - Index
 * @param {number} index - Index
 * @returns {object} - Item layout config
 */
const getItemLayoutConfig = (_: number, index: number):
{ length: number; offset: number; index: number } => ({
  length: ITEM_WIDTH,
  offset: ITEM_WIDTH * index,
  index,
});

const _gerFlatListProps = (
  data: SliderItem[],
  handleScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void,
  flatListRef: React.RefObject<FlatList<SlideItemProps>>,
  activeIndex: number,
): FlatListProps<SlideItemProps> => ({
  data,
  decelerationRate: 'fast',
  getItemLayout: getItemLayoutConfig,
  horizontal: true,
  keyExtractor: (item, index) => get(item, 'id', `slide-${index}`),
  onScroll: handleScroll,
  pagingEnabled: true,
  ref: flatListRef,
  renderItem: ({ item, index }) => (
    <SlideItem isActive={index === activeIndex} item={item} />
  ),
  scrollEventThrottle: 16,
  showsHorizontalScrollIndicator: false,
});

export const ImageSlider: React.FC<ExtendedImageSliderProps> = ({
  data = [],
  autoPlayInterval = 4000,
  isLoading = false,
}): React.ReactNode => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const safeData = Array.isArray(data) ? data : [];
  const totalLength = safeData.length;

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = get(e, 'nativeEvent.contentOffset.x', 0);
    const newIndex = Math.round(xOffset / ITEM_WIDTH);
    setActiveIndex(newIndex);
  }, []);

  useEffect(() => {
    if (isLoading || totalLength <= 1) return;

    const timer = setInterval(() => {
      const nextIdx = getNextSlideIndex(activeIndex, totalLength);
      flatListRef.current?.scrollToIndex({ index: nextIdx, animated: true });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [activeIndex, totalLength, autoPlayInterval, isLoading]);

  if (isLoading) {
    return <View style={styles.imageSliderWrapper}>{renderShimmerSkeleton()}</View>;
  }

  return (
    <View style={styles.imageSliderWrapper}>
      <FlatList {..._gerFlatListProps(safeData, handleScroll, flatListRef, activeIndex)}/>
      <PaginationDots activeIndex={activeIndex} total={totalLength} />
    </View>
  );
};

export default ImageSlider;