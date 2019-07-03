const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function: has access to request & reponse objects
module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token'); // the header key in which we want to send the token

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' }); // not authorized
    }

    // Verify token
    try { 
        // take request object & assign value to user...
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user; // set user in request, can be used now in any of the routes
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }

}
