const db = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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
    // verifyToken();

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
                return res.status(500).json({ message: 'Error creating user' });
            }

            const [newAdmin] = await connection.query(
                'SELECT admin_id, username FROM admin WHERE username = ?',
                [username]
            );

            await connection.commit();
            res.status(200).json({ message: 'User created successfully', user: newAdmin[0] });

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
                return res.status(404).json({ message: 'admin not found' });
            }

            const admin = adminData[0];

            const isPasswordValid = await bcrypt.compare(password, admin.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            delete admin.password;

            res.status(200).json({ message: 'Login successful', admin: admin, token: token });

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

    if (!brand_id || !brand_name || !brand_country) {
        return res.status(400).json({ message: 'Please provide all required fields: brand_id, brand_name, and brand_country' });
    }

    // Generate the logo path (only if a new file is uploaded)
    const brand_logo = logoFile ? `/uploads/brands/${logoFile.filename}` : null;

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

            // Prepare update query and parameters
            let updateQuery = 'UPDATE brand SET brand_name = ?, brand_country = ?';
            const queryParams = [brand_name, brand_country];

            if (brand_logo) {
                updateQuery += ', brand_logo = ?';
                queryParams.push(brand_logo);
            }

            updateQuery += ' WHERE brand_id = ?';
            queryParams.push(brand_id);

            // Execute update query
            const [updateResult] = await connection.query(updateQuery, queryParams);

            if (updateResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(500).json({ message: 'Error updating brand' });
            }

            // Retrieve the updated brand
            const [updatedBrand] = await connection.query(
                'SELECT brand_id, brand_name, brand_country, brand_logo FROM brand WHERE brand_id = ?',
                [brand_id]
            );

            await connection.commit();
            res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand[0] });

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
    updateBrand
};