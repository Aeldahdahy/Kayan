const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '../uploads/brands'); // Absolute path
        cb(null, uploadPath); // Save files in 'uploads/brands' folder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Save with unique filename
    }
});

const upload = multer({
    storage,
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

module.exports = upload;
