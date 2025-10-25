import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    const existing = JSON.parse(localStorage.getItem('shopping_cart')) || [];
    const updated = [...existing, product];
    localStorage.setItem('shopping_cart', JSON.stringify(updated));
    alert(`${product.title} added to cart!`);
  };

  const viewDetails = (id) => {
    navigate(`/product_detail/${id}`);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Explore Our Products</h1>

      <div className="product-grid">
        {products.map((item) => (
          <div
            className="product-card"
            key={item.id}
            onClick={() => viewDetails(item.id)}
          >
            <img src={item.thumbnail} alt={item.title} className="product-img" />
            <div className="product-info">
              <h3 className="product-name">{item.title}</h3>
              <p className="product-desc">{item.description.slice(0, 50)}...</p>
              <div className="product-footer">
                <span className="product-price">₹{item.price}</span>
                <button
                  className="add-cart-btn"
                  onClick={(e) => addToCart(e, item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
