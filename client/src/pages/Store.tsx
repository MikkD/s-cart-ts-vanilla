import React, { ReactElement, memo } from 'react';
import { IStoreListItemType, ShoppingCartActionTypes } from '../types/types';
import { useCartContext } from '../hooks/useCartContext';
import { useProductsContext } from '../hooks/useProductsContext';
import { useProductsFetch } from '../hooks/useProductsFetch';
import { LazyImage } from '../components/LazyImage';

const StoreListItem: React.FC<IStoreListItemType> = ({
    product,
    cartQty,
    dispatch,
    SHOPPING_CART_REDUCERS_ACTIONS,
}): ReactElement => {
    const { name, imgUrl, price, id } = product;

    const dispatchCartAction = (cartActionType: ShoppingCartActionTypes) => {
        dispatch({
            type: cartActionType,
            payload: product,
        });
    };
    return (
        <li>
            <div className='store-card'>
                <div className='store-card-img'>
                    <LazyImage key={id} src={imgUrl} name={name} id={id} />
                </div>
                <div className='store-card-body'>
                    <span>{name.toUpperCase()}</span>
                    <span>{price}$</span>
                </div>
                <div className='store-card-buttons'>
                    {cartQty ? (
                        <>
                            <button
                                onClick={() =>
                                    dispatchCartAction(
                                        SHOPPING_CART_REDUCERS_ACTIONS.SUBSTRACT_FROM_CART
                                    )
                                }>
                                -
                            </button>
                            <span>{cartQty} in cart</span>
                            <button
                                onClick={() =>
                                    dispatchCartAction(
                                        SHOPPING_CART_REDUCERS_ACTIONS.ADD_TO_CART
                                    )
                                }>
                                +
                            </button>
                            <div className='remove-item-btn-block'>
                                <button
                                    onClick={() =>
                                        dispatchCartAction(
                                            SHOPPING_CART_REDUCERS_ACTIONS.REMOVE_FROM_CART
                                        )
                                    }>
                                    Remove Item
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() =>
                                dispatchCartAction(
                                    SHOPPING_CART_REDUCERS_ACTIONS.ADD_TO_CART
                                )
                            }>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
};

const arePropsEqual = (prevProps, nextProps) =>
    Object.keys(prevProps).every((key) => prevProps[key] === nextProps[key]) &&
    prevProps.cartQty === nextProps.cartQty;

const MemoizedStoreListItem = memo(StoreListItem, arePropsEqual);

export const StoreList: React.FC = (): React.ReactNode => {
    const {
        state: { products },
    } = useProductsContext();

    const {
        state: { cartItems },
        dispatch,
        SHOPPING_CART_REDUCERS_ACTIONS,
    } = useCartContext();

    return (
        <ul>
            {products.map((product) => {
                const cartItem = cartItems.find((cartItem) => cartItem.id === product.id);
                const cartQty = cartItem ? cartItem.cartQty : 0;

                return (
                    <MemoizedStoreListItem
                        key={product.id}
                        product={product}
                        cartQty={cartQty}
                        dispatch={dispatch}
                        SHOPPING_CART_REDUCERS_ACTIONS={SHOPPING_CART_REDUCERS_ACTIONS}
                    />
                );
            })}
            ;
        </ul>
    );
};

const Store: React.FC = () => {
    useProductsFetch();

    return (
        <>
            <div className='page-header'>Store</div>
            <div className='store-container'>
                <div className='store-list-wrapper'>
                    <StoreList />
                </div>
            </div>
        </>
    );
};

export default Store;
