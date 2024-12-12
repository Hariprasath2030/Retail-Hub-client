import { useState, useEffect } from 'react';
import { Button } from 'antd';
import Cus_Card from "./Cus_Card";
import { useAuth } from '../contexts/AuthContext';
import logo from '/src/assets/retail.png';
import "../assets/css/NavigationBar.css";
import "./customer.css"; // Added for quantity styling
import axios from 'axios';

const Customer = () => {  
  const { logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://retail-hub-server.onrender.com/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <nav className="side_navbar">
          <div className="logo" onClick={toggleMenu}>
            <img src="your-logo.png" alt="Logo" />
          </div>
          {showMenu && (
            /* From Uiverse.io by sahilxkhadka */ 
            <div className="menu card w-72 bg-white p-5 shadow-md shadow-black-200/50 rounded-md">
              <ul className="w-full flex flex-col gap-2">
                <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
                  <button className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-slate-400 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear">
                    <svg /* Dashboard Icon */></svg>
                    Dashboard
                  </button>
                </li>
                <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
                  <button className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-slate-400 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear">
                    <svg /* Settings Icon */></svg>
                    Settings
                  </button>
                </li>
                <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
                  <button className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-slate-400 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear">
                    <svg /* Logout Icon */></svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '50px' }} />
          <h2>SMART RETAIL HUB</h2>
        </div>

        <Button
          onClick={logout}
          style={{
            padding: '8px 15px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '16px',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#444')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#333')}
        >
          Logout
        </Button>
      </nav>

      {/* Main Content */}
      <div className={`content`}>
        <div className="flex w-full h-full justify-center items-center">
          <div className="flex w-[1400px] h-auto m-2 shadow-md rounded-md p-4 flex-wrap gap-5 justify-center">
            {products.map((product, index) => (
              <Cus_Card
                key={index}
                price={product.price}
                title={product.productName}
                quantity={product.productQuantity}
                quantityClass={
                  product.productQuantity <= 25
                    ? 'low-quantity'
                    : product.productQuantity <= 75
                    ? 'medium-quantity'
                    : 'high-quantity'
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
