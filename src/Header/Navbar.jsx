import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../State/ServiceProvider";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import eCom from "../assets/e-com-logo.png";

import "./Navbar.css";
import { auth } from "../firebase";

function Navbar() {
  const [{cart,user}] = useStateValue();

  // console.log(cart);

  const handleAuth = () => {
    if(user){
      auth.signOut();
    }
  }

  return (
    <nav className="header sticky-top">
      <Link className="home" to="/">
        <span className="header-logo">
          <span className="align-middle" id="website-name">
            SHOP ME
          </span>
          <img src={eCom} alt="Website logo" />
        </span>
      </Link>
      <div className="header-search">
        <input type="text" className="header-search-input" />
        <SearchIcon className="header-search-icon" />
      </div>
      <div className="header-links">
        <Link to={!user && '/login'} className="header-link">
          <div onClick={handleAuth} className="header-link-items">
            <span className="item1">{user ? `Hello ${user.displayName == null ? 'there' : user._delegate.displayName}` : 'Hello there'},</span>
            <span className="item2">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to="/cart" className="header-link">
          <div className="header-cart">
            <button
              type="button"
              className="btn position-relative header-link-items"
            >
              <ShoppingCartIcon className="cart-icon" />
              <span
                style={{ backgroundColor: "#cd9042" }}
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
              >
                {cart?.length}<span className="visually-hidden">items</span>
              </span>
            </button>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
