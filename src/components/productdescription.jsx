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
    return res.data.url;
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();
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
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#333',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isSidebarOpen && (
            <div onClick={toggleSidebar} style={{ cursor: 'pointer', marginRight: '15px' }}>
              <span style={{ display: 'block', width: '25px', height: '3px', backgroundColor: '#fff', marginBottom: '5px' }}></span>
              <span style={{ display: 'block', width: '25px', height: '3px', backgroundColor: '#fff', marginBottom: '5px' }}></span>
              <span style={{ display: 'block', width: '25px', height: '3px', backgroundColor: '#fff' }}></span>
            </div>
          )}
          <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '15px' }} />
          <h2 style={{ margin: 0 }}>SMART RETAIL HUB</h2>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '250px',
            height: '100vh',
            backgroundColor: '#444',
            color: '#fff',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }} onClick={toggleSidebar}>
                Dashboard
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="" style={{ color: '#fff', textDecoration: 'none' }} onClick={toggleSidebar}>
                Add Products
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/maincompartment" style={{ color: '#fff', textDecoration: 'none' }} onClick={toggleSidebar}>
                Bill Section
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/description" style={{ color: '#fff', textDecoration: 'none' }} onClick={toggleSidebar}>
                Product Description
              </Link>
            </li>
            <li>
              <Link
                to=""
                style={{ color: '#fff', textDecoration: 'none' }}
                onClick={() => {
                  toggleSidebar();
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', padding: '20px', transition: 'margin-left 0.3s' }}>
        <h1>Add a New Product</h1>
        <form onSubmit={addProduct} style={{ display: 'grid', gap: '15px', maxWidth: '600px' }}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="number"
            placeholder="Product Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(Number(e.target.value))}
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', height: '100px' }}
          ></textarea>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {editingProductId ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        <h2>Product List</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                textAlign: 'center',
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={product.image}
                alt={product.productName}
                style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px' }}
              />
              <h3>{product.productName}</h3>
              <p>Quantity: {product.productQuantity}%</p>
              <p>Price: ₹{product.price}</p>
              <p>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDashboard;
