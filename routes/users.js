const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {check} = require ('express-validator');

//create an user
// /api/users
router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email','Add a valid email').isEmail(),
        check('password','The password must have minimun 6 characters.').isLength({min: 6})
    ], userController.createUser
);

module.exports = router;
