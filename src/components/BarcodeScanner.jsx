import  { useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#scanner') // This is the element where the camera feed will be displayed
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader'] // Add barcode formats you want to scan
      }
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    });

    // Event listener for detected barcodes
    Quagga.onDetected((data) => {
      console.log('Barcode detected: ', data.codeResult.code);
      alert(`Barcode detected: ${data.codeResult.code}`);
      Quagga.stop(); // Stop scanning after detection
    });

    // Clean up on component unmount
    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <div id="scanner" style={{ width: '500px', height: '300px' }}></div>
    </div>
  );
};

export default BarcodeScanner;
