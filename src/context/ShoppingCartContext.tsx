import { useState, createContext, ReactNode } from 'react';
import { StoreListItemProps } from '../types/types';
import defaultStoreItems from '../data/items.json';
import { CartContextType, ShoppingCartContextType } from '../types/types';

const defaultCartContext = {
    storeItems: [],
    removeCartItem: (id: number) => {
        console.warn(
            `removeCartItem was called with id ${id}, but the context provider is not set.`
        );
    },
    addCartItem: (id: number) => {
        console.warn(
            `addCartItem was called with id ${id}, but the context provider is not set.`
        );
    },
    substractCartItem: (id: number) => {
        console.warn(
            `substractCartItem was called with id ${id}, but the context provider is not set.`
        );
    },
};

export const CartContext = createContext<CartContextType>(defaultCartContext);

export const ShoppingCartContext = ({ children }: ShoppingCartContextType) => {
    const [storeItems, setStoreItems] = useState<StoreListItemProps[]>(defaultStoreItems);

    const addCartItem = (id: number) => {
        setStoreItems((prevStoreItems) => {
            const isItemExists = prevStoreItems.some((storeItem) => storeItem.id === id);
            if (!isItemExists) {
                throw new Error(`Item with id ${id} does not exist`);
            }
            return prevStoreItems.map((storeItem) =>
                storeItem.id === id
                    ? {
                          ...storeItem,
                          cartQty: storeItem.cartQty + 1,
                          total: (storeItem.cartQty + 1) * storeItem.price,
                      }
                    : storeItem
            );
        });
    };

    const substractCartItem = (id: number) => {
        setStoreItems((prevStoreItems) => {
            const isItemExists = prevStoreItems.some((storeItem) => storeItem.id === id);
            if (!isItemExists) {
                throw new Error(`Item with id ${id} does not exist`);
            }
            return prevStoreItems.map((storeItem) =>
                storeItem.id === id && storeItem.cartQty
                    ? {
                          ...storeItem,
                          cartQty: storeItem.cartQty - 1,
                          total: (storeItem.cartQty - 1) * storeItem.price,
                      }
                    : storeItem
            );
        });
    };

    const removeCartItem = (id: number) => {
        setStoreItems((prevStoreItems) => {
            const isItemExists = prevStoreItems.some((storeItem) => storeItem.id === id);
            if (!isItemExists) {
                throw new Error(`Item with id ${id} does not exist`);
            }
            return prevStoreItems.map((storeItem) =>
                storeItem.id === id && storeItem.cartQty
                    ? {
                          ...storeItem,
                          cartQty: 0,
                          total: 0,
                      }
                    : storeItem
            );
        });
    };

    // test
    return (
        <CartContext.Provider
            value={{ storeItems, removeCartItem, addCartItem, substractCartItem }}>
            {children}
        </CartContext.Provider>
    );
};
