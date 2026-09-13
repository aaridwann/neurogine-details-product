import React from 'react';

import { FlatList, RefreshControl, ScrollView, View, type TextStyle } from 'react-native';

import Ionicons, { type IoniconsIconName } from '@react-native-vector-icons/ionicons';
import { get, noop } from 'lodash';

import ButtonComponent from '@Neurogine/ui-kit-button';
import GeneralText from '@Neurogine/ui-kit-general-text';
import { VARIANT } from '@Neurogine/ui-kit-general-text/dist/Constants';

import styles from './DetailsScreen.styles';
import BadgeTextComponent from '../../Components/Badge';
import BottomSheet from '../../Components/BottomSheet';
import CardProduct from '../../Components/CardProduct';
import { ReviewCard } from '../../Components/CommentSection/CommentSection.component';
import ImageSlider from '../../Components/ImageSlider/ImageSlider.component';
import ReloadScreen from '../../Components/ReloadScreen/ReloadScreen.component';
import Skeleton from '../../Components/Shimmering/Shimmering.component';
import fixture from '../../Fixture/Products.json';

import type { DetailScreenComponentProps, InfoItem } from './DetailScreen.types';
import type { SliderItem } from '../../Components/ImageSlider/ImageSlider.component.types';
import type { ProductType, ReviewProductType, VoidFunction } from '../../Types';

const STAR_SIZE = 12;

const _mapProductToTwoSlides = (product?: ProductType | null): SliderItem[] => {
  if (!product) return [];

  const productId = get(product, 'id', '0');
  const title = get(product, 'title', '');
  const description = get(product, 'description', '');
  const category = get(product, 'category', '');
  const brand = get(product, 'brand', '') || category;
  const tags = get(product, 'tags', []) as string[];
  const firstImage = get(product, 'images[0]', '') || get(product, 'thumbnail', '') || '';
  const secondImage = get(product, 'thumbnail', '') || get(product, 'images[1]', '') || firstImage;
  const tagList = tags.length ? `#${tags.join(' #')}` : '';

  return [
    {
      id: `${productId}-slide-1`,
      image: firstImage,
      title,
      subtitle: description,
    },
    {
      id: `${productId}-slide-2`,
      image: secondImage,
      title: brand.toUpperCase(),
      subtitle: `Category: ${category} ${tagList}`.trim(),
    },
  ];
};

const _renderImageSlide = (product: ProductType | undefined | null, isLoading: boolean) => {
  const slidesData = _mapProductToTwoSlides(product);

  return (
    <ImageSlider
      autoPlayInterval={3500}
      data={slidesData}
      isLoading={isLoading}
    />
  );
};

const _renderTitle = (title: string, isLoading: boolean) => (
  isLoading ?
    <Skeleton width={'70%'} height={24} borderRadius={6} /> :
    <GeneralText variant={VARIANT.HEADLINE3}>
      {title}
    </GeneralText>
);

const _renderRating = (rating: number, reviewCount: number, isLoading: boolean) => (
  <View style={styles.ratingContainer}>
    {isLoading ? (
      <React.Fragment>
        <Skeleton borderRadius={4} height={20} width={24} />
        <Skeleton borderRadius={4} height={20} width={40} />
        <Skeleton borderRadius={4} height={20} width={80} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Ionicons color="#FBBF24" name="star" size={STAR_SIZE} />
        <GeneralText variant={VARIANT.BODY1}>
          {rating}
        </GeneralText>
        <GeneralText variant={VARIANT.BODY3}>
          ({reviewCount} reviews)
        </GeneralText>
      </React.Fragment>
    )}
  </View>
);

const calculateOriginalPrice = (price: number, discountPercentage: number): number => {
  return Math.round(price * (1 + discountPercentage / 100) * 100) / 100;
};

