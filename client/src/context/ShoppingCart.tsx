import { useReducer, createContext, useMemo } from 'react';
import {
    CartContextType,
    Action,
    State,
    SHOPPING_CART_REDUCER_ACTIONS,
    CartProviderType,
    ProductType,
    CartItemType,
} from '../types/types';

const INITIAL_STATE = {
    cartItems: [],
};

const addItemToCart = (cartItems: CartItemType[], item: ProductType) => {
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (!itemInCart)
        return [...cartItems, { ...item, cartQty: 1, total: 1 * Number(item.price) }];

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

const substractItemFromCart = (cartItems: CartItemType[], item: ProductType) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (!cartItem) return cartItems;

    if (cartItem.cartQty === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== item.id);
    }

    return cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
            return {
                ...cartItem,
                cartQty: cartItem.cartQty - 1,
                total: (cartItem.cartQty - 1) * Number(cartItem.price),
            };
        }
        return cartItem;
    });
};

const shoppingCartReducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case SHOPPING_CART_REDUCER_ACTIONS.ADD_TO_CART:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, payload),
            };
        case SHOPPING_CART_REDUCER_ACTIONS.SUBSTRACT_FROM_CART:
            return {
                ...state,
                cartItems: substractItemFromCart(state.cartItems, payload),
            };
        case SHOPPING_CART_REDUCER_ACTIONS.REMOVE_FROM_CART:
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

export const CartProvider = ({ children }: CartProviderType) => {
    const [state, dispatch] = useReducer(shoppingCartReducer, INITIAL_STATE);
    const SHOPPING_CART_REDUCERS_ACTIONS = useMemo(
        () => SHOPPING_CART_REDUCER_ACTIONS,
        []
    );

    const grandTotal = useMemo(
        () => state.cartItems.reduce((acc, { total }) => acc + total, 0),
        [state.cartItems]
    );

    return (
        <CartContext.Provider
            value={{ state, dispatch, SHOPPING_CART_REDUCERS_ACTIONS, grandTotal }}>
            {children}
        </CartContext.Provider>
    );
};
