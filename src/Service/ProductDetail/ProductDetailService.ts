import { apiClient } from '@Neurogine/core-network';

import type { ProductType } from '../../Types';

const PATH_NAME = '/products';

/**
 * Fetches single product detail by ID
 * @param {string} id Product ID
 * @returns {Promise<ProductType>} Single product data
 */
export const fetchProductsDetail = async (id: string): Promise<ProductType> => {
  const { data } = await apiClient.get<ProductType>(`${PATH_NAME}/${id}`);
  console.log('===> product detail data:', data);

  // REST API detail (/products/2) mengembalikan object produk langsung pada `data`
  return data;
};

export default {
  fetchProductsDetail,
};