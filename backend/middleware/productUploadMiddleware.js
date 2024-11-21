const multer = require('multer');
const path = require('path');

// Configure storage for product images
const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '../uploads/products'); // Absolute path for product images
        cb(null, uploadPath); // Save files in 'uploads/products' folder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Save with a unique filename
    }
});

const productUpload = multer({
    storage: productStorage,
    fileFilter: (req, file, cb) => {
        // Accept only jpg and png images
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];

        if (file.mimetype.startsWith('image/') && allowedExtensions.includes(fileExtension)) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg and .png image files are allowed'), false);
        }
    }
});

module.exports = productUpload;
