import { useState } from 'react';

function BarcodeScanner({ onScan }) {
  const [userId, setUserId] = useState('');

  const handleScan = () => {
    if (userId.trim() !== '') {
      onScan(userId);
      setUserId('');
    } else {
      alert('Please enter a barcode');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Scan or enter barcode"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleScan}
        className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Send Barcode
      </button>
    </div>
  );
}

export default BarcodeScanner;
