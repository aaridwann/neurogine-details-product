import DetailScreenComponent from './DetailScreen.component';
import { runSnapshotTests, type SnapshotTestConfig } from '../../Utils/Test/Test.utils';

import type { DetailScreenComponentProps } from './DetailScreen.types';
import type { ProductType } from '../../Types';

jest.mock('react-native/Libraries/Components/ScrollView/ScrollView', () => {
  const React = jest.requireActual('react');

  return {
    __esModule: true,
    default: React.forwardRef(({
      children,
      testID,
      style,
      contentContainerStyle,
    }: any, ref: any) => {
      const simpleProps = {
        testID,
        style,
        contentContainerStyle,
        ref,
      };

      return React.createElement('ScrollView', simpleProps, children);
    }),
  };
});

jest.mock('@react-native-vector-icons/ionicons', () => {
  const React = jest.requireActual('react');

  return {
    __esModule: true,
    default: ({ name, size, color, testID, style }: any) => {
      const simpleProps = {
        name,
        size,
        color,
        testID: testID || `icon-${name}`,
        style,
      };

      return React.createElement('MockIonIcon', simpleProps);
    },
  };
});

jest.mock('react-native/Libraries/Lists/FlatList', () => {
  const React = jest.requireActual('react');

  return {
    __esModule: true,
    default: ({
      data, renderItem, testID, style,
      contentContainerStyle, horizontal, showsHorizontalScrollIndicator,
    }: any) => {
      const renderedItems = (data || []).map((item: any, index: number) => {
        const element = renderItem({ item, index, separators: {} });

        return React.cloneElement(element, { key: index });
      });

      const simpleProps = {
        testID: testID || 'mock-flat-list',
        style,
        contentContainerStyle,
        horizontal,
        showsHorizontalScrollIndicator,
        data,
        renderItem,
      };

      return React.createElement('FlatList', simpleProps, renderedItems);
    },
  };
});

jest.mock('react-native/Libraries/Components/RefreshControl/RefreshControl', () => 'R');

jest.mock('@Neurogine/ui-kit-button', () => ({
  __esModule: true,
  default: jest.fn(({ title, onPress, disabled, testID, style }) => {
    const React = jest.requireActual('react');    let safeTitle = title;
    if (typeof title === 'object' && title !== null) {
      if (title.props?.name) {
        safeTitle = `Icon: ${title.props.name}`;
      } else {
        safeTitle = 'Custom Element';
      }
    }

    return React.createElement(
      'Button-UI-KIT',
      { testID: testID || 'mock-button', onPress, disabled, style },
      safeTitle,
    );
  }),
}));

jest.mock('./DetailsScreen.styles', () => ({
  __esModule: true,
  default: {
    container: {},
    contentContainer: {},
    title: {},
  },
}));

jest.mock('../../Components/Badge', () => 'Badge-Component');
jest.mock('../../Components/BottomSheet', () => 'Bottom-Sheet');
jest.mock('../../Components/CardProduct', () => 'Card-Product');
jest.mock('../../Components/CommentSection/CommentSection.component', () => 'Comment-Section');
jest.mock('../../Components/ImageSlider/ImageSlider.component', () => 'Image-Slider');
jest.mock('../../Components/ReloadScreen/ReloadScreen.component', () => 'Reload-Screen');
jest.mock('../../Components/Shimmering/Shimmering.component', () => 'Shimmering');

jest.mock('../../Fixture/Products.json', () => ({
  __esModule: true,
  default: [],
}));

jest.mock('../../Utils/Data/Data.utils', () => ({
  __esModule: true,
  mapProductToTwoSlides: jest.fn((data) => data),
}));

describe('Detail Screen Component Snapshots', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  const mockNavigation: any = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    setOptions: jest.fn(),
    isFocused: () => true,
  };

  const mockProductData: ProductType = {
    id: 1,
    title: 'Wireless Ergonomic Mouse',
    description: 'A comfortable ergonomic mouse designed for long working hours.',
    category: 'electronics',
    price: 299900,
    discountPercentage: 15.5,
    rating: 4.8,
    stock: 45,
    tags: ['electronics', 'accessories'],
    brand: 'LogiTech',
    sku: 'LOG-WEM-001',
    weight: 120,
    dimensions: { width: 8.5, height: 4.2, depth: 12.0 },
    warrantyInformation: '1 Year Warranty',
    shippingInformation: 'Ships in 2 days',
    availabilityStatus: 'In Stock',
    reviews: [],
    returnPolicy: '30-day return',
    minimumOrderQuantity: 1,
    meta: { createdAt: '2026-01-01', updatedAt: '2026-05-01', barcode: '123', qrCode: 'abc' },
    images: ['https://assets.example.com/images/1-1.png'],
    thumbnail: 'https://assets.example.com/images/1-thumb.png',
  };

  const defaultProps: DetailScreenComponentProps = {
    title: 'Detail Produk',
    refetch: jest.fn(),
    data: mockProductData,
    navigation: mockNavigation,
    isLoading: false,
    isRefecthing: false,
    selectProductSuggestion: jest.fn(),
    showBottomSheet: false,
    goBack: jest.fn(),
    onModalHide: jest.fn(),
  };

  const configs: SnapshotTestConfig<DetailScreenComponentProps>[] = [
    {
      desc: 'should match snapshot with standard loaded product data',
      props: defaultProps,
    },
    {
      desc: 'should match snapshot when component is in loading state',
      props: { ...defaultProps, isLoading: true, data: undefined },
    },
  ];

  runSnapshotTests<DetailScreenComponentProps>(DetailScreenComponent, configs);
});