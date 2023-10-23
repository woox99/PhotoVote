//user.routes.js file
const UserController = require('../controllers/user.controller');
const {authenticate, isAdmin} = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.post('/api/logout', UserController.logout);
    
    
    // These routes must be authenticated
    app.delete('/api/user/:userId', authenticate, isAdmin, UserController.deleteUser);
    app.get('/api/users', authenticate, isAdmin, UserController.findAll);
    app.get('/api/getActiveUser', authenticate, UserController.getActiveUser);
}