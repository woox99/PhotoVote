//photo.routes.js file

const PhotoController = require('../controllers/photo.controller');
const upload = require('../config/multer.config'); // Import multer configuration from the correct file

module.exports = app => {
    app.post('/api/photo', upload.single('photo'), PhotoController.createPhoto);
    app.get('/api/photo', PhotoController.allPhotos);
};
