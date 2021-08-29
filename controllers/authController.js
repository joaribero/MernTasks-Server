const User = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require ('jsonwebtoken');

exports.autenticateUser = async (req, res) => {

    //Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //extract email and password
    const {email, password} = req.body;

    try {

        //Check if is a registered user.
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({msg: 'User does not exist.'});
        }

        //Check password
        const correctPassword = await bcryptjs.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json({msg: 'Incorrect password.'});
        }

        //if everything is correct create and sign JWT
        const payload = {
            user: {
                id: user.id
            }
        };
        //sign JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hour
        }, (error, token) => {
            if (error) throw error;

            //Confirmation message
            res.json({ token });

        });

    } catch (error) {
        console.log(error);
    }

}