import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const PDFGenerator = () => {
  const pdfRef = useRef();

  const generatePDF = () => {
    const element = pdfRef.current;

    const options = {
      margin: 1,
      filename: 'webpage-details.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <div ref={pdfRef}>
        <h1>Details to Convert to PDF</h1>
        <p>This is the content you want to save as a PDF.</p>
        {/* Include other content elements here */}
      </div>
      <button className='bg-slate-600 text-white p-6 rounded-xl' onClick={generatePDF}>Download as PDF</button>
    </div>
  );
};

export default PDFGenerator;
