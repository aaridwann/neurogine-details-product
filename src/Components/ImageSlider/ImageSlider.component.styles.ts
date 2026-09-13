import { StyleSheet } from 'react-native';

import { ITEM_WIDTH, SLIDER_HEIGHT } from './ImageSlider.component';

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

export default styles;