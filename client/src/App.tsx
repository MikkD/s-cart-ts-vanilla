import NavBar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { ProductsProvider } from './context/Products';
import { CartProvider } from './context/ShoppingCart';

function App() {
    return (
        <>
            <CartProvider>
                <ProductsProvider>
                    <NavBar />
                    <main className='main-content'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/store' element={<Store />} />
                            <Route path='/about' element={<About />} />
                        </Routes>
                    </main>
                    <Footer />
                </ProductsProvider>
            </CartProvider>
        </>
    );
}

export default App;
