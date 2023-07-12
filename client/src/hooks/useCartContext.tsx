import { useContext } from 'react';
import { CartContext } from '../context/ShoppingCart';
import { CartContextType } from '../types/types';

export const useCartContext = () => {
    const cartContext = useContext<CartContextType | null>(CartContext);

    if (!cartContext) {
        throw new Error('cartContext is not provided');
    }

    return cartContext;
};
