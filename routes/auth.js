const express = require('express');
const router = express.Router();
const {check} = require ('express-validator');
const authController = require ('../controllers/authController');
const auth = require('../middleware/auth');

//log in
// /api/auth
router.post('/',
    [
        check('email','Add a valid email').isEmail(),
        check('password','The password must have minimun 6 characters.').isLength({min: 6})
    ], 
    authController.autenticateUser
);

//get authenticated user
// /api/auth
router.get('/',
    auth,
    authController.userAuthenticated
)

module.exports = router;
