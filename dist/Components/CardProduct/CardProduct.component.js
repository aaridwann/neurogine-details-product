import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image, Pressable, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import GeneralText, { Constants } from '@Neurogine/ui-kit-general-text';
import styles from './CardProduct.component.styles';
import CardProductSkeleton from './CardProductSkeleton.component';
import { calcOriginalPrice } from '../../Utils/Data/Data.utils';
const { VARIANT } = Constants;
export const CardProduct = ({ product, isLoading = false, onPress, }) => {
    if (isLoading || !product)
        return _jsx(CardProductSkeleton, {});
    const originalPrice = calcOriginalPrice(product.price, product.discountPercentage);
    return (_jsxs(Pressable, { style: styles.card, onPress: () => onPress?.(product), children: [_jsx(Image, { source: { uri: product.thumbnail }, style: styles.image, resizeMode: "cover" }), _jsxs(View, { style: styles.content, children: [Boolean(product.brand) && (_jsx(GeneralText, { variant: VARIANT.LABEL1, style: styles.brand, children: product.brand })), _jsx(GeneralText, { variant: VARIANT.LABEL2, numberOfLines: 1, style: styles.title, children: product.title }), _jsxs(View, { style: styles.priceContainer, children: [_jsxs(GeneralText, { variant: VARIANT.LABEL1, style: styles.price, children: ["$", product.price.toFixed(2)] }), originalPrice !== '' && (_jsxs(GeneralText, { variant: VARIANT.LABEL3, style: styles.originalPrice, children: ["$", originalPrice] }))] }), _jsxs(View, { style: styles.ratingRow, children: [_jsx(Ionicons, { name: "star", size: 12, color: "#F59E0B" }), _jsx(GeneralText, { variant: VARIANT.BODY1, style: styles.ratingText, children: product.rating.toFixed(1) })] })] })] }));
};
CardProduct.displayName = 'CardProduct';
export default CardProduct;
