import { useReducer, createContext, ReactNode, Dispatch } from 'react';
import {
    productType,
    storePageActionType,
    storePageStateType,
    PRODUCTS_ACTION_TYPES,
    ProductsContextProviderType,
} from '../types/types';

const INITIAL_STATE = {
    products: [],
    isLoading: false,
    isError: false,
};

const storePage = (state: storePageStateType, action: storePageActionType) => {
    switch (action.type) {
        case PRODUCTS_ACTION_TYPES.LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case PRODUCTS_ACTION_TYPES.SUCCESS:
            return {
                ...state,
                products: action.payload as productType[],
                isLoading: false,
            };
        case PRODUCTS_ACTION_TYPES.ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    }
};

export const ProductsContext = createContext<ProductsContextProviderType | null>(null);

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
