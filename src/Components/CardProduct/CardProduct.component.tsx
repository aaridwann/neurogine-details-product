import React from 'react';

import { Image, Pressable, View } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import GeneralText, { Constants } from '@Neurogine/ui-kit-general-text';

import styles from './CardProduct.component.styles';
import { type CardProductProps } from './CardProduct.types';
import CardProductSkeleton from './CardProductSkeleton.component';
import { calcOriginalPrice } from '../../Utils/Data/Data.utils';

const { VARIANT } = Constants;

export const CardProduct: React.FC<CardProductProps> = ({
  product, isLoading = false, onPress,
}) => {

  if (isLoading || !product) return <CardProductSkeleton />;

  const originalPrice = calcOriginalPrice(product.price, product.discountPercentage);

  return (
    <Pressable style={styles.card} onPress={() => onPress?.(product)}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        {Boolean(product.brand) && (
          <GeneralText variant={VARIANT.LABEL1} style={styles.brand}>
            {product.brand}
          </GeneralText>
        )}
        <GeneralText variant={VARIANT.LABEL2} numberOfLines={1} style={styles.title}>
          {product.title}
        </GeneralText>
        <View style={styles.priceContainer}>
          <GeneralText variant={VARIANT.LABEL1} style={styles.price}>
             ${product.price.toFixed(2)}
          </GeneralText>
          {originalPrice !== '' && (
            <GeneralText variant={VARIANT.LABEL3} style={styles.originalPrice}>
               ${originalPrice}
            </GeneralText>
          )}
        </View>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#F59E0B" />
          <GeneralText variant={VARIANT.BODY1} style={styles.ratingText}>
            {product.rating.toFixed(1)}
          </GeneralText>
        </View>
      </View>
    </Pressable>
  );
};

CardProduct.displayName = 'CardProduct';

export default CardProduct;