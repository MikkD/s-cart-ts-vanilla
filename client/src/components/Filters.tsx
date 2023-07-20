import { useState, useCallback } from 'react';
import { filterOptions } from '../utils/utils';
import { useProductsContext } from '../hooks/useProductsContext';
import { PRODUCTS_ACTION_TYPES } from '../types/types';

type FilterOption = {
    name: string;
    value: string;
};
export const Filters = () => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterOption>(filterOptions[0]);
    const { dispatch } = useProductsContext();

    const toggleFilterDropdown = useCallback(
        () => setIsFilterActive((prevState) => !prevState),

        []
    );

    const selectFilterOption = useCallback(
        ({ name, value }: { name: string; value: string }) => {
            setActiveFilter({ name, value });

            dispatch({
                type: PRODUCTS_ACTION_TYPES.FILTER_BY,
                payload: value,
            });
        },
        [dispatch]
    );

    return (
        <div className='store-filters'>
            <div className='filters' onClick={toggleFilterDropdown}>
                <span className='active-filter-name'>{activeFilter.name}</span>
                <span className={`dropdown-icon ${isFilterActive && 'active'}`}>
                    <i className='fa fa-arrow-down'></i>
                </span>
                {isFilterActive && (
                    <ul className='active-filter-options'>
                        {filterOptions.map(({ name, value }) => (
                            <li
                                className={`${
                                    value === activeFilter.value && 'selected'
                                }`}
                                onClick={() => selectFilterOption({ name, value })}
                                key={value}>
                                <div>{name}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
