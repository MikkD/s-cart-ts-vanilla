import { useReducer, createContext } from 'react';
import {
    CartContextType,
    CartItemType,
    Action,
    State,
    SHOPPING_CART_TYPES,
} from '../types/types';

const INITIAL_STATE = {
    cartItems: [],
};

const shoppingCartReducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case SHOPPING_CART_TYPES.ADD_TO_CART:
            // eslint-disable-next-line no-case-declarations
            const addItemToCart = (cartItems, item) => {
                console.log('🚀 ~ ~ payload ~ item:', item);
                console.log('🚀 ~ ~ addItemToCart ~ cartItems:', cartItems);
                const itemInCart = cartItems.find(
                    (cartItem) => cartItem.id === item.id && cartItem.cartQty
                );
                if (!itemInCart) return [...cartItems, { ...item, cartQty: 1 }];
                console.log(
                    '🚀 ~ file: ShoppingCart.tsx:23 ~ addItemToCart ~ itemInCart:',
                    itemInCart
                );

                return cartItems.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            cartQty: cartItem.cartQty + 1,
                            total: (cartItem.cartQty + 1) * Number(cartItem.price),
                        };
                    }
                    return cartItem;
                });
            };

            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, payload),
            };
        case SHOPPING_CART_TYPES.SUBSTRACT_FROM_CART:
            // eslint-disable-next-line no-case-declarations
            const substractItemFromCart = (cartItems, item) => {
                return cartItems.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            cartQty: cartItem.cartQty > 0 ? cartItem.cartQty - 1 : 0,
                            total:
                                cartItem.cartQty > 0
                                    ? (cartItem.cartQty - 1) * Number(cartItem.price)
                                    : 0,
                        };
                    }
                    return cartItem;
                });
            };
            return {
                ...state,
                cartItems: substractItemFromCart(state.cartItems, payload),
            };
        case SHOPPING_CART_TYPES.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (cartItem) => cartItem.id !== payload.id
                ),
            };
        default:
            return state;
    }
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(shoppingCartReducer, INITIAL_STATE);
    return (
        <CartContext.Provider value={{ state, dispatch, SHOPPING_CART_TYPES }}>
            {children}
        </CartContext.Provider>
    );
};
