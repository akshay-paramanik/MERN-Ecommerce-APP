const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: 'dsa60nt2r',
  api_key: '358786478217295',
  api_secret: 'KfwQz6s-KE_HSJH5Zl0yR7SR7qQ'
});

// ✅ Storage Config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

// ✅ Upload Middleware
const upload = multer({ storage });

module.exports = upload;
