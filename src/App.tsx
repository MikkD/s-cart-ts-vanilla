import { useState, useEffect, useMemo } from 'react';
import NavBar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import defaultStoreItems from './data/items.json';

function App() {
    const [storeItems, setStoreItems] = useState(defaultStoreItems);
    const cartItems = useMemo(
        () => storeItems.filter((storeItem) => storeItem.cartQty),
        [storeItems]
    );
    const totalNumberCartItems = storeItems.reduce(
        (acc, { cartQty }) => acc + cartQty,
        0
    );

    console.log('🚀 ~ file: App.tsx:12 ~ App ~ cartItems:', cartItems);

    const addCartItem = (id: number) => {
        setStoreItems((prevStoreItems) =>
            prevStoreItems.map((storeItem) =>
                storeItem.id === id
                    ? {
                          ...storeItem,
                          cartQty: storeItem.cartQty + 1,
                          total: (storeItem.cartQty + 1) * storeItem.price,
                      }
                    : storeItem
            )
        );
    };

    const substractCartItem = (id: number) => {
        setStoreItems((prevStoreItems) =>
            prevStoreItems.map((storeItem) =>
                storeItem.id === id && storeItem.cartQty
                    ? {
                          ...storeItem,
                          cartQty: storeItem.cartQty - 1,
                          total: (storeItem.cartQty - 1) * storeItem.price,
                      }
                    : storeItem
            )
        );
    };

    const removeCartItem = (id: number) => {
        setStoreItems((prevStoreItems) =>
            prevStoreItems.map((storeItem) =>
                storeItem.id === id && storeItem.cartQty
                    ? {
                          ...storeItem,
                          cartQty: 0,
                      }
                    : storeItem
            )
        );
    };

    return (
        <>
            <NavBar cartItems={cartItems} totalNumberCartItems={totalNumberCartItems} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/store'
                    element={
                        <Store
                            storeItems={storeItems}
                            addCartItem={addCartItem}
                            substractCartItem={substractCartItem}
                            removeCartItem={removeCartItem}
                        />
                    }
                />
                <Route path='/about' element={<About />} />
            </Routes>
        </>
    );
}

export default App;
