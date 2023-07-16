import { useEffect } from 'react';
import { useProductsContext } from './useProductsContext';
import { url } from '../utils/utils';

export const useProductsFetch = (): void => {
    const { dispatch, PRODUCTS_ACTION_TYPES } = useProductsContext();

    useEffect(() => {
        const controller = new AbortController();
        dispatch({
            type: PRODUCTS_ACTION_TYPES.LOADING,
        });

        fetch(url, {
            signal: controller.signal,
        })
            .then((data) => data.json())
            .then((products) => {
                dispatch({
                    type: PRODUCTS_ACTION_TYPES.SUCCESS,
                    payload: products,
                });
            })
            .catch((err) => {
                dispatch({ type: PRODUCTS_ACTION_TYPES.ERROR });
            });

        return () => controller.abort();
    }, []);
};
