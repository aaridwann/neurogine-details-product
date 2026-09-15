import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@Neurogine/core-network';
import { snackbarActions } from '@Neurogine/root';
import ProductDetailService from '../../Service/ProductDetail';
const { fetchProductsDetail } = ProductDetailService;
const useProductDetail = (id) => {
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: ['product-detail', id],
        // === Mock for get error detail ===
        queryFn: () => fetchProductsDetail(id === '1' ? '0' : id),
        // queryFn: () => fetchProductsDetail(id),
        enabled: Boolean(id),
    });
    useEffect(() => {
        if (query.isError) {
            setShowBottomSheet(true);
            dispatch(snackbarActions.showSnackbar({
                type: 'error',
                title: 'Something went wrong',
                message: 'An unexpected error occurred. Please try again later.',
                position: 'top',
                duration: 5000,
            }));
        }
        else
            setShowBottomSheet(false);
    }, [query.isError]);
    return {
        ...query,
        products: query.data,
        showBottomSheet,
        setShowBottomSheet,
    };
};
export default useProductDetail;
