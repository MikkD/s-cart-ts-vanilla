import { useState, useRef, useEffect } from 'react';

type LazyImageProp = {
    src: string;
    name: string;
    id: number;
};

export const LazyImage = (props: LazyImageProp) => {
    const [imgInViewport, setImgInViewport] = useState(false);
    const target = useRef<HTMLImageElement | null>(null);

    const cbObserver = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setImgInViewport(true);
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(cbObserver);

        if (target?.current) {
            observer.observe(target.current);
        }

        return () => observer.disconnect();
    }, []);

    return imgInViewport ? (
        <img ref={target} {...props} />
    ) : (
        <img
            ref={target}
            style={{
                backgroundColor: 'rgb(220, 220, 220)',
            }}
        />
    );
};
