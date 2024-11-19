const express = require('express');
const { getAdmin, createAdmin, signInAdmin } = require('../controllers/Admin_Controller');
const router = express.Router();


// show admin information logic
router.get('/admin', getAdmin);

// create admin logic (the Authority is only for the Admin)
router.post('/createadminAccount', createAdmin);

// admin log-in logic 
router.post('/loginadminAccount', signInAdmin);




module.exports = router;