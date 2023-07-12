export const SHOPPING_CART_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    SUBSTRACT_FROM_CART: 'SUBSTRACT_FROM_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
} as const;

// STORE
export type StoreItemType = {
    name: string;
    imgUrl: string;
    price: number;
    item: StoreItemType;
};

export type StoreType = {
    storeItems: StoreItemType[];
    setStoreItems: (items: StoreItemType[]) => void;
};

export type StoreContextType = {
    children: ReactNode;
};

// CART

export type ShoppingCartActionTypes =
    (typeof SHOPPING_CART_TYPES)[keyof typeof SHOPPING_CART_TYPES];

export type CartItemType = {
    name: string;
    imgUrl: string;
    price: number;
    id: number;
    cartQty: number;
    total: number;
};

export type Action = {
    type: ShoppingCartActionTypes;
    payload: CartItemType;
};

export type ShoppingCartContextType = {
    children: ReactNode;
};

export type CartContextType = {
    state: {
        cartItems: CartItemType[] | [];
    };
    dispatch: React.Dispatch<Action>;
    SHOPPING_CART_TYPES: typeof SHOPPING_CART_TYPES;
};

export type ShoppingCartListItemProps = {
    item: CartItemType;
    [key: string]: any;
};

export type ShoppingCartProps = {
    isActive: boolean;
    setIsActive: (state: boolean) => void;
};

export type State = {
    cartItems: CartItemType[];
};
