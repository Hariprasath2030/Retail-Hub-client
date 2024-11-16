import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';
import { Button } from 'antd';
import { useAuth } from '..//contexts/AuthContext';
import logo from '/src/assets/retail.png'; // Import your logo image
import { Link } from "react-router-dom";
import { message } from 'antd';



const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

  useEffect(() => {
    fetchProducts();
  }, [4]);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
      checkLowStock(res.data); 
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  const checkLowStock = (products) => {
    const lowStockProducts = products.filter((product) => product.productQuantity < 50);
    if (lowStockProducts.length > 0) {
      // Notify the user about low-stock products
      lowStockProducts.forEach((product) => {
        message.warning(`Low stock alert: ${product.productName} is below 50%!`, 4); // Message will disappear after 5 seconds
      });
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
  
      // Update the local state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, ...updatedProduct } : product
        )
      );
      setEditingProductId(null);
  
      // Show success alert
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Please enter your valid quantity!');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const getCircleColor = (quantity) => {
    if (quantity >= 80) return '#4caf50';
    if (quantity >= 50) return '#ff9800';
    return '#f44336';
  };

  const { logout } = useAuth();

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <ul>
          <br></br>
          <br></br>
          <br></br>
          <li>
      <Link to="" onClick={toggleSidebar}>Dashboard</Link>
    </li>
    <li>
      <Link to="/addproduct" onClick={toggleSidebar}>Add Products</Link>
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
      <div className={`content ${isSidebarOpen ? 'shift' : ''}`}>
        {isSidebarOpen && (
          <div className="toggle-button close" onClick={toggleSidebar}>
            <span></span>
            <span></span>
          </div>
        )}
      <div className="background1-image"></div>
      <div style={{ padding: '20px'}}>
        <br></br>
        <br></br>
        <h1 style={{ fontSize: '3.5em', color: '#333', textAlign: 'center', marginBottom: '20px',  fontWeight: 'bold'}}> Product Dashboard</h1>
        <br></br>
       
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
                   {editingProductId === product._id ? (
              <div style={{ marginTop: '15px' }}>
              <input
                type="text"
                value={product.productName}
                onChange={(e) =>
                  setProducts((prev) =>
                    prev.map((p) =>
                      p._id === product._id
                        ? { ...p, productName: e.target.value }
                        : p
                    )
                  )
                }
                style={{ marginBottom: '10px', width: '100%', borderColor: '#4caf50', borderRadius: '4px', padding: '5px',border: 'solid 2px #616664' }}
              />
               <input
              type="number"
            value={product.productQuantity}
             min="0"
            max="100"
              onChange={(e) => {
              const value = Math.min(100, Math.max(0, parseInt(e.target.value, 10)));
               setProducts((prev) =>
                 prev.map((p) =>
               p._id === product._id
                 ? { ...p, productQuantity: value }
               : p
             )
            );
                }}
                style={{ marginBottom: '10px', width: '100%', borderColor: '#4caf50', borderRadius: '4px', padding: '5px',border: 'solid 2px #616664' }}
              />
              <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px', // Spacing between buttons
      marginTop: '10px',
    }}
  >
              <button
                onClick={() =>
                  editProduct(product._id, {
                    productName: product.productName,
                    productQuantity: product.productQuantity,
                  })
                }
                style={{
                  marginRight: '5px',
                  padding: '5px 10px',
                  backgroundColor: '#5b5b5b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = 'black')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '  #5b5b5b')}
              >
                Save
              </button>
              <button
                onClick={() => setEditingProductId(null)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#6f3434',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#d32f2f')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#6f3434')}
              >
                Cancel
              </button>
            </div>
              </div>
            ) : (
            <>
              <h3 style={{ margin: '10px 0' }}>{product.productName}</h3>
              <button
                onClick={() => setEditingProductId(product._id)}
                style={{
                  marginRight: '5px',
                  padding: '5px 10px',
                  backgroundColor: ' #5b5b5b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = 'black')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#5b5b5b')}
                >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: ' #6f3434',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#d32f2f')}
                onMouseOut={(e) => (e.target.style.backgroundColor = ' #6f3434')}
                >
                Delete
              </button>
            </>
            
            )}
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
              <th>Price of one product</th>
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
      </div>
    </>
  );
};

export default ProductDashboard;
