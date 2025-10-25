import './App.css';
import React, { useState } from 'react';

import Home from './home';
import { Header } from './components/header'
import Cart from './Cart';
import Orders from './orders';
import ProductDetail from './productDetials';
import Ratting from './Ratting';
import Reviews from './review';

// Importing components from React Router to handle navigation between pages
// BrowserRouter: enables routing feature in the app
// Routes: container that holds all individual Route definitions
// Route: defines which component to show for a specific URL path
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    const [cart, setCart] = useState([]);

  // function to add items to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // avoid duplicates
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) return prevCart;
      return [...prevCart, product];
    });
  };
  return (
    <div className="App">

      {/* BrowserRouter wraps the entire app and enables routing functionality.
          It keeps track of the current URL and updates the page content without reloading.
      */}
      <BrowserRouter>

        {/* Header component will be shown on every page (because it's outside <Routes>) */}
        <Header />

        {/* Routes is a container for all the Route components.
            It tells React Router which component to display based on the current URL.
        */}
        <Routes>

          {/* Each Route defines a specific path and the component that should render when
              the browser's URL matches that path. */}

          {/* When the URL path is "/", show the Home component */}
          <Route path='/' element={<Home />} />

          {/* When the URL path is "/cart", show the Cart component */}
          <Route path='/cart' element={<Cart cart={Cart}/>} />

          {/* When the URL path is "/orders", show the Orders component */}
          <Route path='/orders' element={<Orders />} />

          {/* When the URL path is "/product_detail/:id", show the ProductDetail component.
              ":id" means this part is dynamic — for example, "/product_detail/101" or "/product_detail/abc".
              The "id" value can be used inside the ProductDetail component to fetch and display
              information for that specific product.
          */}
          <Route path='/product_detail/:id' element={<ProductDetail addToCart={addToCart}/>} >

            {/* Nested Route: "reviews"
                - This route will be rendered *inside* the <Outlet /> of ProductDetail.
                - The full URL will look like: /product_detail/:id/reviews
                - Example: /product_detail/5/reviews
            */}
            <Route path='reviews' element={<Reviews />} />

            {/* Nested Route: "ratting"
                - This will also load inside the <Outlet /> in ProductDetail.
                - Full URL: /product_detail/:id/ratting
            */}
            <Route path='ratting' element={<Ratting />} />

          </Route>


        </Routes>
      </BrowserRouter>
      {/* <Header/>
          <Home/> */}
    </div>
  );
}

export default App;
