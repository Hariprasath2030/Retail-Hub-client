import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TotalPage = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const incrementQuantity = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity += 1;
    setProducts(newProducts);
  };

  const decrementQuantity = (index) => {
    const newProducts = [...products];
    if (newProducts[index].quantity > 0) {
      newProducts[index].quantity -= 1;
      setProducts(newProducts);
    }
  };

  const handlePriceChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index].price = parseFloat(value) || 0;
    setProducts(newProducts);
  };

  const calculateTotal = () => {
    return products.reduce((acc, product) => acc + product.quantity * product.price, 0).toFixed(2);
  };

  const handleAddProduct = async () => {
    if (newProductName && newQuantity > 0) {
      const productName = newProductName.toLowerCase();

      try {
        // Check if the product exists in the backend
        const existingProductResponse = await axios.get(`http://localhost:5000/api/products/${productName}`);
        const existingProduct = existingProductResponse.data;

        if (existingProduct && existingProduct.quantity >= newQuantity) {
          // Product exists and has enough quantity; decrement quantity in backend
          const updatedQuantity = existingProduct.quantity - newQuantity;

          await axios.put(`http://localhost:5000/api/products/${existingProduct._id}`, {
            quantity: updatedQuantity,
          });

          // Refresh product list from backend after the update
          const response = await axios.get('http://localhost:5000/api/products');
          setProducts(response.data);
        } else {
          alert('Product not found or insufficient quantity in backend.');
        }

        // Clear input fields
        setNewProductName('');
        setNewQuantity(0);
      } catch (error) {
        console.error('Error fetching or updating product:', error);
      }
    }
  };

  // Function to handle deleting a product
  const handleDeleteProduct = async (index) => {
    const productId = products[index]._id; // Assuming the product has a unique identifier
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      const updatedProducts = products.filter((_, productIndex) => productIndex !== index);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handlePrint = () => {
    navigate('/PDFDetails', { state: { products } });
  };

  return (
    <>
      <div className="flex justify-center">
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr className="bg-neutral-400">
              <th className="p-4 text-left">S.no</th>
              <th className="p-4 text-left">Product Name</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4 flex items-center">
                  <button className="px-2 py-1 bg-slate-900 text-white rounded" onClick={() => decrementQuantity(index)}>-</button>
                  <input type="text" className="w-12 mx-2 text-center border border-gray-400 rounded" value={product.quantity} readOnly />
                  <button className="px-2 py-1 bg-slate-900 text-white rounded" onClick={() => incrementQuantity(index)}>+</button>
                </td>
                <td className="p-4">
                  <input type="number" className="w-20 text-center border border-gray-400 rounded" value={product.price} onChange={(e) => handlePriceChange(index, e.target.value)} />
                </td>
                <td className="p-4">Rs.{(product.quantity * product.price).toFixed(2)}</td>
                <td className="p-4">
                  <button className="px-2 py-1 bg-slate-900 text-white rounded" onClick={() => handleDeleteProduct(index)}>Delete</button>
                </td>
              </tr>
            ))}
            <tr className="border-t border-gray-400">
              <td colSpan="4" className="p-4 text-right font-bold">Overall Total</td>
              <td className="p-4 font-bold">Rs.{calculateTotal()}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center p-4">
        <input 
          type="text" 
          placeholder="Product Name" 
          value={newProductName} 
          onChange={(e) => setNewProductName(e.target.value)} 
          className="border border-gray-400 rounded p-2 mx-2"
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={newQuantity} 
          onChange={(e) => setNewQuantity(Number(e.target.value))} 
          className="border border-gray-400 rounded p-2 mx-2"
        />
        <button 
          className="bg-slate-900 text-white rounded p-2" 
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      <div className="flex justify-center text-left p-8">
        <button className="p-4 rounded-xl bg-slate-900 text-white" onClick={handlePrint}>PRINT</button>
      </div>
    </>
  );
};

export default TotalPage;
