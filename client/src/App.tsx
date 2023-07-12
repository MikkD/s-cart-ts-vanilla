import NavBar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import { Routes, Route } from 'react-router-dom';
import { ProductsProvider } from './context/Products';
import { CartProvider } from './context/ShoppingCart';

function App() {
    return (
        <>
            <CartProvider>
                <ProductsProvider>
                    <NavBar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/store' element={<Store />} />
                        <Route path='/about' element={<About />} />
                    </Routes>
                </ProductsProvider>
            </CartProvider>
        </>
    );
}

export default App;
