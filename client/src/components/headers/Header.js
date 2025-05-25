import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMenu, MdClose, MdShoppingCart } from "react-icons/md";
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import configURL from '../../configURL';

function Header() {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [currentUser] = state.userAPI.currentUser;
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const [menuOpen, setMenuOpen] = useState(false);

  const logoutUser = async () => {
    await axios.get(`${configURL}/user/logout`);
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
    window.location.reload();
  };

  const adminRouter = () => (
    <>
      <li><Link to="/create_product">Create Product</Link></li>
      <li><Link to="/catagory">Categories</Link></li>
      <li><Link to="/users">Users</Link></li>
    </>
  );

  const loggedRouter = () => (
    <>
      {!isAdmin && <li><Link to={`/orders/${currentUser._id}`}>Orders</Link></li>}
      <li><Link to="/profile">Profile</Link></li>
      <li><Link onClick={logoutUser}>Logout</Link></li>
    </>
  );

  return (
    <header>
      <div className="menu" onClick={() => setMenuOpen(true)}>
        <MdMenu size={30} />
      </div>

      <div className="logo">
        <h1><Link to="/">{isAdmin ? 'Admin' : '30DC Shop'}</Link></h1>
      </div>

      <ul style={{ left: menuOpen ? '0' : '-100%' }}>
        <li><Link to="/">{!isAdmin && 'Products'}</Link></li>
        {isAdmin && adminRouter()}
        {isLogged ? loggedRouter() : <li><Link to="/login">Login / Register</Link></li>}
        <li className="menu close" onClick={() => setMenuOpen(false)}><MdClose size={30} /></li>
      </ul>

      {!isAdmin && (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart"><MdShoppingCart size={30} /></Link>
        </div>
      )}
    </header>
  );
}

export default Header;
