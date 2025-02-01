const db = require('../db/db');
const fs = require('fs');
const path = require('path');


const getClientBrand = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve all brands from the database
            const [brands] = await connection.query(
                'SELECT brand_id, brand_name, brand_country, brand_logo, language FROM brand'
            );

            if (brands.length === 0) {
                return res.status(404).json({ message: 'No brands found' });
            }

            res.status(200).json({ message: 'Brands retrieved successfully', brands });

        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getClientBrandID = async (req, res) => {
    const brand_id = req.params.id;  // Extract the brand ID from the request parameters

    if (!brand_id) {
        return res.status(400).json({ message: 'Brand ID is required' });
    }

    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve a single brand based on the provided brand_id
            const [brand] = await connection.query(
                'SELECT brand_id, brand_name, brand_country, brand_logo, language FROM brand WHERE brand_id = ?',
                [brand_id]
            );

            if (brand.length === 0) {
                return res.status(404).json({ message: 'Brand not found' });
            }

            res.status(200).json({ message: 'Brand retrieved successfully', brand: brand[0] });

        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};



const getClientEnglishCategories = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve English categories
            const [categories] = await connection.query(
                'SELECT category_id, category_name, language FROM category WHERE language = ?',
                ['en']
            );

            if (categories.length === 0) {
                return res.status(404).json({ message: 'No English categories found' });
            }

            res.status(200).json({ 
                message: 'English categories retrieved successfully', 
                categories 
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getClientArabicCategories = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve Arabic categories
            const [categories] = await connection.query(
                'SELECT category_id, category_name, language FROM category WHERE language = ?',
                ['ar']
            );

            if (categories.length === 0) {
                return res.status(404).json({ message: 'No Arabic categories found' });
            }

            res.status(200).json({ 
                message: 'Arabic categories retrieved successfully', 
                categories 
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getClientEnglishCategoriesWithSubCategories = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve English subcategories
            const [subCategories] = await connection.query(
                'SELECT sub_category_id, sub_category_name, category_id, language FROM sub_category WHERE language = ?',
                ['en']
            );

            if (subCategories.length === 0) {
                return res.status(404).json({ message: 'No English subcategories found' });
            }

            // Retrieve category names for the corresponding category_ids
            const categoryIds = subCategories.map(subCategory => subCategory.category_id);
            const [categories] = await connection.query(
                'SELECT category_id, category_name FROM category WHERE category_id IN (?)',
                [categoryIds]
            );

            // Create a mapping of category_id to category_name
            const categoryMap = categories.reduce((map, category) => {
                map[category.category_id] = category.category_name;
                return map;
            }, {});

            // Organize categories and their subcategories
            const categoriesWithSubCategories = categories.map(category => {
                const relatedSubCategories = subCategories.filter(
                    subCategory => subCategory.category_id === category.category_id
                );
                return {
                    category_id: category.category_id,
                    category_name: category.category_name,
                    subcategories: relatedSubCategories
                };
            });

            res.status(200).json({
                message: 'Categories with subcategories retrieved successfully',
                categories: categoriesWithSubCategories,
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};



const getClientEnglishSubCategories = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve English subcategories
            const [subCategories] = await connection.query(
                'SELECT sub_category_id, sub_category_name, category_id, language FROM sub_category WHERE language = ?',
                ['en']
            );

            if (subCategories.length === 0) {
                return res.status(404).json({ message: 'No English subcategories found' });
            }

            // Retrieve category names for the corresponding category_ids
            const categoryIds = subCategories.map(subCategory => subCategory.category_id);
            const [categories] = await connection.query(
                'SELECT category_id, category_name FROM category WHERE category_id IN (?)',
                [categoryIds]
            );

            // Create a mapping of category_id to category_name
            const categoryMap = categories.reduce((map, category) => {
                map[category.category_id] = category.category_name;
                return map;
            }, {});

            // Add category_name to each subcategory
            subCategories.forEach(subCategory => {
                subCategory.category_name = categoryMap[subCategory.category_id] || 'N/A';
            });

            res.status(200).json({
                message: 'English subcategories retrieved successfully',
                subCategories,
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getClientArabicSubCategories = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve Arabic subcategories
            const [subCategories] = await connection.query(
                'SELECT sub_category_id, sub_category_name, category_id, language FROM sub_category WHERE language = ?',
                ['ar']
            );

            if (subCategories.length === 0) {
                return res.status(404).json({ message: 'No Arabic subcategories found' });
            }

            // Retrieve category names for the corresponding category_ids
            const categoryIds = subCategories.map(subCategory => subCategory.category_id);
            const [categories] = await connection.query(
                'SELECT category_id, category_name FROM category WHERE category_id IN (?)',
                [categoryIds]
            );

            // Create a mapping of category_id to category_name
            const categoryMap = categories.reduce((map, category) => {
                map[category.category_id] = category.category_name;
                return map;
            }, {});

            // Add category_name to each subcategory
            subCategories.forEach(subCategory => {
                subCategory.category_name = categoryMap[subCategory.category_id] || 'N/A';
            });

            res.status(200).json({
                message: 'Arabic subcategories retrieved successfully',
                subCategories,
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getClientProductEn = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve all English products along with the product image
            const [products] = await connection.query(
                `SELECT 
                    p.product_id, p.product_name, p.product_description, p.product_sale, p.stock_quantity, p.language, 
                    p.sub_category_id, p.brand_id, p.admin_id, 
                    pi.image AS product_image  -- Get the image from the product_image table
                 FROM product p
                 LEFT JOIN product_image pi ON p.product_id = pi.product_id
                 WHERE p.language = 'en'`  // Filter by English language
            );

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found for English' });
            }

            // Extract all subcategory_ids and brand_ids from the products
            const subCategoryIds = products.map(product => product.sub_category_id);
            const brandIds = products.map(product => product.brand_id);

            // Fetch subcategory and brand details
            const [subCategories] = await connection.query(
                'SELECT sub_category_id, sub_category_name FROM sub_category WHERE sub_category_id IN (?)',
                [subCategoryIds]
            );
            const [brands] = await connection.query(
                'SELECT brand_id, brand_name FROM brand WHERE brand_id IN (?)',
                [brandIds]
            );

            // Create mappings for subcategory and brand
            const subCategoryMap = subCategories.reduce((map, subCategory) => {
                map[subCategory.sub_category_id] = subCategory.sub_category_name;
                return map;
            }, {});

            const brandMap = brands.reduce((map, brand) => {
                map[brand.brand_id] = brand.brand_name;
                return map;
            }, {});

            // Add subcategory_name, brand_name, and image URL to each product
            products.forEach(product => {
                product.sub_category_name = subCategoryMap[product.sub_category_id] || 'N/A';
                product.brand_name = brandMap[product.brand_id] || 'N/A';
                product.product_image = product.product_image ? `/uploads/products/${product.product_image}` : '/path/to/default-image.jpg';
            });

            res.status(200).json({
                message: 'English products retrieved successfully',
                products,
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getClientProductEnFilter = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            const { brand_id, sub_category_id } = req.query; // Get optional query parameters
            
            // Build the base query
            let query = `
                SELECT 
                    p.product_id, p.product_name, p.product_description, p.product_sale, p.stock_quantity, p.language, 
                    p.sub_category_id, p.brand_id, p.admin_id, 
                    pi.image AS product_image  -- Get the image from the product_image table
                FROM product p
                LEFT JOIN product_image pi ON p.product_id = pi.product_id
                WHERE p.language = 'en'
            `;
            
            // Append conditions dynamically
            const queryParams = [];
            if (brand_id) {
                query += ` AND p.brand_id = ?`;
                queryParams.push(brand_id);
            }
            if (sub_category_id) {
                query += ` AND p.sub_category_id = ?`;
                queryParams.push(sub_category_id);
            }

            // Execute the query
            const [products] = await connection.query(query, queryParams);

            if (products.length === 0) {
                return res.status(200).json({ message: 'No products found for the given criteria', products: [] });
            }

            // Extract subcategory_ids and brand_ids from the products
            const subCategoryIds = products.map(product => product.sub_category_id);
            const brandIds = products.map(product => product.brand_id);

            // Fetch subcategory and brand details
            const [subCategories] = await connection.query(
                'SELECT sub_category_id, sub_category_name FROM sub_category WHERE sub_category_id IN (?)',
                [subCategoryIds]
            );
            const [brands] = await connection.query(
                'SELECT brand_id, brand_name FROM brand WHERE brand_id IN (?)',
                [brandIds]
            );

            // Create mappings for subcategory and brand
            const subCategoryMap = subCategories.reduce((map, subCategory) => {
                map[subCategory.sub_category_id] = subCategory.sub_category_name;
                return map;
            }, {});

            const brandMap = brands.reduce((map, brand) => {
                map[brand.brand_id] = brand.brand_name;
                return map;
            }, {});

            // Add subcategory_name, brand_name, and image URL to each product
            products.forEach(product => {
                product.sub_category_name = subCategoryMap[product.sub_category_id] || 'N/A';
                product.brand_name = brandMap[product.brand_id] || 'N/A';
                product.product_image = product.product_image ? `/uploads/products/${product.product_image}` : '/path/to/default-image.jpg';
            });

            res.status(200).json({
                message: 'English products retrieved successfully',
                products,
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getClientProductID = async (req, res) => {
    const product_id = req.params.id;

    if (!product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const connection = await db.getConnection();
        try {
            // Query product details with images
            const [product] = await connection.query(`
                SELECT 
                    p.product_id, 
                    p.product_name, 
                    p.product_description, 
                    p.product_sale, 
                    p.stock_quantity AS availability, 
                    p.sub_category_id, 
                    p.brand_id, 
                    pi.image_id, 
                    pi.image AS image_url
                FROM product p
                LEFT JOIN product_image pi 
                ON pi.product_id = p.product_id
                WHERE p.product_id = ?
            `, [product_id]);

            if (product.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Map images and provide a placeholder if no images exist
            const productImages = product
                .map(image => image.image_url ? `/uploads/products/${image.image_url}` : null) // Ensure the path includes uploads/products
                .filter(Boolean); // Remove null or undefined values

            if (productImages.length === 0) {
                // Add a placeholder image if no images exist
                productImages.push('/uploads/products/placeholder.png');
            }

            const productDetails = {
                product_id: product[0].product_id,
                product_name: product[0].product_name,
                product_description: product[0].product_description,
                product_ref: `REF-${product[0].product_id}`,
                availability: product[0].availability > 0,
                product_images: productImages,
            };

            res.status(200).json({
                message: 'Product retrieved successfully',
                product: productDetails
            });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const searchClientProductEn = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            const { search, brand_id, sub_category_id, category_id } = req.query;

            let query = `
                SELECT 
                    p.product_id, p.product_name, p.product_description, p.product_sale, p.stock_quantity, p.language,
                    p.sub_category_id, p.brand_id, p.admin_id,
                    pi.image AS product_image
                FROM product p
                LEFT JOIN product_image pi ON p.product_id = pi.product_id
                WHERE p.language = 'en'
            `;

            const queryParams = [];

            // Add search filter
            if (search) {
                query += ` AND (p.product_name LIKE ? OR p.product_description LIKE ?)`;
                queryParams.push(`%${search}%`, `%${search}%`);
            }

            // Add other filters
            if (brand_id) {
                query += ` AND p.brand_id = ?`;
                queryParams.push(brand_id);
            }

            if (sub_category_id) {
                query += ` AND p.sub_category_id = ?`;
                queryParams.push(sub_category_id);
            }

            if (category_id) {
                query += ` AND EXISTS (
                    SELECT 1 FROM sub_category sc WHERE sc.category_id = ? AND sc.sub_category_id = p.sub_category_id
                )`;
                queryParams.push(category_id);
            }

            const [products] = await connection.query(query, queryParams);

            if (products.length === 0) {
                return res.status(200).json({ message: 'No products found for the search criteria', products: [] });
            }

            const subCategoryIds = products.map(product => product.sub_category_id);
            const brandIds = products.map(product => product.brand_id);

            const [subCategories] = await connection.query(
                'SELECT sub_category_id, sub_category_name FROM sub_category WHERE sub_category_id IN (?)',
                [subCategoryIds]
            );

            const [brands] = await connection.query(
                'SELECT brand_id, brand_name FROM brand WHERE brand_id IN (?)',
                [brandIds]
            );

            const subCategoryMap = subCategories.reduce((map, subCategory) => {
                map[subCategory.sub_category_id] = subCategory.sub_category_name;
                return map;
            }, {});

            const brandMap = brands.reduce((map, brand) => {
                map[brand.brand_id] = brand.brand_name;
                return map;
            }, {});

            products.forEach(product => {
                product.sub_category_name = subCategoryMap[product.sub_category_id] || 'N/A';
                product.brand_name = brandMap[product.brand_id] || 'N/A';
                product.product_image = product.product_image ? `/uploads/products/${product.product_image}` : '/path/to/default-image.jpg';
            });

            res.status(200).json({
                message: 'Products retrieved successfully',
                products,
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};



const submitContactForm = async (req, res) => {
    const { message, name, email, phone, product_id } = req.body;

    // console.log("Request Body:", req.body); // Log the received data

    if (!message || !name || !email || !phone || !product_id) {
        console.error("Missing fields:", { message, name, email, phone, product_id });
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const connection = await db.getConnection();
        try {
            const [result] = await connection.query(
                `INSERT INTO contact (message, name, email, phone, product_id) VALUES (?, ?, ?, ?, ?)`,
                [message, name, email, phone, product_id]
            );
            res.status(201).json({ message: "Contact form submitted successfully.", contact_id: result.insertId });
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ message: "Failed to submit contact form." });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ message: "Server error." });
    }
};







module.exports = {
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
};