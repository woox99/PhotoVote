// vote.model.js file

const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    voterId: {
        type: String, // Store binary image data
    },
    pollId: {
        type: String, // MIME type of the image (e.g., image/jpeg)
    },
    feedback: {
        type: String,
        maxlength: [52, 'Caption exceeds 52 maximum characters.']
    },

}, { timestamps: true });


module.exports = mongoose.model('Vote', VoteSchema);