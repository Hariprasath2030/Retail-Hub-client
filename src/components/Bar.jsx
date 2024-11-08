// BarcodeScanner.js
import { useState } from "react";
import useScanDetection from "use-scan-detection";

function Bar({ onScanComplete }) {
  const [barcodeScan, setBarcodeScan] = useState("No barcode detected");

  useScanDetection({
    onComplete: (scanResult) => {
      setBarcodeScan(scanResult);
      onScanComplete(scanResult);  // Pass result to parent component
    },
    minLength: 3,
  });

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold">Barcode Scanner</h2>
      <p>Barcode: {barcodeScan}</p>
    </div>
  );
}

export default Bar;
