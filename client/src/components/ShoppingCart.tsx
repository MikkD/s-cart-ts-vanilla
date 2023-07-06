import { useMemo, useContext } from 'react';
import { ReusableList } from './ReusableList';
import { StoreListItemProps } from '../types/types';
import { CartContext } from '../context/ShoppingCartContext';

//ShoppingCartListItem
type ShoppingCartListItemProps = {
    item: StoreListItemProps;
    [key: string]: any;
};

const ShoppingCartListItem: React.FC<ShoppingCartListItemProps> = ({ item }) => {
    const { name, imgUrl, price, cartQty, total, id } = item;
    const { removeCartItem } = useContext(CartContext);

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
                <button onClick={() => removeCartItem(id)}>X</button>
            </div>
        </li>
    );
};

// Shopping Cart
type ShoppingCartProps = {
    isActive: boolean;
    setIsActive: (state: boolean) => void;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isActive, setIsActive }) => {
    const { storeItems } = useContext(CartContext);

    const grandTotal = useMemo(
        () => storeItems.reduce((acc, { total }) => acc + total, 0),
        [storeItems]
    );
    const cartItems = useMemo(
        () => storeItems.filter((storeItem) => storeItem.cartQty),
        [storeItems]
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
