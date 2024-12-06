import { useState } from 'react';

function BarcodeScanner({ onScan }) {
  const [barcode, setBarcode] = useState('');

  const handleScan = () => {
    if (barcode.trim() !== '') {
      onScan(barcode);
      setBarcode('');
    } else {
      alert('Please enter a barcode');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Scan or enter barcode"
      />
      <button onClick={handleScan}>Send Barcode</button>
    </div>
  );
}

export default BarcodeScanner;
