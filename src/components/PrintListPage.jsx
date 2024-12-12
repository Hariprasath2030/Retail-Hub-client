import React from "react";
import { useLocation, Link } from "react-router-dom";

const PrintListPage = () => {
  const location = useLocation();
  const { productList } = location.state || { productList: [] };

  return (
    <div className="print-list-page">
      <h1 className="text-xl font-bold mb-4">Selected Products</h1>
      {productList.length > 0 ? (
        <ul className="product-list">
          {productList.map((product, index) => (
            <li key={index} className="product-item mb-2">
              <span className="font-bold">{product.title}</span> - ₹{product.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products selected.</p>
      )}
      <Link to="/" className="back-button bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        Back to Customer Page
      </Link>
    </div>
  );
};

export default PrintListPage;
