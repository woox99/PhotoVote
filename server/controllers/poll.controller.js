//poll.controller.js file

const Poll = require('../models/poll.model');
const Vote = require('../models/vote.model');

module.exports.createPoll = async (req, res) => {
    if (!req.files) {
        return res.status(400).json({ error: 'No file provided.' });
    }

    const existingPoll = await Poll.findOne({ ownerId: req.body.ownerId });
    if (existingPoll) {
        return res.status(400).json({ errors: { category: { message: "You already have an active poll." } } });
    }
    // Create a new Poll object using the model
    const newPoll = new Poll();

    // console.log(req.files) //debug
    // console.log(req.files[0].buffer.toString('base64')) //debug
    // console.log(req.body) //debug

    // Set the data and ContentType from the request
    newPoll.photoOneData = req.files[0].buffer.toString('base64'); // Convert buffer to base64 string
    newPoll.photoOneContentType = req.files[0].mimetype;
    newPoll.photoTwoData = req.files[1].buffer.toString('base64'); // Convert buffer to base64 string
    newPoll.photoTwoContentType = req.files[1].mimetype;
    newPoll.photoThreeData = req.files[2].buffer.toString('base64'); // Convert buffer to base64 string
    newPoll.photoThreeContentType = req.files[2].mimetype;

    // Set the body fields
    newPoll.ownerId = req.body.ownerId;
    newPoll.category = req.body.category;
    newPoll.caption = req.body.caption;
    newPoll.karma = req.body.karma;

    // console.log(newPoll) //debug

    // Save the new photo to the database
    newPoll.save()
        .then(poll => {
            res.json(poll);
        })
        .catch(err => {
            return res.status(400).json(err)
        });
};

// get poll by owner id
module.exports.getPollByOwnerId = (req, res) => {
    let feedbackArr = [];

    Poll.findOne({ ownerId: req.params.ownerId })
        .then(poll => {
            if (!poll) {
                return res.status(404).json({ error: 'Poll not found' });
            }

            //get all feedback from votes by pollId
            Vote.find({ pollId: poll._id })
                .then(votes => {
                    for (const vote of votes) {
                        if (vote.feedback) {
                            feedbackArr.push(vote.feedback.toString());
                        }
                    }
                    res.json({ poll: poll, feedback: feedbackArr });
                })
        })
        .catch(error => {
            console.error(error);
            res.status(500).json(error);
        });
};

module.exports.getAllPolls = (req, res) => {
    Poll.find()
        .then(polls => res.json(polls))
        .catch()
};

// get qualifying poll to vote on
module.exports.getPollToVote = async (req, res) => {
    const notQualifyingPollIds = [];
    // console.log(req.params.voterId) //debug

    try {
        // add voters poll and previous votes to unQualifying polls
        const voterPolls = await Poll.find({ ownerId: req.params.voterId });
        const voterVotes = await Vote.find({ voterId: req.params.voterId });

        for (const poll of voterPolls) {
            notQualifyingPollIds.push(poll._id.toString());
        }

        for (const vote of voterVotes) {
            notQualifyingPollIds.push(vote.pollId.toString());
        }

        const topPoll = await Poll.findOne({ _id: { $nin: notQualifyingPollIds } }) //find polls not including ids found in array
            .sort({ karma: -1 }) // Sort by karma in descending order
            .limit(1) // Limit the result to one poll
        res.json(topPoll); //return result in json format

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Delete poll by id
module.exports.deletePollById = (req, res) => {
    const { pollId } = req.params;
    const { user } = req;

    Poll.findById(pollId)
        .then((poll) => {
            if (user.isAdmin || user.id === poll.ownerId) {
                return Poll.deleteOne({ _id: pollId }); // Use Promises
            }
            res.status(403).json({ error: 'Permission denied' });
        })
        .then((result) => {
            if (result.deletedCount === 1) {
                res.json({ message: 'Poll deleted successfully' });
            } else {
                res.status(404).json({ error: 'Poll not found' });
            }})
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the poll.' });
        });
};

// Delete poll by owner
module.exports.deletePollByOwner = (req, res) => {
    Poll.deleteOne({ ownerId: req.params.ownerId }) // Use deleteOne to delete a single poll by its ID
        .then(result => {
            if (result.deletedCount === 1) {
                res.json({ message: 'Poll deleted successfully' });
            } else {
                res.status(404).json({ error: 'Poll not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the poll.' });
        });
};