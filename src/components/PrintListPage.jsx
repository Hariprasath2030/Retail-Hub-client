import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import './printlistpage.css'
const PrintListPage = () => {
  const location = useLocation();
  const { productList } = location.state || { productList: [] };

  // Initialize state with editable quantities and totals
  const [products, setProducts] = useState(
    productList.map((product) => ({
      ...product,
      quantity: 1, // Default quantity
      totalPrice: product.price, // Default total price
    }))
  );

  // Update quantity and recalculate total price for a product
  const updateQuantity = (index, newQuantity) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    updatedProducts[index].totalPrice = newQuantity * updatedProducts[index].price;
    setProducts(updatedProducts);
  };

  // Calculate total amount for all products
  const calculateTotalAmount = () => {
    return products.reduce((sum, product) => sum + product.totalPrice, 0);
  };

  // Download the data as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Set font to Times New Roman
    doc.setFont("times", "normal");
  
    // Title
    doc.setFontSize(18);
    doc.setFont("times", "bold");
    doc.text("Selected Products", 105, 20, { align: "center" });
  
    // Table Headers
    const headers = ["S.NO", "Product", "Price", "Quantity", "Total Price"];
    const startX = 10;
    const startY = 30;
    const colWidths = [20, 80, 30, 30, 30]; // Adjust column widths
  
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    headers.forEach((header, index) => {
      doc.text(header, startX + colWidths.slice(0, index).reduce((a, b) => a + b, 0), startY);
    });
  
    // Table Rows
    let y = startY + 10;
    doc.setFont("times", "normal");
    products.forEach((product, index) => {
      const rowData = [
        (index + 1).toString(),
        product.productName,
        `₹${product.price}`,
        product.quantity.toString(),
        `₹${product.totalPrice}`,
      ];
      rowData.forEach((data, colIndex) => {
        doc.text(data, startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0), y);
      });
      y += 10;
    });
  
    // Total Amount
    doc.setFont("times", "bold");
    doc.text(
      `Total Amount: ₹${calculateTotalAmount()}`,
      startX,
      y + 10,
      { align: "left" }
    );
  
    // Save PDF
    doc.save("Selected_Products.pdf");
  };
  

  return (
    <div className="print-list-page p-4">
      <h1 className="text-xl font-bold mb-4">Selected Products</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-2 py-1">S.NO</th>
            <th className="border border-gray-300 px-2 py-1">Product</th>
            <th className="border border-gray-300 px-2 py-1">Price</th>
            <th className="border border-gray-300 px-2 py-1">Quantity</th>
            <th className="border border-gray-300 px-2 py-1">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
              <td className="border border-gray-300 px-2 py-1">{product.productName}</td>
              <td className="border border-gray-300 px-2 py-1">₹{product.price}</td>
              <td className="border border-gray-300 px-2 py-1">
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  className="w-16 border border-gray-400 text-center"
                  onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10) || 1)}
                />
              </td>
              <td className="border border-gray-300 px-2 py-1">₹{product.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-amount mt-4 text-lg font-bold">
        Total Amount: ₹{calculateTotalAmount()}
      </div>

      <div className="buttons mt-4">
        <button
          className="download-pdf-btn bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={downloadPDF}
        >
          Download as PDF
        </button>
        <Link to="/customer" className="back-button bg-blue-500 text-white px-4 py-2 rounded">
          Back to Customer Page
        </Link>
      </div>
    </div>
  );
};

export default PrintListPage;
