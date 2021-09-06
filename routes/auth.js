const express = require('express');
const router = express.Router();
const {check} = require ('express-validator');
const authController = require ('../controllers/authController');
const auth = require('../middleware/auth');

//log in
// /api/auth
router.post('/',
    authController.autenticateUser
);

//get authenticated user
// /api/auth
router.get('/',
    auth,
    authController.userAuthenticated
)

module.exports = router;
