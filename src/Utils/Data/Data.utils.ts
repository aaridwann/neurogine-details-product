import get from 'lodash/get';

import type { SliderItem } from '../../Components/ImageSlider/ImageSlider.component.types';
import type { ProductType } from '../../Types';

const mapProductToTwoSlides = (product?: ProductType | null): SliderItem[] => {
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

const calcOriginalPrice = (price: number, discount = 0): string => {
  if (discount <= 0) return '';

  return (price * (1 + discount / 100)).toFixed(2);
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return new Date(dateString).toLocaleDateString('en-US', options);
};

export { mapProductToTwoSlides, calcOriginalPrice, formatDate };