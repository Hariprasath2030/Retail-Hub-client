import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Cus_Card from './Cus_Card';
import { useAuth } from '../contexts/AuthContext';
import logo from '/src/assets/retail.png';
import '../assets/css/NavigationBar.css';
import './customer.css'; // Added for quantity styling
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'; // Import the loader

const Customer = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://retail-hub-server.onrender.com/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isSidebarOpen && (
            <div className="toggle-button open" onClick={toggleSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <img src={logo} alt="Logo" style={{ width: '50px', marginLeft: '15px' }} />
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

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <br></br>
        <br></br>
        <br></br>
        <ul>
          <li>
            <Link to="" onClick={toggleSidebar}>Dashboard</Link>
          </li>
          <li>
            <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
          </li>
          <li>
            <Link to="" onClick={() => { toggleSidebar(); logout(); }}>Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`content ${isSidebarOpen ? 'shift' : ''}`}>
        <div style={{ padding: '20px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <TailSpin color="#333" height={100} width={100} />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Customer;
