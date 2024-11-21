const db = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

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

const signInAdmin =  async (req, res) => {
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

            // Compare the provided password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, admin.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate the JWT token with admin_id and username
            const token = jwt.sign(
                { username: admin.username, admin_id: admin.admin_id }, // Include admin_id in token
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            

            // Remove the password from the admin object before sending it to the client
            delete admin.password;

            res.status(200).json({
                message: 'Login successful', 
                admin: admin, 
                token: token // Send the token in the response
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


//--------------------------------------------------------------------- Brand --------------------------------------------------------------------------------------------------

const createBrand = async (req, res) => {
    const { brand_name, brand_country } = req.body;
    const logoFile = req.file; // Get the uploaded file

    if (!brand_name || !brand_country || !logoFile) {
        return res.status(400).json({ message: 'Please provide all required fields: brand_name, brand_country, and brand_logo' });
    }

    // Generate the logo path (relative for serving as a static file)
    const brand_logo = `/uploads/brands/${logoFile.filename}`;

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Insert brand into the table
            const [insertResult] = await connection.query(
                'INSERT INTO brand (brand_name, brand_country, brand_logo) VALUES (?, ?, ?)',
                [brand_name, brand_country, brand_logo]
            );

            if (insertResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error inserting brand' });
            }

            // Retrieve the newly inserted brand
            const [newBrand] = await connection.query(
                'SELECT brand_id, brand_name, brand_country, brand_logo FROM brand WHERE brand_id = ?',
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

const updateBrand = async (req, res) => {
    const { brand_id, brand_name, brand_country } = req.body;
    const logoFile = req.file; // Get the uploaded file, if any

    if (!brand_id || (!brand_name && !brand_country && !logoFile)) {
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
                'SELECT brand_id, brand_name, brand_country, brand_logo FROM brand WHERE brand_id = ?',
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
    const { brand_id } = req.body;

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
    const { categoryName } = req.body;

    if(!categoryName){
        return res.status(401).json({ message: 'Category name is required!'});
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            
            const [categoryData] = await connection.query(
                'INSERT INTO category(category_name) VALUES(?)',
                [categoryName]
            );

            if (categoryData.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error creating category' });
            }

            const [newCategory] = await connection.query(
                'SELECT category_id, category_name FROM category WHERE category_id = ?',
                [categoryData.insertId]
            );

            await connection.commit();
            res.status(200).json({ message: 'Category created successfully', category: newCategory[0] });


        } catch (error) {
            await connection.rollback();
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }finally{
            connection.release();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCategory = async (req, res) => {
    const { category_id, category_name } = req.body;

    if (!category_id || !category_name) {
        return res.status(400).json({ message: 'Please provide category_id and category_name' });
    }

    try {
        const connection = await db.getConnection();
        try {
            // Check if the category exists
            const [existingCategory] = await connection.query(
                'SELECT category_id FROM category WHERE category_id = ?',
                [category_id]
            );

            if (existingCategory.length === 0) {
                return res.status(404).json({ message: 'Category not found' });
            }

            // Update the category
            const updateQuery = `UPDATE category SET category_name = ? WHERE category_id = ?`;
            const [updateResult] = await connection.query(updateQuery, [category_name, category_id]);

            if (updateResult.affectedRows === 0) {
                return res.status(500).json({ message: 'Error updating category' });
            }

            // Retrieve the updated category
            const [updatedCategory] = await connection.query(
                'SELECT category_id, category_name FROM category WHERE category_id = ?',
                [category_id]
            );

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
    const { sub_category_name, category_id} = req.body;
    
    if(!sub_category_name || !category_id){
        res.status(401).json({ message: 'All fields are reqired!'});
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            
            const [subCategoryData] = await connection.query(
                'INSERT INTO sub_category (sub_category_name, category_id) VALUES(?, ?)',
                [sub_category_name, category_id]
            );

            if(subCategoryData.affectedRows === 0){
                await connection.rollback();
                return res.status(500).json({ message: 'Error creating sub category' });   
            }

            const [newSubCategory] = await connection.query(
                'SELECT sub_category_id, sub_category_name, category_id FROM sub_category WHERE sub_category_id = ?',
                [subCategoryData.insertId]
            );

            await connection.commit();
            res.status(200).json({ message: 'Sub category created successfully', SubCategory: newSubCategory[0] });


        } catch (error) {
            await connection.rollback();
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }finally{
            connection.release();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateSubCategory = async (req, res) => {
    const { sub_category_id, sub_category_name, category_id } = req.body;

    if (!sub_category_id || (!sub_category_name && !category_id)) {
        return res.status(400).json({ message: 'Please provide sub category id and at least one field to update' });
    }

    try {
        const connection = await db.getConnection();
        try {
            // Start a transaction
            await connection.beginTransaction();

            let updateFields = [];
            let updateParams = [];

            if (sub_category_name) {
                updateFields.push('sub_category_name = ?');
                updateParams.push(sub_category_name);
            }

            if (category_id) {
                updateFields.push('category_id = ?');
                updateParams.push(category_id);
            }

            updateParams.push(sub_category_id);

            const updateQuery = `UPDATE sub_category 
                                 SET ${updateFields.join(',')} WHERE sub_category_id = ?`;

            // Execute the update query
            const [updateResult] = await connection.query(updateQuery, updateParams);

            if (updateResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(404).json({ message: 'Sub-category not found or no fields were updated' });
            }

            // Retrieve the updated sub-category
            const [updatedSubCategory] = await connection.query(
                'SELECT sub_category_id, sub_category_name, category_id FROM sub_category WHERE sub_category_id = ?',
                [sub_category_id]
            );

            // Commit the transaction
            await connection.commit();

            res.status(200).json({ message: 'Sub-category updated successfully', sub_category: updatedSubCategory[0] });

        } catch (error) {
            // Rollback the transaction in case of error
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

const deleteSubCategory = async (req, res) => {
    const { sub_category_id } = req.body;

    if (!sub_category_id) {
        return res.status(400).json({ message: 'Please provide a valid sub_category_id' });
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Check if the sub-category exists
            const [existingSubCategory] = await connection.query(
                'SELECT sub_category_name FROM sub_category WHERE sub_category_id = ?',
                [sub_category_id]
            );

            if (existingSubCategory.length === 0) {
                await connection.rollback();
                return res.status(404).json({ message: 'Sub-category not found' });
            }

            // Delete the sub-category record
            const [deleteResult] = await connection.query(
                'DELETE FROM sub_category WHERE sub_category_id = ?',
                [sub_category_id]
            );

            if (deleteResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error deleting sub-category' });
            }

            await connection.commit();
            res.status(200).json({ message: 'Sub-category deleted successfully' });

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
    const { product_name, product_description, product_sale, stock_quantity, sub_category_id, brand_id } = req.body;
    const productImage = req.file; // The uploaded file (assuming multer saved it in req.file)
    const admin_id = req.user?.admin_id; // Admin ID comes from the token

    // Log to debug the issue
    // console.log('admin_id from token:', admin_id);

    if (!product_name || !product_description || !product_sale || !stock_quantity || !sub_category_id || !brand_id || !productImage || !admin_id) {
        return res.status(400).json({ message: 'Please provide all required fields: product_name, product_description, product_sale, stock_quantity, sub_category_id, brand_id, product_image, and admin_id' });
    }

    // Generate the product image path (relative for serving as a static file)
    const product_image_path = `/uploads/products/${productImage.filename}`;

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Insert product into the product table
            const [insertProductResult] = await connection.query(
                'INSERT INTO product (product_name, product_description, product_sale, stock_quantity, sub_category_id, brand_id, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [product_name, product_description, product_sale, stock_quantity, sub_category_id, brand_id, admin_id]
            );

            if (insertProductResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error inserting product' });
            }

            const newProductId = insertProductResult.insertId;

            // Insert product image into the product_image table
            const [insertImageResult] = await connection.query(
                'INSERT INTO product_image (image, product_id) VALUES (?, ?)',
                [product_image_path, newProductId]
            );

            if (insertImageResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error inserting product image' });
            }

            // Retrieve the newly inserted product along with the image
            const [newProduct] = await connection.query(
                `SELECT 
                    p.product_id, p.product_name, p.product_description, p.product_sale, p.stock_quantity, 
                    p.sub_category_id, p.brand_id, p.admin_id, pi.image_id, pi.image AS product_image 
                 FROM product p 
                 LEFT JOIN product_image pi ON p.product_id = pi.product_id 
                 WHERE p.product_id = ?`,
                [newProductId]
            );

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

const updateProduct = async (req, res) => {
    const { product_id, product_name, product_description, product_sale, stock_quantity, sub_category_id, brand_id } = req.body;
    const productImage = req.file; // Get the uploaded file, if any

    // Ensure product_id is provided and at least one field is set to update
    if (!product_id || (!product_name && !product_description && !product_sale && !stock_quantity && !sub_category_id && !brand_id && !productImage)) {
        return res.status(400).json({ message: 'Please provide product id and at least one field to update' });
    }

    // Generate the image path (only if a new file is uploaded)
    const product_image_path = productImage ? `/uploads/products/${productImage.filename}` : null;

    try {
        const connection = await db.getConnection();
        try {
            let updateFields = [];
            let updateParams = [];

            // Prepare fields for update
            if (product_name) {
                updateFields.push('product_name = ?');
                updateParams.push(product_name);
            }

            if (product_description) {
                updateFields.push('product_description = ?');
                updateParams.push(product_description);
            }

            if (product_sale) {
                updateFields.push('product_sale = ?');
                updateParams.push(product_sale);
            }

            if (stock_quantity) {
                updateFields.push('stock_quantity = ?');
                updateParams.push(stock_quantity);
            }

            if (sub_category_id) {
                updateFields.push('sub_category_id = ?');
                updateParams.push(sub_category_id);
            }

            if (brand_id) {
                updateFields.push('brand_id = ?');
                updateParams.push(brand_id);
            }

            if (product_image_path) {
                updateFields.push('product_image = ?');
                updateParams.push(product_image_path);
            }

            // Add the product_id at the end of the updateParams array
            updateParams.push(product_id);

            const updateQuery = `UPDATE product 
                                 SET ${updateFields.join(',')} WHERE product_id = ?`;

            // Execute the update query
            const [updateResult] = await connection.query(updateQuery, updateParams);

            // Check if the product was updated
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Product not found or no fields were updated' });
            }

            // Retrieve the updated product along with the image
            const [updatedProduct] = await connection.query(
                `SELECT 
                    p.product_id, p.product_name, p.product_description, p.product_sale, p.stock_quantity, 
                    p.sub_category_id, p.brand_id, pi.image AS product_image 
                    FROM product p
                    LEFT JOIN product_image pi ON p.product_id = pi.product_id 
                    WHERE p.product_id = ?`,
                [product_id]
            );

            res.status(200).json({ message: 'Product updated successfully', product: updatedProduct[0] });

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

const deleteProduct = async (req, res) => {
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ message: 'Please provide a valid product_id' });
    }

    try {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Check if the product exists
            const [existingProduct] = await connection.query(
                'SELECT * FROM product WHERE product_id = ?',
                [product_id]
            );

            if (existingProduct.length === 0) {
                await connection.rollback();
                return res.status(404).json({ message: 'Product not found' });
            }

            // Delete associated product images
            const [deleteImagesResult] = await connection.query(
                'DELETE FROM product_image WHERE product_id = ?',
                [product_id]
            );

            if (deleteImagesResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error deleting product images' });
            }

            // Delete the product record
            const [deleteProductResult] = await connection.query(
                'DELETE FROM product WHERE product_id = ?',
                [product_id]
            );

            if (deleteProductResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error deleting product' });
            }

            // Optionally, delete the product image files from the server
            // You can implement this logic if needed, similar to the logic for deleting the brand logo

            await connection.commit();

            res.status(200).json({ message: 'Product and associated images deleted successfully' });

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



module.exports = {
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
};