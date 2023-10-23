//poll.routes.js file

const PollController = require('../controllers/poll.controller');
const upload = require('../config/multer.config'); // Import multer configuration from the correct file
const {authenticate, isAdmin} = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/poll', upload.array('photos', 3), PollController.createPoll);
    app.get('/api/pollToVote/:voterId', PollController.getPollToVote);
    app.get('/api/poll/all', PollController.getAllPolls);
    app.get('/api/poll/:ownerId', PollController.getPollByOwnerId);


    app.delete('/api/poll/:pollId', authenticate, PollController.deletePollById);
    app.delete('/api/pollByOwner/:ownerId', authenticate, isAdmin, PollController.deletePollByOwner);
};
