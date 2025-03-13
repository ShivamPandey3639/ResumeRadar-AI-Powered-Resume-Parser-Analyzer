const fs = require('fs');
const path = require('path');

// Source path in node_modules
const workerSrc = path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.min.js');

// Destination path in public directory
const workerDest = path.join(__dirname, '../public/pdf.worker.min.js');

// Create public directory if it doesn't exist
if (!fs.existsSync(path.dirname(workerDest))) {
  fs.mkdirSync(path.dirname(workerDest), { recursive: true });
}

// Copy the worker file
fs.copyFileSync(workerSrc, workerDest);
console.log('PDF.js worker file copied to public directory'); 