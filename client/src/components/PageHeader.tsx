import { useLocation } from 'react-router-dom';

export default function PageHeader() {
    const location = useLocation();
    const pageTitle =
        location.pathname === '/' ? 'HOME' : location.pathname.slice(1).toUpperCase();

    return <div className='page-header'>{pageTitle}</div>;
}
