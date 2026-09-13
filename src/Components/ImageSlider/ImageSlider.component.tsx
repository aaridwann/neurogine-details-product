// import React, { useCallback, useEffect, useRef, useState } from 'react';

// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   View,
//   type NativeScrollEvent,
//   type NativeSyntheticEvent,
// } from 'react-native';

// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withDelay,
//   withRepeat,
//   withSequence,
//   withTiming,
// } from 'react-native-reanimated';

// import GeneralText from '@Neurogine/ui-kit-general-text';
// import { VARIANT } from '@Neurogine/ui-kit-general-text/dist/Constants';

// import type { ImageSliderProps, PaginationProps, SliderItem } from './ImageSlider.component.types';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// export const ITEM_WIDTH = SCREEN_WIDTH;
// export const SLIDER_HEIGHT = 280;

// export interface ExtendedImageSliderProps extends ImageSliderProps {
//   isLoading?: boolean;
// }

// export interface SlideItemProps {
//   item: SliderItem;
//   isActive: boolean;
// }

// // -----------------------------------------------------------------------------
// // HELPER RENDERS (Di luar komponen utama & <15 baris per fungsi)
// // -----------------------------------------------------------------------------

// export const getNextSlideIndex = (currentIndex: number, totalItems: number): number => {
//   if (totalItems <= 1) return 0;

//   return (currentIndex + 1) % totalItems;
// };

// export const renderShimmerSkeleton = () => {
//   const shimmerOpacity = useSharedValue(0.3);

//   useEffect(() => {
//     shimmerOpacity.value = withRepeat(
//       withSequence(
//         withTiming(1, { duration: 800 }),
//         withTiming(0.3, { duration: 800 }),
//       ),
//       -1,
//       true,
//     );
//   }, [shimmerOpacity]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     opacity: shimmerOpacity.value,
//   }));

//   return (
//     <View style={styles.cardContainer}>
//       <Animated.View style={[styles.skeletonBanner, animatedStyle]} />
//       <View style={styles.textContainer}>
//         <Animated.View style={[styles.skeletonSubtitle, animatedStyle]} />
//         <Animated.View style={[styles.skeletonTitle, animatedStyle]} />
//       </View>
//       <View style={styles.skeletonPagination}>
//         <Animated.View style={[styles.skeletonDot, animatedStyle]} />
//         <Animated.View style={[styles.skeletonDotActive, animatedStyle]} />
//         <Animated.View style={[styles.skeletonDot, animatedStyle]} />
//       </View>
//     </View>
//   );
// };

// export const PaginationDots: React.FC<PaginationProps> = ({ total, activeIndex }) => (
//   <View style={styles.container}>
//     {Array.from({ length: total }).map((_, index) => (
//       <View
//         key={`dot-${index}`}
//         style={[styles.dot, index === activeIndex ? styles.activeDot : styles.inactiveDot]}
//       />
//     ))}
//   </View>
// );

// // -----------------------------------------------------------------------------
// // SLIDE ITEM COMPONENT
// // -----------------------------------------------------------------------------

// export const SlideItem: React.FC<SlideItemProps> = ({ item, isActive }) => {
//   const opacity = useSharedValue(0);
//   const translateY = useSharedValue(16);

//   useEffect(() => {
//     if (isActive) {
//       opacity.value = withDelay(350, withTiming(1, { duration: 400 }));
//       translateY.value = withDelay(350, withTiming(0, { duration: 400 }));
//     } else {
//       opacity.value = withTiming(0, { duration: 200 });
//       translateY.value = withTiming(16, { duration: 200 });
//     }
//   }, [isActive, opacity, translateY]);

//   const animatedTextStyle = useAnimatedStyle(() => ({
//     opacity: opacity.value,
//     transform: [{ translateY: translateY.value }],
//   }));

