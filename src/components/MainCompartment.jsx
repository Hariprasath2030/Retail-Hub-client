import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import html2pdf from 'html2pdf.js';
import BarcodeScanner from './BarcodeScanner';
import BillDetails from './BillDetails';

function MainCompartment() {
  const [products, setProducts] = useState([]);
  const pdfRef = useRef();
  const navigate = useNavigate(); // Initialize navigate

  // Change handleScan to accept userId instead of barcode
  const handleScan = async (userId) => {
    try {
      const response = await fetch(
        `https://retail-hub-server.onrender.com/api/products?userId=${userId}` // Changed barcode to userId in API
      );
      if (response.ok) {
        const product = await response.json();

        const existingProduct = products.find((p) => p.userId === product.userId); // Changed barcode to userId

        if (existingProduct) {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.userId === product.userId // Changed barcode to userId
                ? { ...p, productQuantity: p.productQuantity + 1 }
                : p
            )
          );

          await fetch(
            `https://retail-hub-server.onrender.com/api/products/decrement/${userId}`, // Changed barcode to userId in PATCH request
            {
              method: 'PATCH',
            }
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

  const handleQuantityChange = (userId, newQuantity) => { // Changed barcode to userId
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.userId === userId // Changed barcode to userId
          ? { ...product, productQuantity: Math.max(1, parseInt(newQuantity, 10) || 1) }
          : product
      )
    );
  };

  const calculateTotalPrice = (productQuantity, price) => productQuantity * price;

  const grandTotal = products.reduce(
    (sum, product) => sum + calculateTotalPrice(product.productQuantity, product.price),
    0
  );

  const generatePDF = () => {
    setTimeout(() => {
      const element = pdfRef.current;
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

      html2pdf().set(options).from(element).save();
    }, 500);
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        User ID Scanner
      </h1>
      <BarcodeScanner onScan={handleScan} /> {/* Changed to use userId */}

      <div className="w-full max-w-5xl mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl text-gray-700 font-semibold mb-4 text-center">
          Product Details
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left text-gray-600 font-medium border-b border-gray-300">
                Item
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium border-b border-gray-300">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium border-b border-gray-300">
                Price
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium border-b border-gray-300">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-3 text-gray-700">{product.name}</td>
                <td className="px-6 py-3">
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.userId, e.target.value) // Changed barcode to userId
                    }
                    min="1"
                    className="w-16 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="px-6 py-3 text-gray-700">
                  Rs. {product.price.toFixed(2)}
                </td>
                <td className="px-6 py-3 text-gray-700">
                  Rs. {(product.quantity * product.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-right text-gray-800 font-semibold text-xl">
          Total: Rs. {grandTotal.toFixed(2)}
        </div>
      </div>

      <div ref={pdfRef} className="invisible absolute top-0 left-0 w-0 h-0">
        <BillDetails products={products} grandTotal={grandTotal} />
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={generatePDF}
          className="px-8 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Download Bill as PDF
        </button>
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          className="px-8 py-3 bg-red-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default MainCompartment;
