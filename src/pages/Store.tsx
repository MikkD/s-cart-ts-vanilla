import React from 'react';
import { ReusableList } from '../components/ReusableList';
import items from '../data/items.json';

type StoreListItemProps = {
    name: string;
    imgUrl: string;
    price: string;
};

const StoreListItem: React.FC<StoreListItemProps> = ({ item, ...rest }) => {
    const { name, imgUrl, price } = item;
    console.log('props item', item);
    console.log('props rest', rest);

    const numberOfItemsInCart = 1;
    return (
        <li>
            <div className='store-card'>
                <div className='store-card-img'>
                    <img src={imgUrl} alt={name} />
                </div>
                <div className='store-card-body'>
                    <span>{name}</span>
                    <span>{price}</span>
                </div>
                <div className='store-card-buttons'>
                    {numberOfItemsInCart ? (
                        <>
                            <button>-</button>
                            <span>1 in cart</span>
                            <button>+</button>
                            <div className='remove-item-btn-block'>
                                <button>Remove Item</button>
                            </div>
                        </>
                    ) : (
                        <button>Add to Cart</button>
                    )}
                </div>
            </div>
        </li>
    );
};

export default function Store() {
    console.log('items', items);
    return (
        <>
            <div className='page-header'>Store</div>
            <div className='store-container'>
                <div className='store-list-wrapper'>
                    <ReusableList
                        items={items}
                        componentToRender={StoreListItem}
                        newProp='new prop'
                        newProp2='new pro2p'
                    />
                </div>
            </div>
        </>
    );
}
