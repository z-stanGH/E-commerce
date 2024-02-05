import React from 'react';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Privacy from './Components/Privacy/Privacy';
import Contact from './Components/Contact/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Products from './Components/Products/Products';
import Logout from './Components/Logout/Logout';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';
import Search from './Components/SearchView/Search';
import AdditionalInfo from './Components/AdditionalInfo/AdditionalInfo';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="contact" element={<Contact />} />
          <Route path="logout" element={<Logout />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="search/:query" element={<Search />} />
          <Route path="products/:itemId" element={<AdditionalInfo />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
