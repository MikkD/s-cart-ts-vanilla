import { useState, useContext, useMemo } from 'react';
import { NAV_LINKS, ShoppingCartIcon } from './utils';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/ShoppingCart';
import ShoppingCart from './ShoppingCart';
import { CartContextType } from '../types/types';

const NavBar: React.FC = () => {
    const [isShoppingCartActive, setIsShoppingCartActive] = useState(false);

    const cartContext = useContext<CartContextType | null>(CartContext);

    if (!cartContext) {
        throw new Error('cartContext is not provided');
    }

    const {
        state: { cartItems },
    } = cartContext;

    const cartItemsQty = useMemo(
        () => cartItems.reduce((acc, { cartQty }) => acc + cartQty, 0),
        [cartItems]
    );

    const handleShoppingCartClick = () => setIsShoppingCartActive(true);

    return (
        <nav className='nav-menu'>
            <div className='nav-menu-links'>
                <ul>
                    {NAV_LINKS.map(({ text, path, id }) => (
                        <li>
                            <NavLink
                                key={id}
                                className={({ isActive }) => (isActive ? 'active' : '')}
                                to={path}>
                                {text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='nav-menu-icon' onClick={handleShoppingCartClick}>
                <span>
                    <ShoppingCartIcon />
                </span>
                <div className='shopping-cart-counter'>{cartItemsQty}</div>
            </div>
            <ShoppingCart
                isActive={isShoppingCartActive}
                setIsActive={setIsShoppingCartActive}
            />
        </nav>
    );
};

export default NavBar;
