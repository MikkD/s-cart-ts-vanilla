import { useState, useMemo } from 'react';
import { NAV_LINKS, ShoppingCartIcon } from '../utils/utils';
import { NavLink } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import { useCartContext } from '../hooks/useCartContext';

const NavBar: React.FC = () => {
    const [isShoppingCartActive, setIsShoppingCartActive] = useState(false);

    const {
        state: { cartItems },
    } = useCartContext();

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
                        <li key={id}>
                            <NavLink
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
