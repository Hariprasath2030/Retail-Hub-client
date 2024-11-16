import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext is correctly set up
import logo from '/src/assets/retail.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [editingProductId, setEditingProductId] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      console.log('Products fetched successfully');
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const newProduct = { userId, productName, productQuantity, price };

    try {
      if (editingProductId) {
        await axios.put(`http://localhost:5000/api/products/${editingProductId}`, newProduct);
        setEditingProductId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', newProduct);
      }
      clearForm();
      fetchProducts();
    } catch (error) {
      console.error('Error adding/updating product:', error.response.data);
    }
  };

  const editProduct = (product) => {
    setEditingProductId(product._id);
    setUserId(product.userId);
    setProductName(product.productName);
    setProductQuantity(product.productQuantity);
    setPrice(product.price);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const clearForm = () => {
    setUserId('');
    setProductName('');
    setProductQuantity(0);
    setPrice(0);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { logout } = useAuth();
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
      
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <ul>
          <br></br>
          <br></br>
          <br></br>
          <li>
            <Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
          </li>
          <li>
            <Link to="" onClick={toggleSidebar}>Add Products</Link>
          </li>
          <li>
      <Link to="/totalpage" onClick={toggleSidebar}>Bill section</Link>
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
     
      {/* Main Content */}
      <div className={`content ${isSidebarOpen ? 'shift' : ''}`}>
        {isSidebarOpen && (
          <div className="toggle-button close" onClick={toggleSidebar}>
            <span></span>
            <span></span>
          </div>
        )}
        <div className="background1-image"></div>
        <div style={{ padding: '20px' }}>
          <h1 style={{ fontSize: '3.5em', color: '#333', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
            Product Dashboard
          </h1>
          <form onSubmit={addProduct} className="product-form">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Product Quantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(Number(e.target.value))}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
            <button type="submit">{editingProductId ? 'Update Product' : 'Add Product'}</button>
          </form>
          <h2 style={{ fontSize: '2.5em', color: '#333', marginBottom: '20px', fontWeight: 'bold' }}>Product List</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity (%)</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td>{item.userId}</td>
                  <td>{item.productName}</td>
                  <td>{item.productQuantity}%</td>
                  <td>${item.price ? item.price.toFixed(2) : 'N/A'}</td>
                  <td>
                    <button onClick={() => editProduct(item)}>Edit</button>
                    <button onClick={() => deleteProduct(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductDashboard;
