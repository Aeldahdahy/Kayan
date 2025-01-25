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
    getBrand,
    getBrandID, 
    updateBrand,
    deleteBrand, 
    createCategory, 
    getCategory,
    getCategoryID,
    updateCategory,
    deleteCategory,
    createSubCategory,
    getSubCategory,
    getSubCategoryID,
    updateSubCategory,
    deleteSubCategory,
    createProduct,
    getProduct,
    getProductID,
    updateProduct,
    deleteProduct,
} = require('../controllers/Admin_Controller');

const { 
    getClientBrand,
    getClientBrandID,
    getClientEnglishCategories,
    getClientArabicCategories,
    getClientEnglishCategoriesWithSubCategories,
    getClientEnglishSubCategories,
    getClientArabicSubCategories,
    getClientProductEn,
    getClientProductEnFilter,
    searchClientProductEn,
    getClientProductID,
    submitContactForm
} = require('../controllers/Client_Controller');




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

// Admin get-brand logic
router.get('/getBrand', authMiddleware, getBrand);

// Admin get-brand-id logic
router.get('/getBrandID/:id', authMiddleware, brandUpload.single('brand_logo'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    getBrandID(req, res);
});

// Admin update-brand logic
router.put('/updateBrand/:id', authMiddleware, brandUpload.single('brand_logo'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    updateBrand(req, res);
});

// Admin delete-brand logic
router.delete('/deleteBrand/:id', authMiddleware, deleteBrand);

// Admin create-category logic
router.post('/createCategory', authMiddleware, createCategory);

// Admin get-category logic
router.get('/getCategory', authMiddleware, getCategory);

// Admin get-category-id logic
router.get('/getCategoryID/:id', authMiddleware, getCategoryID);

// Admin update-category logic
router.put('/updateCategory/:id', authMiddleware, updateCategory);

// Admin delete-category logic
router.delete('/deleteCategory', authMiddleware, deleteCategory);

// Admin create-subCategory logic
router.post('/createSubCategory', authMiddleware, createSubCategory);

// Admin get-subCategory logic
router.get('/getSubCategory', authMiddleware, getSubCategory);

// Admin get-subCategory logic
router.get('/getSubCategoryID/:id', authMiddleware, getSubCategoryID);

// Admin update-subCategory logic
router.put('/updateSubCategory/:id', authMiddleware, updateSubCategory);

// Admin delete-subCategory logic
router.delete('/deleteSubCategory/:id', authMiddleware, deleteSubCategory);

// Admin create-Product logic
router.post('/createProduct', authMiddleware, productUpload.array('product_images[]', 10), (req, res) => {
    createProduct(req, res);
});

// Admin get-product logic
router.get('/getProduct', authMiddleware, getProduct);

// Admin get-product-by-id logic (no need for file upload on GET routes)
router.get('/getProductID/:id', authMiddleware, (req, res) => {
    getProductID(req, res);
});

// Admin update-product logic
router.put('/updateProduct/:id', authMiddleware, productUpload.array('product_images[]', 10), (req, res) => {
    updateProduct(req, res);
});

// Admin delete Product logic
router.delete('/deleteProduct/:id', authMiddleware, deleteProduct);

// Add a logout route to invalidate token
router.post('/logout', authMiddleware, logout);





// ---------------------------------------------------------------------------Client Routes----------------------------------------------------------------------------------------
// Get client brand
router.get('/getClientBrand', getClientBrand);

// Get client brand by ID
router.get('/getClientBrandID/:id', brandUpload.single('brand_logo'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    getClientBrandID(req, res);
});



// Get Category by English language
router.get('/getClientEnglishCategory', getClientEnglishCategories);

// Get category by Arabic language
router.get('/getClientArabicCategory', getClientArabicCategories);

// Get category by Arabic language
router.get('/getClientEnglishCategoriesWithSubCategories', getClientEnglishCategoriesWithSubCategories);

// Get SubCategory by English language
router.get('/getClientEnglishCategory', getClientEnglishSubCategories);

// Get SubCategory by Arabic language
router.get('/getClientArabicCategory', getClientArabicSubCategories);

// Client get-product logic
router.get('/getClientProductEn', getClientProductEn);

// Client get-product Filter logic
router.get('/getClientProductEnFilter', getClientProductEnFilter);

// Client Search get-project Filter logic
router.get('/searchClientProductEn', searchClientProductEn);

// Client get-product 
router.get('/getClientProductID/:id', (req, res) => {
    getClientProductID(req, res);
});

// contact form based on product
router.post('/submitContactForm', (req, res) => {
    submitContactForm(req, res);
});


module.exports = router;