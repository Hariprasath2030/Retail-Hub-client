import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import html2pdf from 'html2pdf.js';
import BarcodeScanner from './BarcodeScanner';
import BillDetails from './BillDetails';

function MainCompartment() {
  const [products, setProducts] = useState([]);
  const pdfRef = useRef();
  const navigate = useNavigate(); // Initialize navigate

  // Function to fetch the product based on user ID
  const handleScan = async (userId) => {
    try {
      const response = await fetch(
        `https://retail-hub-server.onrender.com/api/productts?userId=${userId}` // Use userId in API
      );
      if (response.ok) {
        const product = await response.json();
        const existingProduct = products.find((p) => p.userId === product.userId);

        if (existingProduct) {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.userId === product.userId
                ? { ...p, productQuantity: p.productQuantity + 1 }
                : p
            )
          );

          await fetch(
            `https://retail-hub-server.onrender.com/api/productts/decrement/${userId}`,
            { method: 'PATCH' }
          );
        } else {
          if (product.productQuantity <= 0) {
            alert('Product is out of stock!');
            return;
          }
          setProducts((prevProducts) => [...prevProducts, { ...product, productQuantity: 1 }]);
        }
      } else {
        alert('Product not found in the database.');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Function to handle quantity change in the local state
  const handleQuantityChange = (userId, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.userId === userId
          ? { ...product, productQuantity: Math.max(1, parseInt(newQuantity, 10) || 1) }
          : product
      )
    );
  };

  // Calculate total price
  const calculateTotalPrice = (productQuantity, price) => productQuantity * price;

  // Calculate grand total
  const grandTotal = products.reduce(
    (sum, product) => sum + calculateTotalPrice(product.productQuantity, product.price),
    0
  );

  const generatePDF = () => {
    const element = pdfRef.current;
  
    // Temporarily make the element visible for PDF generation
    element.style.visibility = 'visible';
    element.style.position = 'relative';
    element.style.width = '100%';
    element.style.height = 'auto';
  
    const options = {
      margin: 0.2,
      filename: 'store-receipt.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'in',
        format: [4, 8.5],
        orientation: 'portrait',
      },
    };
  
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .finally(() => {
        // Revert the element to its hidden state after PDF generation
        element.style.visibility = 'hidden';
        element.style.position = 'absolute';
        element.style.width = '0';
        element.style.height = '0';
      });
  };  

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '640px',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B5563', textAlign: 'center', marginBottom: '1.5rem' }}>
        User ID Scanner
      </h1>
      <BarcodeScanner onScan={handleScan} />

      <div
        style={{
          width: '100%',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '1.5rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            color: '#4B5563',
            fontWeight: '600',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Product Details
        </h2>
        <table style={{ width: '100%', tableLayout: 'auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#E5E7EB' }}>
              <th
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#4B5563',
                  fontWeight: '500',
                  borderBottom: '1px solid #D1D5DB',
                }}
              >
                Item
              </th>
              <th
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#4B5563',
                  fontWeight: '500',
                  borderBottom: '1px solid #D1D5DB',
                }}
              >
                Qty
              </th>
              <th
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#4B5563',
                  fontWeight: '500',
                  borderBottom: '1px solid #D1D5DB',
                }}
              >
                Total Price of product
              </th>
              
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? '#F9FAFB' : 'white',
                  transition: 'background-color 0.2s ease-in-out',
                }}
              >
                <td style={{ padding: '1rem', color: '#4B5563' }}>{product.productName}</td>
                <td style={{ padding: '1rem' }}>
                  <input
                    type="number"
                    value={product.productQuantity}
                    onChange={(e) =>
                      handleQuantityChange(product.userId, e.target.value)
                    }
                    min="1"
                    style={{
                      width: '4rem',
                      textAlign: 'center',
                      border: '1px solid #D1D5DB',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </td>
                <td style={{ padding: '1rem', color: '#4B5563' }}>
                  Rs. {(product.productQuantity * product.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            marginTop: '1.5rem',
            textAlign: 'right',
            color: '#4B5563',
            fontWeight: '600',
            fontSize: '1.25rem',
          }}
        >
          Total: Rs. {grandTotal.toFixed(2)}
        </div>
      </div>

      <div ref={pdfRef} style={{ visibility: 'hidden', position: 'absolute', top: 0, left: 0, width: 0, height: 0 }}>
        <BillDetails products={products} grandTotal={grandTotal} />
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button
          onClick={generatePDF}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#2563EB',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s ease-in-out',
            cursor: 'pointer',
          }}
        >
          Download Bill as PDF
        </button>
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#DC2626',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s ease-in-out',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default MainCompartment;
