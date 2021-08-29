const express = require('express');
const router = express.Router();
const {check} = require ('express-validator');
const authController = require ('../controllers/authController');

//create an user
// /api/auth
router.post('/',
    [
        check('email','Add a valid email').isEmail(),
        check('password','The password must have minimun 6 characters.').isLength({min: 6})
    ], 
    authController.autenticateUser
);

module.exports = router;
