afterEach(() => {
  jest.clearAllMocks();
});

jest
  .mock('@Neurogine/ui-kit-general-text', () => {
  const React = jest.requireActual('react');

  return {
    __esModule: true,
    default: ({ children, style, testID, numberOfLines, ellipsizeMode }: any) => {
      const simpleProps = {
        style,
        testID,
        numberOfLines,
        ellipsizeMode,
      };

      return React.createElement(
        'GeneralText',
        simpleProps,
        children
      );
    },
    Constants: {
      VARIANT: {
        LABEL1: 'LABEL1',
        LABEL2: 'LABEL2',
        LABEL3: 'LABEL3',
      },
    },
  };
})
.mock('@gorhom/bottom-sheet', () => {
  const React = jest.requireActual('react');
  const { View } = jest.requireActual('react-native');

  const MockBottomSheet = React.forwardRef(({ children }: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      expand: jest.fn(),
      collapse: jest.fn(),
      close: jest.fn(),
      snapToIndex: jest.fn(),
    }));

    return React.createElement(View, { testID: 'mock-bottom-sheet' }, children);
  });

  return {
    __esModule: true,
    default: MockBottomSheet,
    BottomSheetModal: MockBottomSheet,
    BottomSheetView: ({ children, style }: any) => (
      React.createElement(View, { style }, children)
    ),
    BottomSheetBackdrop: (props: any) => (
      React.createElement(View, { testID: 'mock-bottom-sheet-backdrop', ...props })
    ),
    BottomSheetScrollView: ({ children, style }: any) => (
      React.createElement(View, { style }, children)
    ),
    useBottomSheet: () => ({
      expand: jest.fn(),
      collapse: jest.fn(),
      close: jest.fn(),
    }),
    useBottomSheetModal: () => ({
      dismiss: jest.fn(),
    }),
  };
})
.mock('@react-native-vector-icons/ionicons', () => {
  const React = jest.requireActual('react');
  const { Text } = jest.requireActual('react-native');

  const MockIcon = React.forwardRef(({ name, size, color, style, testID }, ref) => {
    return React.createElement(
      Text,
      {
        ref,
        testID: testID || `icon-${name}`,
        style: [{ fontSize: size, color }, style],
        // ...rest,
      },
      `Icon: ${name}`
    );
  });

  MockIcon.getImageSource = jest.fn().mockResolvedValue({ uri: 'mocked-icon-uri' });
  MockIcon.getImageSourceSync = jest.fn().mockReturnValue({ uri: 'mocked-icon-uri' });
  MockIcon.loadFont = jest.fn().mockResolvedValue(true);
  MockIcon.hasIcon = jest.fn().mockReturnValue(true);

  return {
    __esModule: true,
    default: MockIcon,
  };
})
.mock('react-native-reanimated', () => {
  const React = jest.requireActual('react');
  const { View, Text, Image, ScrollView } = jest.requireActual('react-native');

  return {
    __esModule: true,

    useSharedValue: jest.fn((initialValue) => ({
      value: initialValue,
    })),
    useAnimatedStyle: jest.fn((updater) => {
      if (typeof updater === 'function') {
        return updater();
      }
      return updater || {};
    }),
    withTiming: jest.fn((toValue, _config, callback) => {
      if (callback) callback(true);
      return toValue;
    }),
    withSpring: jest.fn((toValue, _config, callback) => {
      if (callback) callback(true);
      return toValue;
    }),
    withRepeat: jest.fn((animation) => animation),
    withSequence: jest.fn((...animations) => animations[animations.length - 1]),
    withDelay: jest.fn((_delay, animation) => animation),

    default: {
      View: React.forwardRef((props, ref) => <View ref={ref} {...props} />),
      Text: React.forwardRef((props, ref) => <Text ref={ref} {...props} />),
      Image: React.forwardRef((props, ref) => <Image ref={ref} {...props} />),
      ScrollView: React.forwardRef((props, ref) => <ScrollView ref={ref} {...props} />),
      createAnimatedComponent: (Component) =>
        React.forwardRef((props, ref) => <Component ref={ref} {...props} />),
    },
  };
})
.mock('@Neurogine/ui-kit-button', () => 'UI-Kit-Button');

global.__reanimatedWorkletInit = jest.fn();
