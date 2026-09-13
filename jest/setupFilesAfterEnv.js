// 1. Extend Jest matchers dari React Native Testing Library (e.g., toBeOnTheScreen, toBeVisible)
import '@testing-library/react-native/extend-expect';

// 2. Mock Bawaan React Native Native Modules & Timer Utilities
import 'react-native-gesture-handler/jestSetup';

// 3. Matikan Warning "Animated: `useNativeDriver` is not supported"
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// 4. Mock Global Fetch (jika feature module melakukan API call)
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
  })
);

// 5. Mock React Native Reanimated (Opsional - aman di-try catch jika tidak terpasang)
try {
  jest.mock('react-native-reanimated', () => {
    const reanimated = require('react-native-reanimated/mock');
    reanimated.default.call = () => {};
    return reanimated;
  });
} catch (error) {
  // Disimpan silent jika proyek tidak menggunakan react-native-reanimated
}

// 6. Mock React Navigation (Opsional - aman jika tidak terpasang)
try {
  jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn(() => () => {}),
      }),
      useRoute: () => ({
        params: {},
      }),
    };
  });
} catch (error) {
  // Silent jika tidak terpasang
}

// 7. Supress console warnings/errors umum saat snapshot/test run
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('React.createElement: type is invalid') ||
        args[0].includes('Warning: An update to') ||
        args[0].includes('ReactDOM.render is no longer supported'))
    ) {
      return;
    }
    originalError(...args);
  };

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Animated: `useNativeDriver`')
    ) {
      return;
    }
    originalWarn(...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// 8. Auto-reset mock timer & fn setelah tiap test suite selesai
afterEach(() => {
  jest.clearAllMocks();
});