//   return (
//     <View style={styles.cardContainer}>
//       <Image resizeMode="cover" source={{ uri: item.image }} style={styles.image} />
//       <View style={styles.overlay} />
//       {(Boolean(item.title) || Boolean(item.subtitle)) && (
//         <Animated.View style={[styles.textContainer, animatedTextStyle]}>
//           {Boolean(item.subtitle) && (
//             <GeneralText style={styles.subtitle} variant={VARIANT.HEADLINE3}>
//               {item.subtitle}
//             </GeneralText>
//           )}
//           {Boolean(item.title) && (
//             <GeneralText style={styles.title} variant={VARIANT.HEADLINE2}>
//               {item.title}
//             </GeneralText>
//           )}
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// export const getItemLayoutConfig = (_: unknown, index: number) => ({
//   length: ITEM_WIDTH,
//   offset: ITEM_WIDTH * index,
//   index,
// });

// // -----------------------------------------------------------------------------
// // MAIN COMPONENT
// // -----------------------------------------------------------------------------

// export const ImageSlider: React.FC<ExtendedImageSliderProps> = ({
//   data,
//   autoPlayInterval = 4000,
//   isLoading = false,
// }): React.ReactNode => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const flatListRef = useRef<FlatList>(null);

//   const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const xOffset = e.nativeEvent.contentOffset.x;
//     const newIndex = Math.round(xOffset / ITEM_WIDTH);
//     setActiveIndex(newIndex);
//   }, []);

//   useEffect(() => {
//     if (isLoading || data.length <= 1) return;

//     const timer = setInterval(() => {
//       const nextIdx = getNextSlideIndex(activeIndex, data.length);
//       flatListRef.current?.scrollToIndex({ index: nextIdx, animated: true });
//     }, autoPlayInterval);

//     return () => clearInterval(timer);
//   }, [activeIndex, data.length, autoPlayInterval, isLoading]);

//   if (isLoading) {
//     return <View style={styles.wrapper}>{renderShimmerSkeleton()}</View>;
//   }

//   return (
//     <View style={styles.wrapper}>
//       <FlatList
//         data={data}
//         decelerationRate="fast"
//         getItemLayout={getItemLayoutConfig}
//         horizontal
//         keyExtractor={(item) => item.id}
//         onScroll={handleScroll}
//         pagingEnabled
//         ref={flatListRef}
//         renderItem={({ item, index }) => (
//           <SlideItem item={item} isActive={index === activeIndex} />
//         )}
//         scrollEventThrottle={16}
//         showsHorizontalScrollIndicator={false}
//       />
//       <PaginationDots activeIndex={activeIndex} total={data.length} />
//     </View>
//   );
// };

