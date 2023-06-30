import React, { useState } from 'react';
import { ReusableList } from '../components/ReusableList';

type StoreListItemProps = {
    name: string;
    imgUrl: string;
    price: string;
    id: number;
    cartQty: number;
    total: number;
    [key: string]: any;
};

type StoreProps = {
    storeItems: StoreListItemProps[];
    addCartItem: (id: number) => void;
    substractCartItem: (id: number) => void;
    removeCartItem: (id: number) => void;
};

const StoreListItem: React.FC<StoreListItemProps> = ({ item, ...rest }) => {
    const { name, imgUrl, price, id, cartQty } = item;
    const { addCartItem, removeCartItem, substractCartItem } = rest;

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
                    {cartQty ? (
                        <>
                            <button onClick={() => substractCartItem(id)}>-</button>
                            <span>{cartQty} in cart</span>
                            <button onClick={() => addCartItem(id)}>+</button>
                            <div className='remove-item-btn-block'>
                                <button onClick={() => removeCartItem(id)}>
                                    Remove Item
                                </button>
                            </div>
                        </>
                    ) : (
                        <button onClick={() => addCartItem(id)}>Add to Cart</button>
                    )}
                </div>
            </div>
        </li>
    );
};

const Store: React.FC<StoreProps> = ({
    storeItems,
    addCartItem,
    substractCartItem,
    removeCartItem,
}) => {
    return (
        <>
            <div className='page-header'>Store</div>
            <div className='store-container'>
                <div className='store-list-wrapper'>
                    <ReusableList
                        items={storeItems}
                        componentToRender={StoreListItem}
                        addCartItem={addCartItem}
                        substractCartItem={substractCartItem}
                        removeCartItem={removeCartItem}
                    />
                </div>
            </div>
        </>
    );
};

export default Store;
