import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import { useCart } from './CartContext'; // Ajusta la ruta según tu estructura de directorios

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${productId}`);
        setProduct(response.data);
        setSelectedImage(response.data.pictures[0].url);
        setLoading(false);
      } catch (error) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const newItem = {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: parseInt(quantity),
      image: selectedImage
    };
    addToCart(newItem);
    alert('Producto añadido al carrito!');
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-details-container">
      <div className="product-images">
        <div className="product-thumbnails">
          {product.pictures.map(picture => (
            <img
              key={picture.id}
              src={picture.url}
              alt={product.title}
              className="product-thumbnail"
              onClick={() => setSelectedImage(picture.url)}
            />
          ))}
        </div>
        <div className="main-image-container">
          <img src={selectedImage} alt={product.title} className="product-main-image" />
        </div>
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="product-price">Precio: ${product.price}</p>
        <p className="product-installments">3 y 6 cuotas sin interés</p>
        <p className="product-condition">Condición: {product.condition === 'new' ? 'Nuevo' : 'Usado'}</p>
        <p className="product-sold">{product.sold_quantity} vendidos</p>
        <h2>Descripción</h2>
        <p className="product-description">{product.warranty}</p>
      </div>
      <div className="product-purchase">
        <p className="product-shipping">Envío gratis a todo el país</p>
        <p>Conocé los tiempos y las formas de envío.</p>
        <p>Calcular cuándo llega</p>
        <p>Stock disponible</p>
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
          <option value="1">1 unidad</option>
          <option value="2">2 unidades</option>
        </select>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Agregar al carrito</button>
        <button className="buy-now-button">Comprar ahora</button>
      </div>
    </div>
  );
};

export default ProductDetails;