// // -----------------------------------------------------------------------------
// // STYLES
// // -----------------------------------------------------------------------------

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 16,
//     flexDirection: 'row',
//     alignSelf: 'center',
//   },
//   dot: { height: 6, borderRadius: 3, marginHorizontal: 3 },
//   activeDot: { width: 20, backgroundColor: '#FFFFFF' },
//   inactiveDot: { width: 6, backgroundColor: 'rgba(255, 255, 255, 0.4)' },
//   cardContainer: { width: ITEM_WIDTH, height: SLIDER_HEIGHT },
//   image: { width: '100%', height: '100%' },
//   overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.35)' },
//   textContainer: { position: 'absolute', bottom: 32, left: 20, right: 20 },
//   subtitle: { color: '#FFFFFF', fontSize: 12, fontWeight: '600', letterSpacing: 1 },
//   title: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 4 },
//   wrapper: { height: SLIDER_HEIGHT, position: 'relative' },
//   // Shimmer Skeleton Styles
//   skeletonBanner: {
//     ...StyleSheet.absoluteFill,
//     backgroundColor: '#a7b5c8ff',
//   },
//   skeletonSubtitle: {
//     width: '35%',
//     height: 12,
//     backgroundColor: '#CBD5E1',
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   skeletonTitle: {
//     width: '70%',
//     height: 22,
//     backgroundColor: '#98a5b6ff',
//     borderRadius: 6,
//   },
//   skeletonPagination: {
//     position: 'absolute',
//     bottom: 16,
//     flexDirection: 'row',
//     alignSelf: 'center',
//   },
//   skeletonDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#98a5b6ff',
//     marginHorizontal: 3,
//   },
//   skeletonDotActive: {
//     width: 20,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#98a5b6ff',
//     marginHorizontal: 3,
//   },
// });

// export default ImageSlider;

import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
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

// import Skeleton from './Skeleton.component';

import Skeleton from '../Shimmering/Shimmering.component';

import type { ImageSliderProps, PaginationProps, SliderItem } from './ImageSlider.component.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const ITEM_WIDTH = SCREEN_WIDTH;
export const SLIDER_HEIGHT = 280;

export interface ExtendedImageSliderProps extends ImageSliderProps {
  isLoading?: boolean;
}

export interface SlideItemProps {
  item?: SliderItem;
  isActive?: boolean;
}

// -----------------------------------------------------------------------------
// HELPER RENDERS (Di luar komponen utama & <15 baris per fungsi)
// -----------------------------------------------------------------------------

export const getNextSlideIndex = (currentIndex = 0, totalItems = 0): number => {
  const safeTotal = Math.max(0, totalItems);
  if (safeTotal <= 1) return 0;

  return (currentIndex + 1) % safeTotal;
};

export const renderShimmerSkeleton = () => (
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

export const PaginationDots: React.FC<PaginationProps> = ({ total = 0, activeIndex = 0 }) => {
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

// -----------------------------------------------------------------------------
// SLIDE ITEM COMPONENT
// -----------------------------------------------------------------------------

export const SlideItem: React.FC<SlideItemProps> = ({ item, isActive = false }) => {
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

export const getItemLayoutConfig = (_: unknown, index: number) => ({
  length: ITEM_WIDTH,
  offset: ITEM_WIDTH * index,
  index,
});

// -----------------------------------------------------------------------------
// MAIN COMPONENT (<15 baris JSX)
// -----------------------------------------------------------------------------

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
      <FlatList
        data={safeData}
        decelerationRate="fast"
        getItemLayout={getItemLayoutConfig}
        horizontal
        keyExtractor={(item, index) => get(item, 'id', `slide-${index}`)}
        onScroll={handleScroll}
        pagingEnabled
        ref={flatListRef}
        renderItem={({ item, index }) => (
          <SlideItem isActive={index === activeIndex} item={item} />
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />
      <PaginationDots activeIndex={activeIndex} total={totalLength} />
    </View>
  );
};

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  imageSliderWrapper: {
    height: SLIDER_HEIGHT,
    position: 'relative',
  },
  imageSliderCardContainer: {
    height: SLIDER_HEIGHT,
    width: ITEM_WIDTH,
  },
  imageSliderImage: {
    height: '100%',
    width: '100%',
  },
  imageSliderOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  imageSliderTextContainer: {
    bottom: 32,
    left: 20,
    position: 'absolute',
    right: 20,
  },
  imageSliderSubtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  imageSliderTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  imageSliderPaginationContainer: {
    alignSelf: 'center',
    bottom: 16,
    flexDirection: 'row',
    position: 'absolute',
  },
  imageSliderDot: {
    borderRadius: 3,
    height: 6,
    marginHorizontal: 3,
  },
  imageSliderActiveDot: {
    backgroundColor: '#FFFFFF',
    width: 20,
  },
  imageSliderInactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 6,
  },
  imageSliderSkeletonPagination: {
    alignSelf: 'center',
    bottom: 16,
    flexDirection: 'row',
    position: 'absolute',
  },
  imageSliderDotMargin: {
    marginHorizontal: 3,
  },
  imageSliderSkeletonSubtitleMargin: {
    marginBottom: 8,
  },
});

export default ImageSlider;