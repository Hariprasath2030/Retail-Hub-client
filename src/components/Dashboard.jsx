import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';
import { Button } from 'antd';
import { useAuth } from '..//contexts/AuthContext';
import logo from '/src/assets/retail.png'; // Import your logo image


const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [editingProductId, setEditingProductId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
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

  const getCircleColor = (quantity) => {
    if (quantity >= 80) return '#4caf50';
    if (quantity >= 50) return '#ff9800';
    return '#f44336';
  };

  const { logout } = useAuth();

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={logo} alt="Logo" />
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
      <div className="background-image"></div>
      <div style={{ padding: '20px'}}>
        <br></br>
        <br></br>
        <h1 style={{ fontSize: '3.5em', color: '#333', textAlign: 'center', marginBottom: '20px',  fontWeight: 'bold'}}> Product Dashboard</h1>
        <br></br>
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

        {loading && <CircularProgressbar value={0} />}
          <>
          <h2 style={{ fontSize: '2.5em', color: '#333', marginBottom: '20px',  fontWeight: 'bold'}}> Circular Display - Product</h2>
            <br></br>
            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {products.map((product) => (
                <div key={product._id} style={{
                  width: '150px',
                  textAlign: 'center',
                  border: '2px solid #313131',
                  fontSize: '18px',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}>
                  <CircularProgressbar
                    value={product.productQuantity}
                    maxValue={100}
                    text={`${product.productQuantity}%`}
                    styles={buildStyles({
                      pathColor: getCircleColor(product.productQuantity),
                      textColor: '#000',
                      trailColor: '#d6d6d6',
                    })}
                  />
                  <div className="product-info">
                    <strong>{product.productName}</strong>
                    <div style={{ marginTop: '10px' }}>
                    <div className="button-group">
                      <button onClick={() => editProduct(product)}>Edit</button>
                      <button className="delete-button" onClick={() => deleteProduct(product._id)}>Delete</button>
                     </div>   
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </>
          <h2 style={{ fontSize: '2.5em', color: '#333', marginBottom: '20px',  fontWeight: 'bold'}}>Product List</h2>
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
              <tr key={`table-${item._id}`}>
                <td>{item.userId}</td>
                <td>{item.productName}</td>
                <td>{item.productQuantity}%</td>
                <td>${item.price ? item.price.toFixed(2) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductDashboard;
