import { apiClient } from '@Neurogine/core-network';
import { fetchProductsDetail } from './ProductDetailService';
jest.mock('@Neurogine/core-network', () => ({
    apiClient: {
        get: jest.fn(),
    },
}));
describe('fetchProductsDetail API Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should successfully fetch product detail by id', async () => {
        const mockProduct = {
            id: 1,
            title: 'Wireless Ergonomic Mouse',
            price: 299900,
        };
        apiClient.get.mockResolvedValueOnce({
            data: mockProduct,
        });
        const result = await fetchProductsDetail('1');
        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith('/products/1');
        expect(result).toEqual(mockProduct);
    });
    it('should throw an error when API request fails', async () => {
        const mockError = new Error('Network Error');
        apiClient.get.mockRejectedValueOnce(mockError);
        await expect(fetchProductsDetail('999')).rejects.toThrow('Network Error');
        expect(apiClient.get).toHaveBeenCalledWith('/products/999');
    });
});
