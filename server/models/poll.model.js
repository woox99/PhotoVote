// poll.model.js file

const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    photoOneData: {
        type: String, // Store binary image data
    },
    photoOneContentType: {
        type: String, // MIME type of the image (e.g., image/jpeg)
    },
    photoOneVoteCount: {
        type: Number,
        default: 0,
    },
    photoTwoData: {
        type: String, // Store binary image data
    },
    photoTwoContentType: {
        type: String, // MIME type of the image (e.g., image/jpeg)
    },
    photoTwoVoteCount: {
        type: Number,
        default: 0,
    },
    photoThreeData: {
        type: String, // Store binary image data
    },
    photoThreeContentType: {
        type: String, // MIME type of the image (e.g., image/jpeg)
    },
    photoThreeVoteCount: {
        type: Number,
        default: 0,
    },
    ownerId: {
        type: String
    },
    category: {
        type: String,
        required: [true, 'Category is required.'],
    },
    caption: {
        type: String,
        required: [true, 'Caption is required.'],
        maxlength: [52, 'Caption exceeds 52 maximum characters.']
    },
    karma: {
        type: Number,
    },

}, { timestamps: true });


module.exports = mongoose.model('Poll', PollSchema);