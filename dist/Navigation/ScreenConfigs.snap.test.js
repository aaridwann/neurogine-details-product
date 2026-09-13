import { DetailRoutes } from '../Shared';
import ScreenConfigs from './ScreenConfigs';
jest
    .mock('../Components/Header/Header.component', () => ({
    __esModule: true,
    default: jest.fn(() => null),
})).mock('../Screens/DetailScreen', () => ({
    __esModule: true,
    default: 'DetailScreen',
}));
describe('ScreenConfigs Configuration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should define correct route configuration array', () => {
        expect(ScreenConfigs).toHaveLength(1);
        expect(ScreenConfigs[0].name).toEqual(DetailRoutes.DETAIL_ROUTE);
        expect(ScreenConfigs[0].component).toBeDefined();
        expect(ScreenConfigs[0].options).toBeDefined();
        expect(typeof ScreenConfigs[0]?.options?.header).toBe('function');
    });
});
