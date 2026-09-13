import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import { useQuery } from '@Neurogine/core-network';
import { snackbarActions } from '@Neurogine/root';
import useProductDetail from './UseProductDetail.hooks';
import ProductDetailService from '../../Service/ProductDetail';
jest.
    mock('react-redux', () => ({
    useDispatch: jest.fn(),
}))
    .mock('@Neurogine/core-network', () => ({
    useQuery: jest.fn().mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
    }),
}))
    .mock('@Neurogine/root', () => ({
    snackbarActions: {
        showSnackbar: jest.fn((payload) => ({
            type: 'SNACKBAR/SHOW',
            payload,
        })),
    },
}))
    .mock('../../Service/ProductDetail', () => ({
    fetchProductsDetail: jest.fn(),
}));
describe('useProductDetail Hook', () => {
    const mockDispatch = jest.fn();
    const mockProductId = 'product-123';
    const mockProductData = {
        id: 'product-123',
        title: 'Sepatu Sport Premium',
        price: 750000,
    };
    beforeEach(() => {
        jest.clearAllMocks();
        useDispatch.mockReturnValue(mockDispatch);
    });
    it('should initialize useQuery correctly and pass products data when successful', async () => {
        useQuery.mockReturnValue({
            data: mockProductData,
            isLoading: false,
            isError: false,
        });
        const { result } = await renderHook(() => useProductDetail(mockProductId));
        expect(useQuery).toHaveBeenCalledWith({
            queryKey: ['product-detail', mockProductId],
            queryFn: expect.any(Function),
            enabled: true,
        });
        expect(result.current.products).toEqual(mockProductData);
        expect(result.current.showBottomSheet).toBe(false);
    });
    it('should call fetchProductsDetail inside queryFn', async () => {
        useQuery.mockImplementation(({ queryFn }) => {
            if (queryFn)
                queryFn();
            return { data: mockProductData, isLoading: false, isError: false };
        });
        await renderHook(() => useProductDetail(mockProductId));
        expect(ProductDetailService.fetchProductsDetail).toHaveBeenCalledWith(mockProductId);
    });
    it('should set enabled to false when id is empty string', async () => {
        useQuery.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: false,
        });
        await renderHook(() => useProductDetail(''));
        expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
            enabled: false,
        }));
    });
    it('should show bottom sheet and dispatch error snackbar when isError is true', async () => {
        useQuery.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
        });
        const { result } = await renderHook(() => useProductDetail(mockProductId));
        await waitFor(() => {
            expect(result.current.showBottomSheet).toBe(true);
        });
        expect(snackbarActions.showSnackbar).toHaveBeenCalledWith({
            type: 'error',
            title: 'Something went wrong',
            message: 'An unexpected error occurred. Please try again later.',
            position: 'top',
            duration: 5000,
        });
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SNACKBAR/SHOW',
            payload: {
                type: 'error',
                title: 'Something went wrong',
                message: 'An unexpected error occurred. Please try again later.',
                position: 'top',
                duration: 5000,
            },
        });
    });
    it('should reset showBottomSheet to false when recovering from error state', async () => {
        useQuery.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
        });
        const { result, rerender } = await renderHook(() => useProductDetail(mockProductId));
        expect(result.current.showBottomSheet).toBe(true);
        useQuery.mockReturnValue({
            data: mockProductData,
            isLoading: false,
            isError: false,
        });
        await rerender({});
        expect(result.current.showBottomSheet).toBe(false);
    });
    it('should update showBottomSheet state when calling setShowBottomSheet manually', async () => {
        useQuery.mockReturnValue({
            data: mockProductData,
            isLoading: false,
            isError: false,
        });
        const { result } = await renderHook(() => useProductDetail(mockProductId));
        expect(result.current.showBottomSheet).toBe(false);
        await act(async () => {
            result.current.setShowBottomSheet(true);
        });
        expect(result.current.showBottomSheet).toBe(true);
    });
});
