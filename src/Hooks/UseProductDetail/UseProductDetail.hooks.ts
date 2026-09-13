import { useQuery } from '@Neurogine/core-network';

import ProductDetailService from '../../Service/ProductDetail';

const { fetchProductsDetail } = ProductDetailService;

const useProductDetail = (id: string) => {
  const query = useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => fetchProductsDetail(id),
    enabled: Boolean(id),
  });

  return {
    ...query,
    products: query.data,
  };
};

export default useProductDetail;