import { useMemo, useContext } from 'react';
import { ReusableList } from './ReusableList';
import {
    CartContextType,
    ShoppingCartListItemProps,
    ShoppingCartProps,
} from '../types/types';
import { CartContext } from '../context/ShoppingCart';

const ShoppingCartListItem: React.FC<ShoppingCartListItemProps> = ({ item }) => {
    const { name, imgUrl, price, cartQty, total } = item;

    const cartContext = useContext<CartContextType | null>(CartContext);

    if (!cartContext) {
        throw new Error('cartContext is not provided');
    }

    const { dispatch, SHOPPING_CART_TYPES } = cartContext;

    return (
        <li>
            <div className='cart-list-item'>
                <div className='cart-list-item-img'>
                    <img src={imgUrl} alt={name} />
                </div>
                <div className='cart-list-item-body'>
                    <div>
                        <div>
                            {name}
                            <span className='small-text'>{cartQty}x</span>
                        </div>
                        <span className='small-text'>{price}$/unit</span>
                    </div>
                    <div className='total'>total: {total}$</div>
                </div>
                <button
                    onClick={() =>
                        dispatch({
                            type: SHOPPING_CART_TYPES.REMOVE_FROM_CART,
                            payload: item,
                        })
                    }>
                    X
                </button>
            </div>
        </li>
    );
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isActive, setIsActive }) => {
    const cartContext = useContext<CartContextType | null>(CartContext);

    if (!cartContext) {
        throw new Error('cartContext is not provided');
    }

    const {
        state: { cartItems },
    } = cartContext;

    const grandTotal = useMemo(
        () => cartItems.reduce((acc, { total }) => acc + total, 0),
        [cartItems]
    );

    return (
        <div className={`shopping-cart-container ${isActive ? 'active' : ''}`}>
            <div className='shopping-cart-header'>
                <div className='cart-header-text'>ShoppingCart</div>
                <button onClick={() => setIsActive(false)}>X</button>
            </div>
            <div className='shopping-cart-body'>
                <div className='cart-list'>
                    <ReusableList
                        items={cartItems}
                        componentToRender={ShoppingCartListItem}
                    />
                </div>
            </div>
            <div className='cart-footer'>Grand Total : {grandTotal}$</div>
        </div>
    );
};

export default ShoppingCart;
