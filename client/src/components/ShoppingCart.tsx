import { ReactElement, memo } from 'react';
import { ShoppingCartListItemProps, ShoppingCartProps } from '../types/types';
import { useCartContext } from '../hooks/useCartContext';

const ShoppingCartListItem: React.FC<ShoppingCartListItemProps> = ({
    cartItem,
    dispatch,
    SHOPPING_CART_REDUCERS_ACTIONS,
}) => {
    const { name, imgUrl, price, cartQty, total } = cartItem;
    console.log('__ShoppingCartListItem RE-RENDERED__', name);

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
                            type: SHOPPING_CART_REDUCERS_ACTIONS.REMOVE_FROM_CART,
                            payload: cartItem,
                        })
                    }>
                    X
                </button>
            </div>
        </li>
    );
};

const arePropsEqual = (prevProps, nextProps) =>
    Object.keys(prevProps).every((key) => prevProps[key] === nextProps[key]) &&
    prevProps.cartItem.cartQty === nextProps.cartItem.cartQty;

const MemoizedShoppingCartItem = memo(ShoppingCartListItem, arePropsEqual);

export const ShoppingCartList: React.FC = (): ReactElement => {
    const {
        state: { cartItems },
        dispatch,
        SHOPPING_CART_REDUCERS_ACTIONS,
    } = useCartContext();

    return (
        <ul>
            {cartItems?.map((cartItem) => (
                <MemoizedShoppingCartItem
                    key={cartItem.id}
                    cartItem={cartItem}
                    dispatch={dispatch}
                    SHOPPING_CART_REDUCERS_ACTIONS={SHOPPING_CART_REDUCERS_ACTIONS}
                />
            ))}
        </ul>
    );
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isActive, setIsActive }) => {
    const { grandTotal } = useCartContext();

    return (
        <div className={`shopping-cart-container ${isActive ? 'active' : ''}`}>
            <div className='shopping-cart-header'>
                <div className='cart-header-text'>ShoppingCart</div>
                <button onClick={() => setIsActive(false)}>X</button>
            </div>
            <div className='shopping-cart-body'>
                <div className='cart-list'>
                    <ShoppingCartList />
                </div>
            </div>
            <div className='cart-footer'>Grand Total : {grandTotal}$</div>
        </div>
    );
};

export default ShoppingCart;
