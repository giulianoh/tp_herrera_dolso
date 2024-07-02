// CartPage.js
import React from 'react';
import { useCart } from './CartContext'; 
import { Button } from 'primereact/button';
import './CartPage.css'

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleRemove = (prodId) => {
    removeFromCart(prodId);
  };

  const updateQuantity = (prodId, newQuantity) => {
    // Actualizar la cantidad aquí, asegurándote de que la lógica esté correctamente implementada
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Tu Carrito</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image"/>
            <div className="cart-item-details">
              <div className="cart-item-title">{item.title}</div>
              <div className="cart-item-price">${item.price}</div>
              <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))} className="cart-item-quantity"/>
              <div className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</div>
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleRemove(item.productId)} />
            </div>
          </div>
        ))
      ) : (
        <p>El carrito está vacío.</p>
      )}
      <div className="cart-summary">
        <h2>Total: ${calculateTotal()}</h2>
        <Button label="Finalizar compra" className="p-button-success" />
        <Button label="Limpiar Carrito" className="p-button-danger" onClick={clearCart} />
      </div>
    </div>
  );
};

export default CartPage;
