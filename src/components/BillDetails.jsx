// BillDetails.jsx'

function BillDetails({ products, grandTotal }) {
  return (
    <div className="p-4">
      <div className="text-center mb-3">
        <h2 className="text-xl font-bold">Grocery Store Receipt</h2>
        <p className="text-sm">Thank you for shopping with us!</p>
        <p className="text-sm">------------------------------------</p>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Item</th>
            <th className="text-center">Qty</th>
            <th className="text-right">Price</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="py-1">{product.name}</td>
              <td className="text-center">{product.quantity}</td>
              <td className="text-right">Rs. {product.price.toFixed(2)}</td>
              <td className="text-right">Rs. {(product.quantity * product.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 text-right">
        <p className="font-bold">Total: Rs. {grandTotal.toFixed(2)}</p>
        <p>------------------------------------</p>
        <p className="font-medium">Thank you for your purchase!</p>
      </div>
    </div>
  );
}

export default BillDetails;
