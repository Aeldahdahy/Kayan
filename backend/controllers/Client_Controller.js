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



module.exports = {
    getClientBrand,
    getClientBrandID,
    getClientEnglishCategories,
    getClientArabicCategories,
    getClientEnglishCategoriesWithSubCategories,
    getClientEnglishSubCategories,
    getClientArabicSubCategories,
    getClientProductEn 
};