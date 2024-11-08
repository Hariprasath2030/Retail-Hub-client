import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const PDFDetails = () => {
  const location = useLocation();
  const { products = [] } = location.state || {}; // Default to an empty array if no products are passed

  const pdfRef = useRef();

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return products.reduce((acc, product) => acc + product.quantity * product.price, 0).toFixed(2);
  };

  // Function to generate PDF
  const generatePDF = () => {
    const element = pdfRef.current;
    const options = {
      margin: 0.2,
      filename: 'store-receipt.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: [3.15, 11.7], orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <>
      <div ref={pdfRef} className="p-4 bg-white text-black font-mono max-w-xs mx-auto rounded shadow-md">
        <h2 className="text-center text-lg font-bold mb-2">Store Receipt</h2>
        <div className="text-sm">
          <p className="text-center">123 Market St.</p>
          <p className="text-center mb-4">City, ST 12345</p>
        </div>
        <table className="w-full text-xs mb-2">
          <thead>
            <tr className="border-b">
              <th className="py-1">Item</th>
              <th className="py-1 text-right">Qty</th>
              <th className="py-1 text-right">Price</th>
              <th className="py-1 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-1">{product.name}</td>
                <td className="py-1 text-right">{product.quantity}</td>
                <td className="py-1 text-right">Rs. {product.price.toFixed(2)}</td>
                <td className="py-1 text-right">Rs. {(product.quantity * product.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between text-sm font-semibold mt-4">
          <span>Subtotal</span>
          <span>Rs. {calculateSubtotal()}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold">
          <span>Tax (10%)</span>
          <span>Rs. {(calculateSubtotal() * 0.1).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold border-t border-gray-400 mt-2 pt-2">
          <span>Total</span>
          <span>Rs. {(calculateSubtotal() * 1.1).toFixed(2)}</span>
        </div>
        <div className="text-center text-xs mt-4">
          <p>Thank you for shopping with us!</p>
          <p>Please come again.</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="p-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors"
          onClick={generatePDF}
        >
          Download Receipt
        </button>
      </div>
    </>
  );
};

export default PDFDetails;
