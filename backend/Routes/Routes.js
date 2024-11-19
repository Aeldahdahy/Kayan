const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileUploadMiddleware');
const verifyToken = require('../middleware/authMiddleware');
const { getAdmin, createAdmin, signInAdmin, createBrand, updateBrand } = require('../controllers/Admin_Controller');


// show admin information logic
router.get('/admin', getAdmin);

// create admin logic (the Authority is only for the Admin)
router.post('/createadminAccount', createAdmin);

// admin log-in logic 
router.post('/loginadminAccount', signInAdmin);

// admin create-brand logic
router.post('/createBrand', verifyToken, upload.single('brand_logo'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    createBrand(req, res);
});

router.put('/updateBrand', verifyToken, upload.single('brand_logo'), (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    updateBrand(req, res);
});


module.exports = router;