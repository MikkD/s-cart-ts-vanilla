import { useEffect } from 'react';
import { UseProductsFetchType } from '../types/types';

export const useProductsFetch = (
    dispatch: UseProductsFetchType['dispatch'],
    PRODUCTS_ACTION_TYPES: UseProductsFetchType['PRODUCTS_ACTION_TYPES'],
    url: string
): void => {
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
