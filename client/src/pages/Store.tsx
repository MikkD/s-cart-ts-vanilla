import React, { ReactElement, memo, useState, useMemo } from 'react';
import {
    IStoreListItemType,
    ShoppingCartActionTypes,
    PRODUCTS_ACTION_TYPES,
} from '../types/types';
import { useCartContext } from '../hooks/useCartContext';
import { useProductsContext } from '../hooks/useProductsContext';
import { useProductsFetch } from '../hooks/useProductsFetch';
import { LazyImage } from '../components/LazyImage';
import PageHeader from '../components/PageHeader';
import { Filters } from '../components/Filters';

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

// STORE_LIST
export const StoreList: React.FC = (): React.ReactNode => {
    const {
        state: { products, itemQtyPerPage, currentPage },
    } = useProductsContext();

    const {
        state: { cartItems },
        dispatch,
        SHOPPING_CART_REDUCERS_ACTIONS,
    } = useCartContext();

    const indexOfLastItem = currentPage * itemQtyPerPage;
    const indexOfFirstItem = indexOfLastItem - itemQtyPerPage;
    const currentProducts = useMemo(
        () => products.slice(indexOfFirstItem, indexOfLastItem),
        [indexOfFirstItem, indexOfLastItem, products]
    );

    return (
        <ul>
            {currentProducts.map((product) => {
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
        </ul>
    );
};
// PAGINATION
const StorePagination = () => {
    const {
        state: { products, itemQtyPerPage, currentPage },
        dispatch,
    } = useProductsContext();
    const totalNumOfItems = products.length;
    const itemsPerPage = itemQtyPerPage || 10;
    const numberOfPages = Math.round(totalNumOfItems / itemsPerPage);

    return (
        <div className='store-pagination'>
            <div className='pagination-btns'>
                {[...Array(numberOfPages).keys()].map((pageNum) => {
                    return (
                        <button
                            className={pageNum + 1 === currentPage ? 'bg-active' : ''}
                            onClick={() =>
                                dispatch({
                                    type: PRODUCTS_ACTION_TYPES.SET_CURRENT_PAGE,
                                    payload: pageNum + 1,
                                })
                            }
                            key={pageNum}>
                            {pageNum + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const Store: React.FC = () => {
    useProductsFetch();

    return (
        <>
            <PageHeader />
            <div className='store-container'>
                <Filters />
                <div className='store-list-wrapper'>
                    <StoreList />
                </div>
                <StorePagination />
            </div>
        </>
    );
};

export default Store;
