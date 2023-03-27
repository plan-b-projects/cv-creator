import React from 'react';
import { jsPDF, HTMLOptionImage } from 'jspdf';
import { toPng, toCanvas } from 'html-to-image';
type props = {
  html?: React.MutableRefObject<HTMLDivElement>;
};

// we need to install:
// jspdf
// html-to-image

const GeneratePdf: React.FC<props> = ({ html }) => {
  const generatePdf = () => {
    const doc = new jsPDF();

    let split = doc.splitTextToSize(
      document.getElementById('text')!.innerText,
      200,
    );
    // let image = document
    //   .getElementById('image')!
    //   .getAttribute('pdf-second-try');
    doc.text(
      document.querySelector('add pdf template element here')!.innerHTML,
      75,
      5,
    );
    // doc.addImage(image!, 70, 7, 60, 60);
    doc.text(split, 5, 75);
    doc.output('dataurlnewwindow');
  };

  const generateImage = async () => {
    const image = await toPng(html!.current, { quality: 0.95 });
    const doc = new jsPDF();

    doc.addImage(image, 'JPEG', 15, 40, 100, 100);
    doc.save();
  };
  return (
    <div className="button-container">
      <button onClick={generateImage}>Get PDF using image</button>
      <button onClick={generatePdf}>Get PDF as text</button>
    </div>
  );
};

export default GeneratePdf;
