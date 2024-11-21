const express = require('express');
const router = express.Router();
const brandUpload = require('../middleware/brandUploadMiddleware');
const productUpload = require('../middleware/productUploadMiddleware');
const { authMiddleware, logout } = require('../middleware/authMiddleware');
const { 
    getAdmin,
    createAdmin, 
    signInAdmin, 
    createBrand, 
    updateBrand, 
    deleteBrand, 
    createCategory, 
    updateCategory, 
    deleteCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/Admin_Controller');

// Show admin information logic
router.get('/admin', authMiddleware, getAdmin);

// Create admin logic (the Authority is only for the Admin)
router.post('/createadminAccount', createAdmin);

// Admin login logic - ensure user can't log in if they already have an active token
router.post('/loginadminAccount', signInAdmin);

// Admin create-brand logic
router.post('/createBrand', authMiddleware, brandUpload.single('brand_logo'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    createBrand(req, res);
});

// Admin update-brand logic
router.put('/updateBrand', authMiddleware, brandUpload.single('brand_logo'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    updateBrand(req, res);
});

// Admin delete-brand logic
router.delete('/deleteBrand', authMiddleware, deleteBrand);

// Admin create-category logic
router.post('/createCategory', authMiddleware, createCategory);

// Admin update-category logic
router.put('/updateCategory', authMiddleware, updateCategory);

// Admin delete-category logic
router.delete('/deleteCategory', authMiddleware, deleteCategory);

// Admin create-subCategory logic
router.post('/createSubCategory', authMiddleware, createSubCategory);

// Admin update-subCategory logic
router.put('/updateSubCategory', authMiddleware, updateSubCategory);

// Admin delete-subCategory logic
router.delete('/deleteSubCategory', authMiddleware, deleteSubCategory);

// Admin create-Product logic
router.post('/createProduct', authMiddleware, productUpload.single('product_image'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    createProduct(req, res);
});

// Admin update-Product logic
router.put('/updateProduct', authMiddleware, productUpload.single('product_image'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    updateProduct(req, res);
});

// Admin delete Product logic
router.delete('/deleteProduct', authMiddleware, deleteProduct);

// Add a logout route to invalidate token
router.post('/logout', authMiddleware, logout);

module.exports = router;