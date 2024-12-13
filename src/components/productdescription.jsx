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
    formData.append('upload_preset', 'Hari2030'); // Replace with your Cloudinary preset
    formData.append('cloud_name', 'dnpasyy3z'); // Replace with your Cloudinary cloud name

    const res = await axios.post('https://api.cloudinary.com/v1_1/dnpasyy3z/image/upload', formData);
    return res.data.url;
  };

  const addOrUpdateProduct = async (e) => {
    e.preventDefault();
    const imageUrl = image ? await handleImageUpload() : null;
    const newProduct = { userId, productName, productQuantity, price, description, image: imageUrl || undefined };

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

  const editProduct = (product) => {
    setEditingProductId(product._id);
    setUserId(product.userId);
    setProductName(product.productName);
    setProductQuantity(product.productQuantity);
    setPrice(product.price);
    setDescription(product.description);
    setImage(null); // Reset image as it should be re-uploaded if changed
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://retail-hub-server.onrender.com/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error);
    }
  };

  const clearForm = () => {
    setUserId('');
    setProductName('');
    setProductQuantity(0);
    setPrice(0);
    setDescription('');
    setImage(null);
    setEditingProductId(null);
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
        <button
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
        </button>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <br />
          <br />
          <br />
          <li>
            <Link to="/dashboard" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/addproduct" onClick={toggleSidebar}>
              Add Products
            </Link>
          </li>
          <li>
            <Link to="/mainCompartment" onClick={toggleSidebar}>
              Bill section
            </Link>
          </li>
          <li>
            <Link to="/productdescription" onClick={toggleSidebar}>
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
          <br />
          <br />
          <h1 style={{ fontSize: '3.5em', color: '#333', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
            Product Dashboard
          </h1>
          <br />
      {/* Main Content */}
      <div
        style={{
          marginLeft: isSidebarOpen ? '250px' : '0',
          transition: 'margin-left 0.3s ease',
          padding: '20px',
        }}
      >
{/* Product Form */}
<form
  onSubmit={addOrUpdateProduct}
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '90%', // Flexible width for smaller screens
    margin: '0 auto 20px',
  }}
>
  <input
    type="text"
    placeholder="User ID"
    value={userId}
    onChange={(e) => setUserId(e.target.value)}
    required
    style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      boxSizing: 'border-box',
      width: '100%', // Responsive width
    }}
  />
  <input
    type="text"
    placeholder="Product Name"
    value={productName}
    onChange={(e) => setProductName(e.target.value)}
    required
    style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      boxSizing: 'border-box',
      width: '100%', // Responsive width
    }}
  />
  <input
    type="number"
    placeholder="Product Quantity"
    value={productQuantity}
    onChange={(e) => setProductQuantity(Number(e.target.value))}
    required
    style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      boxSizing: 'border-box',
      width: '100%', // Responsive width
    }}
  />
  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(Number(e.target.value))}
    required
    style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      boxSizing: 'border-box',
      width: '100%', // Responsive width
    }}
  />
  <textarea
    placeholder="Product Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
    style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      boxSizing: 'border-box',
      resize: 'none',
      width: '100%', // Responsive width
      height: '100px',
    }}
  />
  <input
    type="file"
    onChange={(e) => setImage(e.target.files[0])}
    accept="image/*"
    style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      boxSizing: 'border-box',
      width: '100%', // Responsive width
    }}
  />
  <button
    type="submit"
    style={{
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%', // Responsive button width
    }}
  >
    {editingProductId ? 'Update Product' : 'Add Product'}
  </button>
</form>
<div
  style={{
    maxWidth: '1200px', // Set the maximum width
    margin: '0 auto', // Center the container horizontally
    padding: '0 20px', // Optional: Add padding for small screens
  }}
>
  <div
    style={{
      display: 'flex', // Use flexbox for layout
      flexDirection: 'row', // Align items in a row
      justifyContent: 'center', // Center items horizontally
      flexWrap: 'wrap', // Wrap content to the next row
      gap: '20px', // Add spacing between items
      margin: '20px 0', // Optional: Add some margin around the container
    }}
  >
    {products.map((product) => (
      <div
        key={product._id}
        style={{
          width: '250px', // Fixed width
          height: '350px', // Fixed height
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '15px',
          textAlign: 'center',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex', // Flexbox for vertical alignment
          flexDirection: 'column',
          justifyContent: 'space-between', // Space items evenly
          alignItems: 'center', // Center content
        }}
      >
        <img
          src={product.image}
          alt={product.productName}
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '5px',
          }}
        />
        <h3 style={{ margin: '10px 0', fontSize: '16px' }}>{product.productName}</h3>
        <p style={{ fontSize: '16px' }}>No of Quantity: {product.productQuantity}</p>
        <p style={{ fontSize: '16px' }}>Price: ₹{product.price}</p>
        <p style={{ fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <button
            onClick={() => editProduct(product)}
            style={{
              backgroundColor: '#FFC107',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
          <button
            onClick={() => deleteProduct(product._id)}
            style={{
              backgroundColor: '#FF5722',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
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


          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDashboard;
