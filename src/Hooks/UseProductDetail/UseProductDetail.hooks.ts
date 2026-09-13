import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useQuery } from '@Neurogine/core-network';
import { snackbarActions } from '@Neurogine/root';

import ProductDetailService from '../../Service/ProductDetail';

const { fetchProductsDetail } = ProductDetailService;

const useProductDetail = (id: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {

      dispatch(snackbarActions.showSnackbar({
        type: 'error',
        title: 'Error',
        message: 'Operation completed successfully',
        position: 'bottom',
        duration: 3000,
      }));
    }, 2000);
  }, []);

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