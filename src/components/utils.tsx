type NavLinkType = {
    text: string;
    path: string;
    id: number;
};

export const NAV_LINKS: NavLinkType[] = [
    {
        text: 'Home',
        path: '/',
        id: 1,
    },
    {
        text: 'Store',
        path: '/store',
        id: 2,
    },
    {
        text: 'About',
        path: '/about',
        id: 3,
    },
];
