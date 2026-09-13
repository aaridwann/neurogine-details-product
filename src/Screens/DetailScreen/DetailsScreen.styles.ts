import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  detailScreenScrollContent: {
    paddingBottom: 140,
  },
  detailScreenBodyContainer: {
    gap: 12,
    padding: 16,
  },
  container: { gap: 8, marginVertical: 8 },
  title: { marginBottom: 4 },
  list: { gap: 4 },
  row: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  text: { color: '#aeaeaeff', flex: 1 },
  listReview: { gap: 10 },
  containerButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    bottom: 0,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    paddingBottom: 56,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    right: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  wishlistButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
  },
  cartButton: {
    alignItems: 'center',
    backgroundColor: '#4D8DD2',
    borderRadius: 60,
    justifyContent: 'center',
    padding: 0,
    paddingVertical: 10,
    width: '80%',
  },
  cartButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  productSuggestionWrapper: {
    gap: 8,
  },
  productSuggestionTitle: {
    paddingHorizontal: 16,
  },
  productSuggestionListContainer: {
    gap: 12,
    paddingHorizontal: 16,
  },
  descriptionWrapper: {
    gap: 8,
  },
  descriptionSkeletonGroup: {
    gap: 4,
    marginTop: 12,
  },
  descriptionBody: {
    marginTop: 8,
  },
  shippingAndStatusContainer: {
    //Todo

  },
  shippingAndStatusList: {
    gap: 2,
  },
  shippingAndStatusSkeletonGroup: {
    gap: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  tagsBadge: {
    borderColor: '#C2C2C2',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  priceOriginalText: {
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
});

export default styles;