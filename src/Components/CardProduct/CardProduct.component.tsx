import React from 'react';

import { Image, Pressable, StyleSheet, View } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import GeneralText from '@Neurogine/ui-kit-general-text';
import { VARIANT } from '@Neurogine/ui-kit-general-text/dist/Constants';

import { calcOriginalPrice, type CardProductProps } from './CardProduct.helpers';
import CardProductSkeleton from './CardProductSkeleton.component';

export const CardProduct: React.FC<CardProductProps> = ({
  product,
  isLoading = false,
  onPress,
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

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9', width: 160, overflow: 'hidden' },
  image: { width: '100%', height: 140, backgroundColor: '#F8FAFC' },
  content: { padding: 10, gap: 3 },
  brand: { color: '#94A3B8', fontSize: 10, fontWeight: '500' },
  title: { color: '#0F172A', fontWeight: '600' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  price: { color: '#0F172A', fontWeight: '700' },
  originalPrice: { color: '#94A3B8', textDecorationLine: 'line-through', fontSize: 10 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  ratingText: { color: '#475569', fontWeight: '600', fontSize: 11 },
});

export default CardProduct;