import { useReducer, createContext, ReactNode } from 'react';
import {
    ProductType,
    StorePageActionType,
    PRODUCTS_ACTION_TYPES,
    ProductsContextType,
} from '../types/types';

const INITIAL_STATE = {
    products: [],
    isLoading: false,
    isError: false,
};

type storeReducerType = {
    products: ProductType[];
    isLoading: boolean;
    isError: boolean;
};

const filterProducts = (products: ProductType[], filterType: string) => {
    switch (filterType) {
        case 'FEAT':
            return [...products].sort((a, b) => a.name.localeCompare(b.name));
        case 'ASC':
            return [...products].sort((a, b) => a.price - b.price);
        case 'DESC':
            return [...products].sort((a, b) => b.price - a.price);
        default:
            return products;
    }
};

const storePage = (state: storeReducerType, action: StorePageActionType) => {
    switch (action.type) {
        case PRODUCTS_ACTION_TYPES.LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case PRODUCTS_ACTION_TYPES.SUCCESS:
            return {
                ...state,
                products: action.payload as ProductType[],
                isLoading: false,
            };
        case PRODUCTS_ACTION_TYPES.ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        case PRODUCTS_ACTION_TYPES.FILTER_BY:
            return {
                ...state,
                products: filterProducts(state.products, action.payload as string),
            };
        default:
            return state;
    }
};

export const ProductsContext = createContext<ProductsContextType | null>(null);

type ProductsProviderProps = {
    children: ReactNode;
};

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
    const [state, dispatch] = useReducer(storePage, INITIAL_STATE);

    return (
        <ProductsContext.Provider value={{ state, dispatch, PRODUCTS_ACTION_TYPES }}>
            {children}
        </ProductsContext.Provider>
    );
};
