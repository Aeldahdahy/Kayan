const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASS =process.env.DB_PASS;
const DB_DATABASE= process.env.DB_DATABASE;

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_NAME,
    password: DB_PASS,
    database: DB_DATABASE
})

db.connect((err) => {
    if(err){
        console.error('Error connecting to database', err);
        return;
    }
        console.log('Connected succsefully to MySQL database');
});

module.exports = db;