const _renderPrice = (price: number, discountPercentage: number, isLoading: boolean) => (
  <View style={styles.priceContainer}>
    {isLoading ? (
      <React.Fragment>
        <Skeleton borderRadius={4} height={20} width={100} />
        <Skeleton borderRadius={4} height={20} width={60} />
        <Skeleton borderRadius={4} height={20} width={30} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <GeneralText variant={VARIANT.HEADLINE2}>
          ${price}
        </GeneralText>
        <GeneralText style={styles.priceOriginalText} variant={VARIANT.HEADLINE4}>
          ${calculateOriginalPrice(price, discountPercentage)}
        </GeneralText>
        <BadgeTextComponent
          backgroundColor="rgba(0, 86, 148, 0.6)"
          color="#FFFFFF"
          text={`${discountPercentage}%`}
        />
      </React.Fragment>
    )}
  </View>
);

export const _renderTags = (tags: string[], isLoading: boolean) => (
  <View style={styles.tagsContainer}>
    {isLoading ? (
      <React.Fragment>
        <Skeleton borderRadius={8} height={32} width={60} />
        <Skeleton borderRadius={8} height={32} width={60} />
        <Skeleton borderRadius={8} height={32} width={60} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        {tags.map((tag) => (
          <BadgeTextComponent
            key={tag}
            backgroundColor="#EDEDED"
            color="#777777"
            style={styles.tagsBadge}
            text={tag.toUpperCase()}
          />
        ))}
      </React.Fragment>
    )}
  </View>
);

const _getShippingItems = (warranty: string, shipping: string, status: string): InfoItem[] => [
  { key: 'warranty', icon: 'shield-checkmark-outline', label: 'Warranty', value: warranty },
  { key: 'shipping', icon: 'cube-outline', label: 'Shipping', value: shipping },
  { key: 'status', icon: 'checkmark-circle-outline', label: 'Status', value: status, iconColor: '#10B981', textStyle: { color: '#10B981' } },
];

const ShippingRowItem: React.FC<{ item: InfoItem }> = ({ item }) => (
  <View style={styles.row}>
    <Ionicons color={item.iconColor || '#adadadff'} name={item.icon} size={18} />
    <GeneralText variant={VARIANT.LABEL3} style={[styles.text, item.textStyle]}>
      {item.label}: {item.value}
    </GeneralText>
  </View>
);

const _renderShippingAndStatus = (
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus: string,
  isLoading: boolean,
): React.ReactNode => {
  const items = _getShippingItems(
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
  );

  return (
    <View style={styles.shippingAndStatusContainer}>
      <View style={styles.shippingAndStatusList}>
        {isLoading ? (
          <View style={styles.shippingAndStatusSkeletonGroup}>
            <Skeleton borderRadius={8} height={18} width="35%" />
            <Skeleton borderRadius={8} height={18} width="50%" />
            <Skeleton borderRadius={8} height={18} width="25%" />
          </View>
        ) : (
          <React.Fragment>
            {items.map((item) => (
              <ShippingRowItem key={item.key} item={item} />
            ))}
          </React.Fragment>
        )}
      </View>
    </View>
  );
};

export const _renderDescription = (description: string,  isLoading: boolean) => (
  <View style={styles.descriptionWrapper}>
    {isLoading ? (
      <Skeleton borderRadius={8} height={24} width="35%" />
    ) : (
      <GeneralText variant={VARIANT.HEADLINE3}>
        Description
      </GeneralText>
    )}

    {isLoading ? (
      <View style={styles.descriptionSkeletonGroup}>
        <Skeleton borderRadius={8} height={14} width="35%" />
        <Skeleton borderRadius={8} height={14} width="50%" />
        <Skeleton borderRadius={8} height={14} width="25%" />
        <Skeleton borderRadius={8} height={14} width="45%" />
        <Skeleton borderRadius={8} height={14} width="80%" />
      </View>
    ) : (
      <GeneralText style={styles.descriptionBody} variant={VARIANT.BODY3}>
        {description}
      </GeneralText>
    )}
  </View>
);

const _renderReview = (reviews: ReviewProductType[], isLoading: boolean) => (
  <View>
    {isLoading ?
      <Skeleton width={'35%'} height={24} borderRadius={8} /> :
      <GeneralText variant={VARIANT.HEADLINE3}>
        Reviews
      </GeneralText>
    }
    <View style={styles.listReview}>
      {reviews.map((item, index) => (
        <ReviewCard isLoading={isLoading} key={`${item.reviewerEmail}-${index}`} review={item} />
      ))}
    </View>
  </View>
);

