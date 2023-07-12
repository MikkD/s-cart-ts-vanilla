import React, { useContext, useEffect } from 'react';
import { ReusableList } from '../components/ReusableList';
import { StoreItemType } from '../types/types';
import { CartContext } from '../context/ShoppingCart';
import { ProductsContext } from '../context/Products';

const StoreListItem: React.FC<StoreItemType> = ({ item }) => {
    // console.log('🚀 ~ file: Store.tsx:8 ~ item:', item);
    const { name, imgUrl, price, id, cartQty } = item;

    const { state, dispatch, SHOPPING_CART_TYPES } = useContext(CartContext);
    // console.log('🚀 ~ file: Store.tsx:13 ~ SHOPPING_CART_TYPES:', SHOPPING_CART_TYPES);
    // console.log('🚀 ~ file: Store.tsx:13 ~ dispatch:', dispatch);
    console.log('🚀 ~ file: Store.tsx:13 ~ state:', state);
    const { cartItems } = state;
    console.log('🚀 ~ file: Store.tsx:16 ~ cartItems:', cartItems);
    const itemInCart = cartItems.find(
        (cartItem) => cartItem.id === id && cartItem.cartQty > 0
    );

    return (
        <li>
            <div className='store-card'>
                <div className='store-card-img'>
                    <img src={imgUrl} alt={name} />
                </div>
                <div className='store-card-body'>
                    <span>{name.toUpperCase()}</span>
                    <span>{price}$</span>
                </div>
                <div className='store-card-buttons'>
                    {itemInCart ? (
                        <>
                            <button
                                onClick={() =>
                                    dispatch({
                                        type: SHOPPING_CART_TYPES.SUBSTRACT_FROM_CART,
                                        payload: item,
                                    })
                                }>
                                -
                            </button>
                            <span>{itemInCart?.cartQty} in cart</span>
                            <button
                                onClick={() =>
                                    dispatch({
                                        type: SHOPPING_CART_TYPES.ADD_TO_CART,
                                        payload: item,
                                    })
                                }>
                                +
                            </button>
                            <div className='remove-item-btn-block'>
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: SHOPPING_CART_TYPES.REMOVE_FROM_CART,
                                            payload: item,
                                        })
                                    }>
                                    Remove Item
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() =>
                                dispatch({
                                    type: SHOPPING_CART_TYPES.ADD_TO_CART,
                                    payload: item,
                                })
                            }>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
};

const Store: React.FC = () => {
    const { state, dispatch, PRODUCTS_ACTION_TYPES } = useContext(ProductsContext);
    const { products } = state;

    useEffect(() => {
        let isMounted = true;
        dispatch({
            type: PRODUCTS_ACTION_TYPES.LOADING,
        });
        fetch('http://localhost:3020/store')
            .then((data) => data.json())
            .then((products) => {
                if (isMounted) {
                    dispatch({
                        type: PRODUCTS_ACTION_TYPES.SUCCESS,
                        payload: products,
                    });
                }
            })
            .catch((err) => {
                dispatch({ type: PRODUCTS_ACTION_TYPES.ERROR });
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            <div className='page-header'>Store</div>
            <div className='store-container'>
                <div className='store-list-wrapper'>
                    <ReusableList items={products} componentToRender={StoreListItem} />
                </div>
            </div>
        </>
    );
};

export default Store;
