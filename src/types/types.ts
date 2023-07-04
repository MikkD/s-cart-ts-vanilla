export type StoreListItemProps = {
    name: string;
    imgUrl: string;
    price: number;
    id: number;
    cartQty: number;
    total: number;
    [key: string]: any;
};

export type CartContextType = {
    storeItems: StoreListItemProps[];
    removeCartItem: (id: number) => void;
    addCartItem: (id: number) => void;
    substractCartItem: (id: number) => void;
};

export type ShoppingCartContextType = {
    children: ReactNode;
};
