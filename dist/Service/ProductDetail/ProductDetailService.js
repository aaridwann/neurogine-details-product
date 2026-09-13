import { apiClient } from '@Neurogine/core-network';
const PATH_NAME = '/products';
/**
 * Fetches single product detail by ID
 * @param {string} id Product ID
 * @returns {Promise<ProductType>} Single product data
 */
export const fetchProductsDetail = async (id) => {
    const { data } = await apiClient.get(`${PATH_NAME}/${id}`);
    return data;
};
export default {
    fetchProductsDetail,
};
