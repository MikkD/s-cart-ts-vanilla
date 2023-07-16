import { ReusableListProps } from '../types/types';

export const ReusableList: React.FC<ReusableListProps> = ({
    items,
    componentToRender: ComponentToRender,
    ...props
}) => {
    if (!items.length) return <h4>...Empty</h4>;
    console.log('...props', props);
    return (
        <ul>
            {items.map((item, idx) => (
                <ComponentToRender key={item?.id || idx} item={item} {...props} />
            ))}
        </ul>
    );
};
