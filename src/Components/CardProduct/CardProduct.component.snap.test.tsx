import CardProduct from './CardProduct.component';
import { runSnapshotTests, type SnapshotTestConfig } from '../../Utils/Test/Test.utils';

import type { CardProductProps, ProductItem } from './CardProduct.types';

describe('Card Product Component Snapshots', () => {
  const dummyProduct: ProductItem = {
    id: 1,
    title: 'Product Title Standard',
    brand: 'Brand Name',
    price: 150000,
    discountPercentage: 15,
    rating: 4.5,
    thumbnail: 'https://example.com/thumbnail.jpg',
  };

  const configs: SnapshotTestConfig<CardProductProps>[] = [
    {
      desc: 'should match snapshot with default empty props',
      props: {},
    },
    {
      desc: 'should match snapshot when isLoading is true',
      props: {
        isLoading: true,
      },
    },
    {
      desc: 'should match snapshot when isLoading is false without product',
      props: {
        isLoading: false,
      },
    },
    {
      desc: 'should match snapshot with complete product data and discount',
      props: {
        product: dummyProduct,
        isLoading: false,
      },
    },
    {
      desc: 'should match snapshot with complete product data and onPress callback',
      props: {
        product: dummyProduct,
        isLoading: false,
        onPress: jest.fn(),
      },
    },
    {
      desc: 'should match snapshot without optional brand property',
      props: {
        product: {
          id: 2,
          title: 'Product Without Brand',
          price: 200000,
          rating: 4.0,
          thumbnail: 'https://example.com/thumbnail2.jpg',
        },
      },
    },
    {
      desc: 'should match snapshot without optional discountPercentage property',
      props: {
        product: {
          id: 3,
          title: 'Product Without Discount',
          brand: 'Brand B',
          price: 300000,
          rating: 5.0,
          thumbnail: 'https://example.com/thumbnail3.jpg',
        },
      },
    },
    {
      desc: 'should match snapshot without both brand and discountPercentage',
      props: {
        product: {
          id: 4,
          title: 'Minimal Product Item',
          price: 99000,
          rating: 3.5,
          thumbnail: 'https://example.com/thumbnail4.jpg',
        },
      },
    },
    {
      desc: 'should match snapshot with zero price and zero discount',
      props: {
        product: {
          ...dummyProduct,
          id: 5,
          price: 0,
          discountPercentage: 0,
        },
      },
    },
    {
      desc: 'should match snapshot with 100% discount percentage',
      props: {
        product: {
          ...dummyProduct,
          id: 6,
          discountPercentage: 100,
        },
      },
    },
    {
      desc: 'should match snapshot with minimum rating 0',
      props: {
        product: {
          ...dummyProduct,
          id: 7,
          rating: 0,
        },
      },
    },
    {
      desc: 'should match snapshot with maximum rating 5',
      props: {
        product: {
          ...dummyProduct,
          id: 8,
          rating: 5,
        },
      },
    },
    {
      desc: 'should match snapshot with long product title and long brand name',
      props: {
        product: {
          ...dummyProduct,
          id: 9,
          title: 'Very Long Product Title That Should Test Text Truncation Or Wrapping Behavior In Card',
          brand: 'Super Extra Long Brand Name International Official Store',
        },
      },
    },
  ];

  runSnapshotTests<CardProductProps>(CardProduct, configs);
});