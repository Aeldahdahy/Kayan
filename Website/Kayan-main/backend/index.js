const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const Routes = require('./Routes/Routes');
const { authMiddleware, logout } = require('./middleware/authMiddleware');

require('dotenv').config();

// Serve static assets (CSS and JS) from the 'views' folder
app.use('/css', express.static(path.join(__dirname, 'views', 'css')));
app.use('/js', express.static(path.join(__dirname, 'views', 'js')));

// Serve uploaded files (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory for EJS templates
app.set('views', path.join(__dirname, 'views'));

// Route to render the login page
app.get('/', (req, res) => {
    res.render('index', { title: 'Admin Login' }); 
});
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Main Dashboard' }); 
});
app.get('/brand', (req, res) => {
    res.render('brand', { title: 'Brand' }); 
});
app.get('/category', (req, res) => {
    res.render('category', { title: 'Category' }); 
});
app.get('/subcategory', (req, res) => {
    res.render('subcategory', { title: 'Sub Category' }); 
});
app.get('/product', (req, res) => {
    res.render('product', { title: 'Product' }); 
});

// Use API routes (if any)
app.use('/public', Routes);

// Start the server
const PORT = process.env.PORT || 3000;  // Fallback to 3000 if PORT is not set
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
