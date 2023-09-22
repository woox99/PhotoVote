// photo.model.js file

const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    imageData: {
        type: String, // Store binary image data
    },
    imageContentType: {
        type: String, // MIME type of the image (e.g., image/jpeg)
    },
}, { timestamps: true });


module.exports = mongoose.model('Photo', PhotoSchema);