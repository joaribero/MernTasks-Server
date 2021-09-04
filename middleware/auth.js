const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    //read header token
    const token = req.header('x-auth-token');

    //check if there isn't a token
    if (!token) {
        return res.status(401).json({msg: 'Access denied due to invalid credentials'});
    }

    //validate token
    try {

        const encode = jwt.verify(token, process.env.SECRET);
        req.user = encode.user;
        next();

    } catch (error) {
        return res.status(401).json({msg: 'Access denied due to invalid credentials'});
    }

}