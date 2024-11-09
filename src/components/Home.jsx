import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from '/src/assets/retail.png'; // Import your logo image
const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="Logo" />
      <h2>SMART RETAIL HUB</h2>
      </div>
      <div className="navbar-links">
        <Link to="ULogin" className="navbar-link">
          User Login
        </Link>
        <Link to="/register" className="navbar-link">
          Admin Login
        </Link>
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <div className="home-container">
        <div className="home-content">
          <div className="home-title">
            "Revolutionize Your Retail Business with Smart Retail Hub"
          </div>
          <div className="home-subtitle">
            "Automated systems to optimize inventory, enhance customer experience, and drive sales growth."
          </div>
        </div>
        <div>
          <Link to={"/"}>
            <button className="explore-button">
              Explore Features
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
