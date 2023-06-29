import { useState } from 'react';
import { NAV_LINKS } from './utils';
import { NavLink } from 'react-router-dom';
import items from '../data/items.json';
import { ReusableList } from './ReusableList';

type ShoppingCartProps = {
    isActive: boolean;
    setIsActive: (state: boolean) => void;
};

//ShoppingCartListItem
type ItemProps = {
    name: string;
    price: string;
    imgUrl: string;
    //TODO ADD TOTAL WHEN REUSABLE LIST IS COMPLETED
};

type ShoppingCartListItemProps = {
    item: ItemProps;
    [key: string]: any; // => this is for ...restProps  // This can be used if you're expecting any additional unknown properties
};
const ShoppingCartListItem: React.FC<ShoppingCartListItemProps> = ({
    item,
    ...restProps
}) => {
    const { name, price, imgUrl } = item;

    return (
        <li>
            <div className='cart-list-item'>
                <div className='cart-list-item-img'>
                    <img src={imgUrl} alt={name} />
                </div>
                <div className='cart-list-item-body'>
                    <div>
                        <div>{name}</div>
                        <span className='price'>{price}$</span>
                    </div>
                    <div className='total'>Total:100$</div>
                </div>
                <button>X</button>
            </div>
        </li>
    );
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isActive, setIsActive }) => (
    <div className={`shopping-cart-container ${isActive ? 'active' : ''}`}>
        <div className='shopping-cart-header'>
            <div className='cart-header-text'>ShoppingCart</div>
            <button onClick={() => setIsActive(false)}>X</button>
        </div>
        <div className='shopping-cart-body'>
            <div className='cart-list'>
                <ReusableList
                    items={items}
                    componentToRender={ShoppingCartListItem}
                    extraPropOne='Test Extra Prop One '
                    extraPropTwo='Test Second Extra Prop'
                />
            </div>
        </div>
        <div className='cart-footer'>Grand Total : 1000$</div>
    </div>
);

function NavBar() {
    const [isShoppingCartActive, setIsShoppingCartActive] = useState<boolean>(false);

    return (
        <nav className='nav-menu'>
            <div className='nav-menu-links'>
                <ul>
                    {NAV_LINKS.map(({ text, path, id }) => (
                        <NavLink
                            key={id}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            to={path}>
                            {text}
                        </NavLink>
                    ))}
                </ul>
                <ReusableList items={NAV_LINKS} componentToRender={NavLink} />
            </div>
            <div className='nav-menu-icon' onClick={() => setIsShoppingCartActive(true)}>
                <span>
                    <svg
                        height='40'
                        viewBox='0 0 14 44'
                        width='40'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z'></path>
                    </svg>
                </span>
                <div className='shopping-cart-counter'>1</div>
            </div>
            <ShoppingCart
                isActive={isShoppingCartActive}
                setIsActive={setIsShoppingCartActive}
            />
        </nav>
    );
}

export default NavBar;
