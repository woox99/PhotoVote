//vote.routes.js file
const VoteController = require('../controllers/vote.controller');

module.exports = app => {
    app.post('/api/vote', VoteController.createVote);
}