const db = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { activeTokens } = require('../middleware/authMiddleware');

//--------------------------------------------------------------------- Admin --------------------------------------------------------------------------------------------------

const getAdmin = async (req, res) => {
    const username = req.params.username || req.query.username || req.body.username;
    
    try {
        const connection = await db.getConnection();
        try {
            if (username && username !== '%') {
                // Retrieve a specific admin account by username
                const [adminData] = await connection.query(
                    'SELECT username FROM admin WHERE username = ?', 
                    [username]
                );

                if (adminData.length === 0) {
                    res.status(404).json({ message: 'admin account not found' });
                    return;
                }
                
                res.status(200).json({ message: 'admin account retrieved successfully', admin: adminData[0] });
            } else {
                // Retrieve all admin accounts
                const [adminData] = await connection.query(
                    'SELECT username FROM admin'
                );

                if (adminData.length === 0) {
                    res.status(404).json({ message: 'No admin accounts found' });
                    return;
                }

                res.status(200).json({ message: 'admin accounts retrieved successfully', admin: adminData });
            }
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

const createAdmin =  async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password ) {
        return res.status(400).json({ message: 'Please fulfill all fields' });
    }

    try {
        
        
        const hashedPassword = await bcrypt.hash(password, 10);



        const connection = await db.getConnection();
        
        try {
            await connection.beginTransaction();

           
            const [adminData] = await connection.query(
                'INSERT INTO admin (username, password) VALUES (?, ?)',
                [username, hashedPassword]
            );

            if (adminData.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error creating Admin' });
            }

            const [newAdmin] = await connection.query(
                'SELECT admin_id, username FROM admin WHERE username = ?',
                [username]
            );

            await connection.commit();
            res.status(200).json({ message: 'User created successfully', admin: newAdmin[0] });

        } catch (error) {
            await connection.rollback();
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const signInAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please fulfill all fields' });
    }

    try {
        const connection = await db.getConnection();
        try {
            const [adminData] = await connection.query(
                'SELECT * FROM admin WHERE username = ?',
                [username]
            );

            if (adminData.length === 0) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            const admin = adminData[0];

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Invalidate previous token if it exists
            if (activeTokens.has(admin.admin_id)) {
                const oldToken = activeTokens.get(admin.admin_id);
                activeTokens.delete(admin.admin_id); // Remove old token
                // console.log(`Invalidated previous token for admin_id: ${admin.admin_id}`);
            }

            // Generate a new token
            const token = jwt.sign(
                { username: admin.username, admin_id: admin.admin_id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Store the new token in the activeTokens Map
            activeTokens.set(admin.admin_id, token);

            const { password: _, ...adminWithoutPassword } = admin;

            res.status(200).json({
                message: 'Login successful',
                admin: adminWithoutPassword,
                token: token,
            });

        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ message: 'Server error during authentication' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Server error connecting to the database' });
    }
};

//--------------------------------------------------------------------- Brand --------------------------------------------------------------------------------------------------

const createBrand = async (req, res) => {
    const { brand_name, brand_country, language } = req.body;
    const logoFile = req.file; // Get the uploaded file

    if (!brand_name || !brand_country || !logoFile || !language) {
        return res.status(400).json({ message: 'Please provide all required fields: Brand name, Brand country, Brand logo, and language' });
    }

    // Generate the logo path (relative for serving as a static file)
    const brand_logo = `/uploads/brands/${logoFile.filename}`;

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Insert brand into the table
            const [insertResult] = await connection.query(
                'INSERT INTO brand (brand_name, brand_country, brand_logo, language) VALUES (?, ?, ?, ?)',
                [brand_name, brand_country, brand_logo, language]
            );

            if (insertResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error inserting brand' });
            }

            // Retrieve the newly inserted brand
            const [newBrand] = await connection.query(
                'SELECT brand_id, brand_name, brand_country, brand_logo, language FROM brand WHERE brand_id = ?',
                [insertResult.insertId]
            );

            await connection.commit();
            res.status(201).json({ message: 'Brand created successfully', brand: newBrand[0] });

        } catch (error) {
            await connection.rollback();
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

const getBrand = async (req, res) => {
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

const getBrandID = async (req, res) => {
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

const updateBrand = async (req, res) => {
    const { brand_name, brand_country, language } = req.body;
    const brand_id = req.params.id;
    const logoFile = req.file; // Get the uploaded file, if any

    if (!brand_id || (!brand_name && !brand_country && !logoFile && !language)) {
        return res.status(400).json({ message: 'Please provide brand id and at least one field to update' });
    }

    // Generate the logo path (only if a new file is uploaded)
    const brand_logo = logoFile ? `/uploads/brands/${logoFile.filename}` : null;

    try {
        const connection = await db.getConnection();
        try {
            let updateFields = [];
            let updateParams = [];

            if (brand_name) {
                updateFields.push('brand_name = ?');
                updateParams.push(brand_name);
            }

            if (brand_country) {
                updateFields.push('brand_country = ?');
                updateParams.push(brand_country);
            }

            if (brand_logo) {
                updateFields.push('brand_logo = ?');
                updateParams.push(brand_logo);
            }

            if (language) {
                updateFields.push('language = ?');
                updateParams.push(language);
            }

            updateParams.push(brand_id);

            const updateQuery = `UPDATE brand 
                                 SET ${updateFields.join(',')} WHERE brand_id = ?`;

            // Execute the update query
            const [updateResult] = await connection.query(updateQuery, updateParams);

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Brand not found or no fields were updated' });
            }

            // Retrieve the updated brand
            const [updatedBrand] = await connection.query(
                'SELECT brand_id, brand_name, brand_country, brand_logo, language FROM brand WHERE brand_id = ?',
                [brand_id]
            );

            res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand[0] });

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

const deleteBrand = async (req, res) => {
    const  brand_id  = req.params.id;

    if (!brand_id) {
        return res.status(400).json({ message: 'Please provide a valid brand_id' });
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Check if the brand exists
            const [existingBrand] = await connection.query(
                'SELECT brand_logo FROM brand WHERE brand_id = ?',
                [brand_id]
            );

            if (existingBrand.length === 0) {
                await connection.rollback();
                return res.status(404).json({ message: 'Brand not found' });
            }

            // Delete the brand record
            const [deleteResult] = await connection.query(
                'DELETE FROM brand WHERE brand_id = ?',
                [brand_id]
            );

            if (deleteResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error deleting brand' });
            }

            // Optionally, delete the logo file from the server
            const logoPath = `./public${existingBrand[0].brand_logo}`;
            const fs = require('fs');
            if (fs.existsSync(logoPath)) {
                fs.unlinkSync(logoPath); // Remove the file
            }

            await connection.commit();
            res.status(200).json({ message: 'Brand deleted successfully' });

        } catch (error) {
            await connection.rollback();
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

//--------------------------------------------------------------------- Category --------------------------------------------------------------------------------------------------

const createCategory = async (req, res) => {
    const { category_name, language } = req.body; // Use category_name as sent from the frontend

    if (!category_name || !language) {
        return res.status(400).json({ message: 'Please provide both category name and language' });
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Insert category into the table
            const [insertResult] = await connection.query(
                'INSERT INTO category (category_name, language) VALUES (?, ?)',
                [category_name, language] // Use category_name here
            );

            if (insertResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error inserting category' });
            }

            // Retrieve the newly inserted category
            const [newCategory] = await connection.query(
                'SELECT category_id, category_name, language FROM category WHERE category_id = ?',
                [insertResult.insertId]
            );

            await connection.commit();
            res.status(201).json({ message: 'Category created successfully', category: newCategory[0] });

        } catch (error) {
            await connection.rollback();
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

const getCategory = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve all categories from the database
            const [categories] = await connection.query(
                'SELECT category_id, category_name, language FROM category'
            );

            if (categories.length === 0) {
                return res.status(404).json({ message: 'No categories found' });
            }

            res.status(200).json({ message: 'Categories retrieved successfully', categories });

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

const getCategoryID = async (req, res) => {
    const category_id = req.params.id;  // Extract the category ID from the request parameters

    if (!category_id) {
        return res.status(400).json({ message: 'Category ID is required' });
    }

    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve a single category based on the provided category_id
            const [category] = await connection.query(
                'SELECT category_id, category_name, language FROM category WHERE category_id = ?',
                [category_id]
            );

            if (category.length === 0) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({ message: 'Category retrieved successfully', category: category[0] });

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

const updateCategory = async (req, res) => {
    const { category_name, language } = req.body;
    const category_id = req.params.id;

    // Log request body for debugging
    // console.log('Received body for update:', req.body);
    // console.log('Category ID:', category_id);

    // Ensure category_id is present, and at least one field is provided to update
    if (!category_id || (!category_name && !language)) {
        return res.status(400).json({ message: 'Please provide category id and at least one field to update' });
    }

    try {
        const connection = await db.getConnection();
        try {
            let updateFields = [];
            let updateParams = [];

            // Add update fields dynamically based on what is provided
            if (category_name) {
                updateFields.push('category_name = ?');
                updateParams.push(category_name);
            }

            if (language) {
                updateFields.push('language = ?');
                updateParams.push(language);
            }

            // Append category_id to the end for the WHERE clause
            updateParams.push(category_id);

            const updateQuery = `UPDATE category 
                                 SET ${updateFields.join(',')} WHERE category_id = ?`;

            // Execute the update query
            const [updateResult] = await connection.query(updateQuery, updateParams);

            // If no rows were affected, the category was not found or no updates were made
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Category not found or no fields were updated' });
            }

            // Retrieve the updated category
            const [updatedCategory] = await connection.query(
                'SELECT category_id, category_name, language FROM category WHERE category_id = ?',
                [category_id]
            );

            // Return the updated category
            res.status(200).json({ message: 'Category updated successfully', category: updatedCategory[0] });

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

const deleteCategory = async (req, res) => {
    const { category_id } = req.body;

    // Log the received body for debugging
    // console.log('Received body for deletion:', req.body);

    // Ensure category_id is provided
    if (!category_id) {
        return res.status(400).json({ message: 'Please provide a valid category_id' });
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Check if the category exists
            const [existingCategory] = await connection.query(
                'SELECT category_name FROM category WHERE category_id = ?',
                [category_id]
            );

            if (existingCategory.length === 0) {
                await connection.rollback();
                return res.status(404).json({ message: 'Category not found' });
            }

            // Delete the category record
            const [deleteResult] = await connection.query(
                'DELETE FROM category WHERE category_id = ?',
                [category_id]
            );

            // If no rows were affected, the deletion failed
            if (deleteResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error deleting category' });
            }

            await connection.commit();
            res.status(200).json({ message: 'Category deleted successfully' });

        } catch (error) {
            await connection.rollback();
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

//--------------------------------------------------------------------- Sub-Category -----------------------------------------------------------------------------------------------

const createSubCategory = async (req, res) => {
    const { sub_category_name, category_id, language } = req.body; // Include language

    // Validate if both sub_category_name, category_id, and language are provided
    if (!sub_category_name || !category_id || !language) {
        return res.status(400).json({ message: 'All fields (sub_category_name, category_id, language) are required!' });
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Insert subcategory into the sub_category table with category_id and language
            const [subCategoryData] = await connection.query(
                'INSERT INTO sub_category (sub_category_name, category_id, language) VALUES(?, ?, ?)',
                [sub_category_name, category_id, language] // Use sub_category_name, category_id, and language
            );

            if (subCategoryData.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error creating sub category' });
            }

            // Retrieve the newly inserted subcategory, including the language field
            const [newSubCategory] = await connection.query(
                'SELECT sub_category_id, sub_category_name, category_id, language FROM sub_category WHERE sub_category_id = ?',
                [subCategoryData.insertId]
            );

            await connection.commit();
            res.status(201).json({ message: 'Sub category created successfully', subCategory: newSubCategory[0] });

        } catch (error) {
            await connection.rollback();
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

const getSubCategory = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve all subcategories from the database
            const [subCategories] = await connection.query(
                'SELECT sub_category_id, sub_category_name, category_id, language FROM sub_category'
            );

            if (subCategories.length === 0) {
                return res.status(404).json({ message: 'No subcategories found' });
            }

            // Query to retrieve category names for all category_ids
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
                message: 'Subcategories retrieved successfully',
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

const getSubCategoryID = async (req, res) => {
    const sub_category_id = req.params.id;  // Extract the subcategory ID from the request parameters

    if (!sub_category_id) {
        return res.status(400).json({ message: 'Subcategory ID is required' });
    }

    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve the subcategory based on the provided sub_category_id
            const [subCategory] = await connection.query(
                'SELECT sub_category_id, sub_category_name, category_id, language FROM sub_category WHERE sub_category_id = ?',
                [sub_category_id]
            );

            if (subCategory.length === 0) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }

            const category_id = subCategory[0].category_id; // Extract category_id from subcategory

            // Now, use the category_id to fetch the associated category name
            const [category] = await connection.query(
                'SELECT category_name FROM category WHERE category_id = ?',
                [category_id]
            );

            if (category.length === 0) {
                return res.status(404).json({ message: 'Associated category not found' });
            }

            // Combine subcategory and category information
            const responseData = {
                sub_category_id: subCategory[0].sub_category_id,
                sub_category_name: subCategory[0].sub_category_name,
                category_id: subCategory[0].category_id,
                category_name: category[0].category_name, // Add the category name
                language: subCategory[0].language,
            };

            res.status(200).json({ message: 'Subcategory retrieved successfully', data: responseData });

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

const updateSubCategory = async (req, res) => {
    const { sub_category_name, category_id, language } = req.body;
    const sub_category_id = req.params.id; // Subcategory ID from the URL

    // Log request body and ID for debugging
    // console.log('Received body for update:', req.body);
    // console.log('Subcategory ID:', sub_category_id);

    // Ensure sub_category_id is present and at least one field is provided to update
    if (!sub_category_id || (!sub_category_name && !category_id && !language)) {
        return res.status(400).json({ 
            message: 'Please provide subcategory ID and at least one field to update' 
        });
    }

    try {
        const connection = await db.getConnection();
        try {
            let updateFields = [];
            let updateParams = [];

            // If category_id is provided, validate its existence
            if (category_id) {
                const [category] = await connection.query(
                    'SELECT category_id FROM category WHERE category_id = ?',
                    [category_id]
                );

                if (category.length === 0) {
                    return res.status(404).json({ message: 'Category ID not found' });
                }

                // Add category_id to the update fields
                updateFields.push('category_id = ?');
                updateParams.push(category_id);
            }

            // If sub_category_name is provided, update it
            if (sub_category_name) {
                updateFields.push('sub_category_name = ?');
                updateParams.push(sub_category_name);
            }

            // If language is provided, update it
            if (language) {
                updateFields.push('language = ?');
                updateParams.push(language);
            }

            // Append sub_category_id to the end for the WHERE clause
            updateParams.push(sub_category_id);

            // Construct the update query dynamically
            const updateQuery = `UPDATE sub_category 
                                 SET ${updateFields.join(', ')} 
                                 WHERE sub_category_id = ?`;

            // Execute the update query
            const [updateResult] = await connection.query(updateQuery, updateParams);

            // If no rows were affected, the subcategory was not found or no updates were made
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Subcategory not found or no fields were updated' });
            }

            // Retrieve the updated subcategory
            const [updatedSubCategory] = await connection.query(
                'SELECT sub_category_id, sub_category_name, category_id, language FROM sub_category WHERE sub_category_id = ?',
                [sub_category_id]
            );

            // Return the updated subcategory
            res.status(200).json({ 
                message: 'Subcategory updated successfully', 
                subCategory: updatedSubCategory[0] 
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

const deleteSubCategory = async (req, res) => {
    const { sub_category_id } = req.body; // Subcategory ID from the request body

    // Log the received body for debugging
    // console.log('Received body for deletion:', req.body);

    // Ensure sub_category_id is provided
    if (!sub_category_id) {
        return res.status(400).json({ message: 'Please provide a valid sub_category_id' });
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Check if the subcategory exists
            const [existingSubCategory] = await connection.query(
                'SELECT sub_category_name FROM sub_category WHERE sub_category_id = ?',
                [sub_category_id]
            );

            if (existingSubCategory.length === 0) {
                await connection.rollback();
                return res.status(404).json({ message: 'Subcategory not found' });
            }

            // Delete the subcategory record
            const [deleteResult] = await connection.query(
                'DELETE FROM sub_category WHERE sub_category_id = ?',
                [sub_category_id]
            );

            // If no rows were affected, the deletion failed
            if (deleteResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error deleting subcategory' });
            }

            await connection.commit();
            res.status(200).json({ message: 'Subcategory deleted successfully' });

        } catch (error) {
            await connection.rollback();
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

//--------------------------------------------------------------------- Product -----------------------------------------------------------------------------------------------

const createProduct = async (req, res) => {
    const { product_name, product_description, product_sale, stock_quantity, language, sub_category_id, brand_id } = req.body;
    const productImages = req.files || [];
    const admin_id = req.user?.admin_id;

    console.log(productImages);

    if (!product_name || !product_description || !product_sale || !stock_quantity || !sub_category_id || !brand_id || !productImages || !admin_id || !language) {
        return res.status(400).json({ message: 'Please provide all required fields: product_name, product_description, product_sale, stock_quantity, language, sub_category_id, brand_id, product_images, and admin_id' });
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            const [insertProductResult] = await connection.query(
                'INSERT INTO product (product_name, product_description, product_sale, stock_quantity, language, sub_category_id, brand_id, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [product_name, product_description, product_sale, stock_quantity, language, sub_category_id, brand_id, admin_id]
            );

            if (insertProductResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error inserting product' });
            }

            const newProductId = insertProductResult.insertId;

            for (const file of productImages) {
                const product_image_path = file.filename;

                const [insertImageResult] = await connection.query(
                    'INSERT INTO product_image (image, product_id) VALUES (?, ?)',
                    [product_image_path, newProductId]
                );

                if (insertImageResult.affectedRows === 0) {
                    await connection.rollback();
                    return res.status(500).json({ message: 'Error inserting product image' });
                }
            }

            const [newProduct] = await connection.query(
                `SELECT 
                    p.product_id, 
                    p.product_name, 
                    p.product_description, 
                    p.product_sale, 
                    p.stock_quantity, 
                    p.language, 
                    p.sub_category_id, 
                    p.brand_id, 
                    p.admin_id, 
                    GROUP_CONCAT(pi.image) AS product_images
                 FROM product p 
                 LEFT JOIN product_image pi ON p.product_id = pi.product_id 
                 WHERE p.product_id = ? 
                 GROUP BY p.product_id`,
                [newProductId]
            );

            // Process the product_images into an array
            if (newProduct[0].product_images) {
                newProduct[0].product_images = newProduct[0].product_images.split(',');
            } else {
                newProduct[0].product_images = [];
            }

            await connection.commit();

            res.status(201).json({ message: 'Product created successfully', product: newProduct[0] });

        } catch (error) {
            await connection.rollback();
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

const getProduct = async (req, res) => {
    try {
        const connection = await db.getConnection();
        try {
            // Query to retrieve all products along with their image IDs and URLs
            const [products] = await connection.query(`
                SELECT 
                    p.product_id, p.product_name, p.product_description, p.product_sale, p.stock_quantity, p.language, 
                    p.sub_category_id, p.brand_id, p.admin_id, 
                    pi.image_id, pi.image -- Fetch image ID and image URL
                FROM product p
                LEFT JOIN product_image pi ON p.product_id = pi.product_id -- Join to get the image details
            `);

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
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

            // Process each product and include image information
            const formattedProducts = products.reduce((acc, product) => {
                // Group images by product_id to form an array of image objects (with ID and URL)
                const existingProduct = acc.find(p => p.product_id === product.product_id);

                if (!existingProduct) {
                    acc.push({
                        product_id: product.product_id,
                        product_name: product.product_name,
                        product_description: product.product_description,
                        product_sale: product.product_sale,
                        stock_quantity: product.stock_quantity,
                        language: product.language,
                        sub_category_name: subCategoryMap[product.sub_category_id] || 'N/A',
                        brand_name: brandMap[product.brand_id] || 'N/A',
                        product_images: [{
                            image_id: product.image_id,
                            image_url: `/uploads/products/${product.image}`
                        }],
                    });
                } else {
                    // Add the image to the existing product if multiple images exist
                    existingProduct.product_images.push({
                        image_id: product.image_id,
                        image_url: `/uploads/products/${product.image}`
                    });
                }
                return acc;
            }, []);

            res.status(200).json({
                message: 'Products retrieved successfully',
                products: formattedProducts,
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getProductID = async (req, res) => {
    const product_id = req.params.id;

    if (!product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const connection = await db.getConnection();
        try {
            const [product] = await connection.query(`
                SELECT 
                    p.product_id, p.product_name, p.product_description, p.product_sale, 
                    p.stock_quantity, p.language, p.sub_category_id, p.brand_id, 
                    pi.image_id, pi.image
                FROM product p
                LEFT JOIN product_image pi ON pi.product_id = p.product_id
                WHERE p.product_id = ?
            `, [product_id]);

            if (product.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Process the images into an array, including image_id
            const productData = product[0];
            const productImages = product.map(image => ({
                image_id: image.image_id,
                image_url: `${image.image}`,
            }));

            // Attach the image data to the productData object
            productData.product_images = productImages;

            res.status(200).json({
                message: 'Product retrieved successfully',
                product: productData
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

const updateProduct = async (req, res) => {
    const { product_name, product_description, product_sale, stock_quantity, language, sub_category_id, brand_id, image_ids } = req.body;
    const product_id = req.params.id;

    // Trim and validate the language field
    const sanitizedLanguage = language?.trim();
    if (!['en', 'ar'].includes(sanitizedLanguage)) {
        console.log('Invalid language value:', sanitizedLanguage);
        return res.status(400).json({ message: 'Invalid language value. Accepted values are "en" or "ar".' });
    }

    const productImages = req.files || [];
    const imageIdsArray = Array.isArray(image_ids) ? image_ids : image_ids ? [image_ids] : [];

    if (!product_id || 
        (!product_name && !product_description && !product_sale && !stock_quantity && !sub_category_id && !brand_id && productImages.length === 0 && imageIdsArray.length === 0)) {
        return res.status(400).json({ message: 'Please provide valid fields to update.' });
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            const productUpdateFields = [];
            const productUpdateParams = [];

            if (product_name && product_name.trim() !== '') {
                productUpdateFields.push('product_name = ?');
                productUpdateParams.push(product_name);
            }
            if (product_description && product_description.trim() !== '') {
                productUpdateFields.push('product_description = ?');
                productUpdateParams.push(product_description);
            }
            if (product_sale && !isNaN(product_sale)) {
                productUpdateFields.push('product_sale = ?');
                productUpdateParams.push(product_sale);
            }
            if (stock_quantity && !isNaN(stock_quantity)) {
                productUpdateFields.push('stock_quantity = ?');
                productUpdateParams.push(stock_quantity);
            }
            if (sanitizedLanguage) {
                productUpdateFields.push('language = ?');
                productUpdateParams.push(sanitizedLanguage);
            }
            if (sub_category_id && !isNaN(sub_category_id)) {
                productUpdateFields.push('sub_category_id = ?');
                productUpdateParams.push(sub_category_id);
            }
            if (brand_id && !isNaN(brand_id)) {
                productUpdateFields.push('brand_id = ?');
                productUpdateParams.push(brand_id);
            }

            if (productUpdateFields.length > 0) {
                productUpdateParams.push(product_id);
                const productUpdateQuery = `UPDATE product 
                                            SET ${productUpdateFields.join(', ')} 
                                            WHERE product_id = ?`;
                await connection.query(productUpdateQuery, productUpdateParams);
            }

            const [existingImages] = await connection.query(
                'SELECT image_id, image FROM product_image WHERE product_id = ?',
                [product_id]
            );

            const existingImageIds = existingImages.map(img => String(img.image_id));
            const imagesToDelete = existingImages
                .filter(img => !imageIdsArray.includes(String(img.image_id)))
                .map(img => img.image_id);

            if (imagesToDelete.length > 0) {
                await connection.query(
                    'DELETE FROM product_image WHERE image_id IN (?) AND product_id = ?',
                    [imagesToDelete, product_id]
                );
            }

            for (let i = 0; i < productImages.length; i++) {
                const newImage = productImages[i] ? productImages[i].filename : null;
                if (newImage) {
                    await connection.query(
                        'INSERT INTO product_image (image, product_id) VALUES (?, ?)',
                        [newImage, product_id]
                    );
                }
            }

            await connection.commit();

            const [updatedProduct] = await connection.query(
                `SELECT 
                    p.product_id, p.product_name, p.product_description, p.product_sale, p.stock_quantity, p.language,
                    p.sub_category_id, p.brand_id, pi.image AS product_image 
                 FROM product p
                 LEFT JOIN product_image pi ON p.product_id = pi.product_id 
                 WHERE p.product_id = ?`,
                [product_id]
            );

            res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
        } catch (error) {
            await connection.rollback();
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


const deleteProduct = async (req, res) => {
    const { id } = req.params; // product_id from the URL
    const admin_id = req.user?.admin_id; // Admin ID from the token (or session)

    try {
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction(); // Start the transaction

            // Delete product from product_image table
            const [deleteImageResult] = await connection.query(
                'DELETE FROM product_image WHERE product_id = ?',
                [id]
            );

            // Check if image deletion was successful
            if (deleteImageResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error deleting product image' });
            }

            // Delete product from product table
            const [deleteProductResult] = await connection.query(
                'DELETE FROM product WHERE product_id = ? AND admin_id = ?',
                [id, admin_id]
            );

            // Check if the product deletion was successful
            if (deleteProductResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error deleting product' });
            }

            // Commit the transaction after successful deletion
            await connection.commit();

            res.status(200).json({ message: 'Product deleted successfully' });

        } catch (error) {
            await connection.rollback(); // Rollback in case of error
            console.error('Database query error: ', error);
            res.status(500).json({ message: 'Server error' });
        } finally {
            connection.release(); // Always release the connection back to the pool
        }

    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
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
    getSubCategory,
    getCategoryID,
    updateCategory,
    deleteCategory,
    createSubCategory,
    getSubCategoryID,
    updateSubCategory,
    deleteSubCategory,
    createProduct,
    getProduct,
    getProductID,
    updateProduct,
    deleteProduct,
};