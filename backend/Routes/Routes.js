const express = require('express');
const { getAdmin, createAdmin, signInAdmin } = require('../controllers/Admin_Controller');
const router = express.Router();


// show admin information logic
router.get('/admin', getAdmin);

// create admin logic (the Authority is only for the Admin)
router.post('/createadminAccount', createAdmin);

// admin log-in logic 
router.post('/loginadminAccount', signInAdmin);

// edit admin information logic (the Authority is only for the Admin)
// router.put('/admin', verifyToken, async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || (!username && !password && !role && !email)) {
//         return res.status(400).json({ message: 'Please provide username and at least one field to update' });
//     }

//     if (req.user.role !== 'Admin') {
//         return res.status(403).json({ message: 'Forbidden: Only admins can update admin accounts' });
//     }

//     try {
//         const connection = await db.getConnection();
//         try {
//             let updateFields = [];
//             let updateParams = [];

//             if (username) {
//                 updateFields.push('user_name = ?');
//                 updateParams.push(username);
//             }

//             if (password) {
//                 const hashedPassword = await bcrypt.hash(password, 10);
//                 updateFields.push('password = ?');
//                 updateParams.push(hashedPassword);
//             }

//             if (role) {
//                 updateFields.push('role = ?');
//                 updateParams.push(role);
//             }

//             if (email) {
//                 updateFields.push('email = ?');
//                 updateParams.push(email);
//             }

//             updateParams.push(username);

//             const updateQuery = `UPDATE admin 
//                                  SET ${updateFields.join(',')} WHERE username = ?`;

//             const [newData] = await connection.query(updateQuery, updateParams);

//             if (newData.affectedRows === 0) {
//                 return res.status(404).json({ message: 'admin not found' });
//             }

//             const [updateadminData] = await connection.query(
//                 'SELECT username, user_name, role, email FROM admin WHERE username = ?',
//                 [username]
//             );

//             res.status(200).json({ message: 'admin account updated successfully', admin: updateadminData[0] });

//         } catch (error) {
//             console.error('Database query error:', error);
//             res.status(500).json({ message: 'Server error' });
//         } finally {
//             connection.release();
//         }
//     } catch (error) {
//         console.error('Database connection error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// delete admin infromation logic (the Authority is only for the Admin)
// router.delete('/admin', verifyToken, async (req, res) => {
//     const { username } = req.body;

//     if (req.user.role !== 'Admin') {
//         return res.status(403).json({ message: 'Forbidden: Only admins can delete admin accounts' });
//     }

//     if (!username) {
//         return res.status(400).json({ message: 'username is required' });
//     }

//     try {
//         const connection = await db.getConnection();
//         try {
//             const [adminData] = await connection.query(
//                 'DELETE FROM admin WHERE username = ?',
//                 [username]
//             );

//             if (adminData.affectedRows === 0) {
//                 return res.status(404).json({ message: 'admin account not found' });
//             }

//             res.status(200).json({ message: 'admin account deleted successfully' });
//         } catch (error) {
//             console.error('Database query error:', error);
//             res.status(500).json({ message: 'Server error' });
//         } finally {
//             connection.release();
//         }
//     } catch (error) {
//         console.error('Database connection error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


module.exports = router;