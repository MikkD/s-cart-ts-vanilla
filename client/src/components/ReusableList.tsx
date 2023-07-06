// ReusableList
type ReusableListProps = {
    items: any[];
    componentToRender: (item: any, index: number) => React.ReactNode;
    [key: string]: any;
};

export const ReusableList: React.FC<ReusableListProps> = ({
    items,
    componentToRender: ComponentToRender,
    ...props
}) => {
    if (!items.length) return <h4>...Empty</h4>;

    return (
        <ul>
            {items.map((item, idx) => (
                <ComponentToRender key={item?.id || idx} item={item} {...props} />
            ))}
        </ul>
    );
};
