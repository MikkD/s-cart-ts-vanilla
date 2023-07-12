import { useReducer, createContext, ReactNode, Dispatch } from 'react';

type productType = {
    name: string;
    imgUrl: string;
    price: number;
    id: number;
};

type storePageActionType = {
    type: string;
    payload?: productType[] | boolean | object;
};

type storePageStateType = {
    products: productType[];
    isLoading: boolean;
    isError: boolean;
};

export const PRODUCTS_ACTION_TYPES = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

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

type ProductsContextProviderType = {
    state: storePageStateType;
    dispatch: Dispatch<storePageActionType>;
    PRODUCTS_ACTION_TYPES: typeof PRODUCTS_ACTION_TYPES;
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