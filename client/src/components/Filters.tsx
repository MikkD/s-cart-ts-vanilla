import { useState, useCallback } from 'react';
import { SortByFilterOptions, PaginationFilterOptions } from '../utils/utils';
import { useProductsContext } from '../hooks/useProductsContext';
import {
    PRODUCTS_ACTION_TYPES,
    StorePageActionType,
    StoreProductstActionTypes,
} from '../types/types';

type FilterOption = {
    name: string;
    value: string;
};

type FilterPropsType = {
    filterOptions: FilterOption[];
    actionType: StoreProductstActionTypes;
    dispatchFunction: React.Dispatch<StorePageActionType>;
};
const ReusableFilter = ({
    filterOptions,
    actionType,
    dispatchFunction,
}: FilterPropsType) => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterOption>(filterOptions[0]);

    const toggleFilterDropdown = useCallback(
        () => setIsFilterActive((prevState) => !prevState),
        []
    );

    const selectFilterOption = useCallback(
        ({ name, value }: { name: string; value: string }) => {
            setActiveFilter({ name, value });

            dispatchFunction({
                type: actionType,
                payload: value,
            });
        },
        [dispatchFunction, actionType]
    );
    return (
        <div className='filter' onClick={toggleFilterDropdown}>
            <span className='active-filter-name'>{activeFilter.name}</span>
            <span className={`dropdown-icon ${isFilterActive ? 'active' : ''}`}>
                <i className='fa fa-arrow-down'></i>
            </span>
            {isFilterActive && (
                <ul className='active-filter-options'>
                    {filterOptions.map(({ name, value }) => (
                        <li
                            className={`${
                                value === activeFilter.value ? 'selected' : ''
                            }`}
                            onClick={() => selectFilterOption({ name, value })}
                            key={value}>
                            <div>{name}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export const Filters = () => {
    const {
        state: { products },
        dispatch,
    } = useProductsContext();
    return (
        <div className='store-filters'>
            <div className='sort-by-filter'>
                <ReusableFilter
                    filterOptions={SortByFilterOptions}
                    actionType={PRODUCTS_ACTION_TYPES.FILTER_BY}
                    dispatchFunction={dispatch}
                />
            </div>
            <div className='pagination-filter'>
                <ReusableFilter
                    filterOptions={PaginationFilterOptions}
                    actionType={PRODUCTS_ACTION_TYPES.SET_NUMBER_OF_ITEMS_PER_PAGE}
                    dispatchFunction={dispatch}
                />
                <span>Total:{products.length}</span>
            </div>
        </div>
    );
};
