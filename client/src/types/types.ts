import { ReactNode } from 'react';

export const SHOPPING_CART_REDUCER_ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    SUBSTRACT_FROM_CART: 'SUBSTRACT_FROM_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
} as const;

export const PRODUCTS_ACTION_TYPES = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    FILTER_BY: 'FILTER_BY',
    SET_NUMBER_OF_ITEMS_PER_PAGE: 'SET_NUMBER_OF_ITEMS_PER_PAGE',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
} as const;

// STORE
export type ProductType = {
    name: string;
    imgUrl: string;
    price: number;
    id: number;
};

export type StoreType = {
    storeItems: ProductType[];
    setStoreItems: (items: ProductType[]) => void;
};

export type StoreProductstActionTypes =
    (typeof PRODUCTS_ACTION_TYPES)[keyof typeof PRODUCTS_ACTION_TYPES];

export type StorePageActionType = {
    type: StoreProductstActionTypes;
    payload?: ProductType[] | boolean | object | string | number;
};

export type ProductsContextType = {
    state: {
        products: ProductType[];
        isLoading: boolean;
        isError: boolean;
        itemQtyPerPage: number;
        currentPage: number;
    };
    dispatch: React.Dispatch<StorePageActionType>;
    PRODUCTS_ACTION_TYPES: typeof PRODUCTS_ACTION_TYPES;
};

export type UseProductsFetchType = {
    dispatch: React.Dispatch<StorePageActionType>;
    PRODUCTS_ACTION_TYPES: typeof PRODUCTS_ACTION_TYPES;
};

// CART
export type CartProviderType = {
    children: ReactNode;
};

export type ShoppingCartActionTypes =
    (typeof SHOPPING_CART_REDUCER_ACTIONS)[keyof typeof SHOPPING_CART_REDUCER_ACTIONS];

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
    SHOPPING_CART_REDUCERS_ACTIONS: typeof SHOPPING_CART_REDUCER_ACTIONS;
    grandTotal: number;
};
export type ShoppingCartListItemProps = {
    cartItem: CartItemType;
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

export type NavLinkType = {
    text: string;
    path: string;
    id: number;
};

export type IStoreListItemType = {
    product: ProductType;
    cartQty: number | undefined;
    dispatch: React.Dispatch<Action>;
    SHOPPING_CART_REDUCERS_ACTIONS: typeof SHOPPING_CART_REDUCER_ACTIONS;
};
