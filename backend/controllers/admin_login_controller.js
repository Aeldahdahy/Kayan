const db = require('../config/db');
const bcrypt = require('bcrypt');
const { json } = require('express');
const validator = require('express-validator');

const LogIn = (req, res) => {
    const {username, password} = req.body;
    var errors = [];
    if(!username || !password){
        errors.push('Please fulfill all fileds!');
    }
}


module.exports = {
    LogIn,

};