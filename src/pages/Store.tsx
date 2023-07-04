import React, { useContext } from 'react';
import { ReusableList } from '../components/ReusableList';
import { StoreListItemProps } from '../types/types';
import { CartContext } from '../context/ShoppingCartContext';

const StoreListItem: React.FC<StoreListItemProps> = ({ item }) => {
    const { name, imgUrl, price, id, cartQty } = item;
    const { addCartItem, removeCartItem, substractCartItem } = useContext(CartContext);

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

const Store: React.FC = () => {
    const { storeItems } = useContext(CartContext);
    return (
        <>
            <div className='page-header'>Store</div>
            <div className='store-container'>
                <div className='store-list-wrapper'>
                    <ReusableList items={storeItems} componentToRender={StoreListItem} />
                </div>
            </div>
        </>
    );
};

export default Store;
