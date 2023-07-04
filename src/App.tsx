import NavBar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import { Routes, Route } from 'react-router-dom';
import { ShoppingCartContext } from './context/ShoppingCartContext';

function App() {
    return (
        <>
            <ShoppingCartContext>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/store' element={<Store />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </ShoppingCartContext>
        </>
    );
}

export default App;
