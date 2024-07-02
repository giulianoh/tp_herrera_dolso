// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import ProductsPage from './ProductsPage';
import ProductDetails from './ProductDetails';
import { CartProvider } from './CartContext';
import CartPage from './CartPage';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/products/:categoryId" element={<ProductsPage />} />
            <Route path="/categories/:categoryId" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
