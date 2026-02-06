const https = require('https');
const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Image URLs
const imageUrls = [
  {
    url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0a149f18-5a05-4ea1-a93c-c9c32a2ac416/custom-nike-mercurial-vapor-15-elite-by-you.png',
    filename: 'football_shoes_black1.avif'
  },
  {
    url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/mercurial-vapor-15-elite-fg-high-top-football-boot-6XK2Kq.png',
    filename: 'football_shoes1.avif'
  }
];

// Download function
function downloadImage(url, filename) {
  const filePath = path.join(publicDir, filename);
  
  console.log(`Downloading ${url} to ${filePath}...`);
  
  const file = fs.createWriteStream(filePath);
  
  https.get(url, (response) => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Download completed: ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${url}: ${err.message}`);
  });
}

// Download all images
console.log('Starting image downloads...');
imageUrls.forEach(image => {
  downloadImage(image.url, image.filename);
});

console.log('Download process initiated. This might take a few moments...'); 