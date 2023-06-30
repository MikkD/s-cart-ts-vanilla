import { ReusableList } from './ReusableList';

//ShoppingCartListItem
type ItemProps = {
    name: string;
    price: string;
    imgUrl: string;
    cartQty: number;
    total: number;
};

type ShoppingCartListItemProps = {
    item: ItemProps;
    [key: string]: any;
};

type ShoppingCartProps = {
    cartItems: ItemProps[];
    isActive: boolean;
    setIsActive: (state: boolean) => void;
};
const ShoppingCartListItem: React.FC<ShoppingCartListItemProps> = ({
    item,
    ...restProps
}) => {
    const { name, imgUrl, price, cartQty, total } = item;

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
                <button>X</button>
            </div>
        </li>
    );
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({
    cartItems,
    isActive,
    setIsActive,
}) => {
    const grandTotal = cartItems.reduce((acc, { total }) => acc + total, 0);
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