export const _renderProductSuggestion = (products: ProductType[], isLoading: boolean, selectProductSuggestion) => (
  <View style={styles.productSuggestionWrapper}>
    <GeneralText style={styles.productSuggestionTitle} variant={VARIANT.HEADLINE3}>
      Products You May Like
    </GeneralText>
    <FlatList
      contentContainerStyle={styles.productSuggestionListContainer}
      data={isLoading ? [1, 2, 3] : products}
      horizontal
      keyExtractor={(item, index) =>
        isLoading ? `skeleton-${index}` : (item as ProductType).id.toString()
      }
      renderItem={({ item }) => (
        <CardProduct
          isLoading={isLoading}
          onPress={(p) => selectProductSuggestion(p.id)}
          product={isLoading ? undefined : (item as ProductType)}
        />
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

const _renderStickyContent = (isLoading: boolean) => (
  <View style={styles.containerButton}>
    {isLoading ? (
      <Skeleton borderRadius={60} height={48} width="15%" />
    ) : (
      <ButtonComponent
        isLoading={isLoading}
        onPress={noop}
        style={styles.wishlistButton}
        title={<Ionicons color="#acacacff" name="heart-outline" size={24} />}
      />
    )}

    {isLoading ? (
      <Skeleton borderRadius={60} height={48} width="80%" />
    ) : (
      <ButtonComponent
        isLoading={isLoading}
        onPress={noop}
        style={styles.cartButton}
        title={
          <GeneralText style={styles.cartButtonText} variant={VARIANT.LABEL1}>
            Add to Cart
          </GeneralText>
        }
      />
    )}
  </View>
);

const _renderDetailBody = (
  data: ProductType,
  isLoading: boolean,
  selectProductSuggestion: (id: string) => void,
) => (
  <View style={styles.detailScreenBodyContainer}>
    {_renderTitle(data.title, isLoading)}
    {_renderRating(data.rating, get(data, 'reviews.length', 0), isLoading)}
    {_renderPrice(data.price, data.discountPercentage, isLoading)}
    {_renderTags(data.tags, isLoading)}
    {_renderShippingAndStatus(data.warrantyInformation, data.shippingInformation,
      data.availabilityStatus, isLoading)}
    {_renderDescription(data.description, isLoading)}
    {_renderReview(get(data, 'reviews', []), isLoading)}
    {_renderProductSuggestion(fixture, isLoading, selectProductSuggestion)}
  </View>
);

const _gerPropsPullToRefresh = (refreshing: boolean, onRefresh: () => void) => ({
  refreshControl:
    <RefreshControl
      colors={['#3aa6ffff', '#6db5ffff']}
      onRefresh={onRefresh}
      progressBackgroundColor="#FFFFFF"
      refreshing={refreshing}
      tintColor="#3aa6ffff"
      title={'Loading...'}
      titleColor="#3aa6ffff"
    />,
});

const _renderBottomSheet = (showBottomSheet: boolean, refetch: VoidFunction, goBack: VoidFunction, onModalHide: VoidFunction) => (
  <BottomSheet onCloseBottomSheet={onModalHide} snapPoints={['80%']} sheetColor="#558cc3ff" show={showBottomSheet}>
    <ReloadScreen secondButtonOnPress={goBack} onReload={refetch} />
  </BottomSheet>
);

const _getScrollViewConfig = (refreshing: boolean, onRefresh: VoidFunction) => ({
  ..._gerPropsPullToRefresh(refreshing, onRefresh),
  contentContainerStyle: styles.detailScreenScrollContent,
});

const DetailScreenComponent = ({
  data = {}, isLoading = true, goBack,
  refetch, isRefecthing, selectProductSuggestion = noop, showBottomSheet, onModalHide,
}: DetailScreenComponentProps) => (
  <React.Fragment>
    <ScrollView {..._getScrollViewConfig(isRefecthing, refetch)}>
      {_renderImageSlide(data, isLoading)}
      {_renderDetailBody(data, isLoading, selectProductSuggestion)}
    </ScrollView>
    {_renderStickyContent(isLoading)}
    {_renderBottomSheet(showBottomSheet, refetch, goBack, onModalHide)}
  </React.Fragment>
);

export default DetailScreenComponent;