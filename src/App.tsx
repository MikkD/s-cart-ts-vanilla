import { useState, useMemo, useContext, createContext } from 'react';
import NavBar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import defaultStoreItems from './data/items.json';
import { StoreListItemProps } from './components/types';

type CartContextType = {
    storeItems: StoreListItemProps[];
    removeCartItem: (id: number) => void;
    addCartItem: (id: number) => void;
    substractCartItem: (id: number) => void;
};

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

function App() {
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

    return (
        <>
            <CartContext.Provider
                value={{ storeItems, removeCartItem, addCartItem, substractCartItem }}>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/store' element={<Store />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </CartContext.Provider>
        </>
    );
}

export default App;
