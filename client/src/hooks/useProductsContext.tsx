import { useContext } from 'react';
import { ProductsContext } from '../context/Products';
import { ProductsContextType } from '../types/types';

export const useProductsContext = () => {
    const productContext = useContext<ProductsContextType>(ProductsContext);
    if (!productContext) {
        throw new Error('productContext is not provided');
    }

    return productContext;
};
