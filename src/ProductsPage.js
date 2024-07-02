import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './Products.css';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?category=${categoryId}`);
        setProducts(response.data.results);
        setCategoryName(response.data.filters[0].values[0].name);
        setTotalProducts(response.data.paging.total);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching products by category:", error);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navega a la página de detalles del producto
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="content-container">
      <div className="category-title">
        <h1>{categoryName}</h1>
        <p>{totalProducts} resultados</p>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
            <img src={product.thumbnail} alt={product.title} />
            <div>
              <p>{product.title}</p>
              <p>Precio: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
