//jwt.config.js file
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            req.user = { id: payload.id, isAdmin: payload.isAdmin }; // Attach isAdmin to req.user
            next();
        }
    });
}

module.exports.isAdmin = (req, res, next) => {
    // Ensure that the user is an admin
    if (req.user.isAdmin) {
        next(); // User is an admin, proceed to the controller
    } else {
        res.status(403).json({ message: 'Access forbidden. You must be an admin.' });
    }
};