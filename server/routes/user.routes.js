//user.routes.js file
const UserController = require('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.post('/api/logout', UserController.logout);
    app.get('/api/users', UserController.findAll);
    app.delete('/api/user/:userId', UserController.deleteUser);
    

    // this route now has to be authenticated
    app.get('/api/getActiveUser', authenticate, UserController.getActiveUser);
}