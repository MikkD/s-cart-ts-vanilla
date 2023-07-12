import React from 'react';
import { ReusableList } from '../components/ReusableList';
import { CartItemType, IStoreListItemType, ShoppingCartActionTypes } from '../types/types';
import { useCartContext } from '../hooks/useCartContext';
import { useProductsContext } from '../hooks/useProductsContext';
import { useProductsFetch } from '../hooks/useProductsFetch';

const StoreListItem: React.FC<IStoreListItemType> = ({ item }) => {
    const { name, imgUrl, price, id } = item;

    const {
        state: { cartItems },
        dispatch,
        SHOPPING_CART_TYPES,
    } = useCartContext();

    const itemInCart = cartItems.find(
        (cartItem: CartItemType) => cartItem.id === id && cartItem?.cartQty > 0
    );

    const dispatchCartAction = (cartActionType: ShoppingCartActionTypes) => {
        dispatch({
            type: cartActionType,
            payload: item,
        });
    };
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
                                    dispatchCartAction(SHOPPING_CART_TYPES.SUBSTRACT_FROM_CART)
                                }>
                                -
                            </button>
                            <span>{itemInCart?.cartQty} in cart</span>
                            <button
                                onClick={() => dispatchCartAction(SHOPPING_CART_TYPES.ADD_TO_CART)}>
                                +
                            </button>
                            <div className='remove-item-btn-block'>
                                <button
                                    onClick={() =>
                                        dispatchCartAction(SHOPPING_CART_TYPES.REMOVE_FROM_CART)
                                    }>
                                    Remove Item
                                </button>
                            </div>
                        </>
                    ) : (
                        <button onClick={() => dispatchCartAction(SHOPPING_CART_TYPES.ADD_TO_CART)}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
};

const Store: React.FC = () => {
    const {
        state: { products },
        dispatch,
        PRODUCTS_ACTION_TYPES,
    } = useProductsContext();
    const url = 'http://localhost:3020/store';
    useProductsFetch(dispatch, PRODUCTS_ACTION_TYPES, url);

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
