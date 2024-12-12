import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '/src/assets/retail.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://retail-hub-server.onrender.com/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleImageUpload = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary preset
    formData.append('cloud_name', 'your_cloud_name'); // Replace with your Cloudinary cloud name

    const res = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
    return res.data.url; // Return uploaded image URL
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload(); // Upload image and get URL
    const newProduct = { userId, productName, productQuantity, price, description, image: imageUrl };

    try {
      if (editingProductId) {
        await axios.put(`https://retail-hub-server.onrender.com/api/products/${editingProductId}`, newProduct);
        setEditingProductId(null);
      } else {
        await axios.post('https://retail-hub-server.onrender.com/api/products', newProduct);
      }
      clearForm();
      fetchProducts();
    } catch (error) {
      console.error('Error adding/updating product:', error.response?.data || error);
    }
  };

  const clearForm = () => {
    setUserId('');
    setProductName('');
    setProductQuantity(0);
    setPrice(0);
    setDescription('');
    setImage(null);
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
          <li>
            <Link to="/dashboard" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="" onClick={toggleSidebar}>
              Add Products
            </Link>
          </li>
          <li>
            <Link to="/maincompartment" onClick={toggleSidebar}>
              Bill Section
            </Link>
          </li>
          <li>
            <Link to="/description" onClick={toggleSidebar}>
              Product Description
            </Link>
          </li>
          <li>
            <Link to="" onClick={() => { toggleSidebar(); logout(); }}>
              Logout
            </Link>
          </li>
        </ul>
      </div>

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
          <h1>Add a New Product</h1>
          <form onSubmit={addProduct} className="product-form">
            {/* Form fields remain the same */}
          </form>
          <h2>Product List</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={product.image} alt={product.productName} className="product-image" />
                <div className="product-info">
                  <h3>{product.productName}</h3>
                  <p>Quantity: {product.productQuantity}%</p>
                  <p>Price: ₹{product.price}</p>
                  <p>{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDashboard;
