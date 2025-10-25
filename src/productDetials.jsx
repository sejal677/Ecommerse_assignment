import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem("shopping_cart")) || [];
    localStorage.setItem("shopping_cart", JSON.stringify([...existing, product]));
    alert(`${product.title} added to your cart!`);
    navigate("/cart");
  };

  return (
    <div className="product-detail-wrapper">
      {product ? (
        <div className="product-detail-card">
          <div className="product-image-section">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="detail-image"
            />
          </div>

          <div className="product-info-section">
            <h1 className="detail-title">{product.title}</h1>
            <p className="detail-desc">{product.description}</p>

            <div className="price-rating">
              <span className="price-tag">₹{product.price}</span>
              <span className="rating-tag">⭐ {product.rating}/5</span>
            </div>

            <button className="cart-btn" onClick={addToCart}>
               Add to Cart
            </button>

            <div className="detail-nav">
              <NavLink to="ratting" className="detail-link">
                Rating
              </NavLink>
              <NavLink to="reviews" className="detail-link">
                Reviews
              </NavLink>
            </div>

            <Outlet />
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetail;
