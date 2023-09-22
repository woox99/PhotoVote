//photo.controller.js file

const Photo = require('../models/photo.model');

module.exports.createPhoto = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file provided.' });
    }

    // Create a new Photo object using the model
    const newPhoto = new Photo();

    console.log(req.file); //debug
    console.log(req.body); //debug

    // Set the imageData and imageContentType from the request
    newPhoto.imageData = req.file.buffer.toString('base64'); // Convert buffer to base64 string
    newPhoto.imageContentType = req.file.mimetype;

    // Save the new photo to the database
    newPhoto.save()
        .then(photo => {
            res.json(photo);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred during upload.' });
        });
};

module.exports.allPhotos = (req, res) => {
    Photo.find()
        .then(photos => {
            res.json(photos);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching photos.' });
        });
};