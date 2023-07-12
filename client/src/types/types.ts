export const SHOPPING_CART_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    SUBSTRACT_FROM_CART: 'SUBSTRACT_FROM_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
} as const;

export const PRODUCTS_ACTION_TYPES = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
} as const;

// STORE
export type ProductType = {
    name: string;
    imgUrl: string;
    price: number;
    id: number;
};
export type IStoreListItemType = {
    item: ProductType;
};

export type StoreType = {
    storeItems: ProductType[];
    setStoreItems: (items: ProductType[]) => void;
};

export type StoreProductstActionTypes =
    (typeof PRODUCTS_ACTION_TYPES)[keyof typeof PRODUCTS_ACTION_TYPES];

export type storePageActionType = {
    type: StoreProductstActionTypes;
    payload?: ProductType[] | boolean | object;
};

export type ProductsContextType = {
    state: {
        products: ProductType[];
        isLoading: boolean;
        isError: boolean;
    };
    dispatch: React.Dispatch<storePageActionType>;
    PRODUCTS_ACTION_TYPES: typeof PRODUCTS_ACTION_TYPES;
};

export type UseProductsFetchType = {
    dispatch: React.Dispatch<storePageActionType>;
    PRODUCTS_ACTION_TYPES: typeof PRODUCTS_ACTION_TYPES;
};

export type CartContextType = {
    state: {
        cartItems: CartItemType[] | [];
    };
    dispatch: React.Dispatch<Action>;
    SHOPPING_CART_TYPES: typeof SHOPPING_CART_TYPES;
};

// CART
export type ShoppingCartContextType = {
    children: ReactNode;
};

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
    payload: ProductType;
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

// ReusableList
export type ReusableListProps = {
    items: any[];
    componentToRender: (item: any, index: number) => React.ReactNode;
    [key: string]: any;
};
