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





module.exports = {
    getClientBrand,
    getClientBrandID,
    getClientEnglishCategories,
    getClientArabicCategories,
    getClientEnglishCategoriesWithSubCategories,
    getClientEnglishSubCategories,
    getClientArabicSubCategories 
};