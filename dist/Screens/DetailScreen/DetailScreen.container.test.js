import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable prefer-destructuring */
import { render } from '@testing-library/react-native';
import DetailScreenComponent from './DetailScreen.component';
import DetailsScreen from './DetailScreen.container';
import useProductDetail from '../../Hooks/UseProductDetail/UseProductDetail.hooks';
jest
    .mock('../../Hooks/UseProductDetail/UseProductDetail.hooks', () => ({
    __esModule: true,
    default: jest.fn(),
}))
    .mock('./DetailScreen.component', () => ({
    __esModule: true,
    default: jest.fn(() => null),
}));
describe('Detail screen container', () => {
    const mockNavigation = {
        push: jest.fn(),
        goBack: jest.fn(),
        dispatch: jest.fn(),
        setOptions: jest.fn(),
        isFocused: () => true,
    };
    const mockRoute = {
        params: {
            id: 1,
        },
    };
    const mockHookReturn = {
        data: { id: 1, title: 'Test Product' },
        isLoading: false,
        isError: false,
        fetchStatus: 'idle',
        showBottomSheet: false,
        refetch: jest.fn(),
    };
    beforeEach(() => {
        jest.clearAllMocks();
        useProductDetail.mockReturnValue(mockHookReturn);
    });
    it('should call detail component with correct props', async () => {
        await render(_jsx(DetailsScreen, { route: mockRoute, navigation: mockNavigation }));
        expect(DetailScreenComponent).toHaveBeenCalled();
        const passedProps = DetailScreenComponent.mock.calls[0][0];
        expect(passedProps.isLoading).toBeFalsy();
        expect(passedProps.data).toEqual(mockHookReturn.data);
        expect(passedProps.navigation).toEqual(mockNavigation);
    });
    it('should trigger navigation.push when selectProductSuggestion is called', async () => {
        await render(_jsx(DetailsScreen, { route: mockRoute, navigation: mockNavigation }));
        const passedProps = DetailScreenComponent.mock.calls[0][0];
        passedProps.selectProductSuggestion('999');
        expect(mockNavigation.push).toHaveBeenCalledWith('DetailScreen', { id: '999' });
    });
    it('should trigger goBack when onModalHide is called and isError is true', async () => {
        useProductDetail.mockReturnValue({
            ...mockHookReturn,
            isError: true,
        });
        await render(_jsx(DetailsScreen, { route: mockRoute, navigation: mockNavigation }));
        const passedProps = DetailScreenComponent.mock.calls[0][0];
        passedProps.onModalHide();
        expect(mockNavigation.goBack).toHaveBeenCalled();
    });
});
