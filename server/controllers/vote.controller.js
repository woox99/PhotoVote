//user.controller.js file
const Vote = require('../models/vote.model');
const User = require('../models/user.model');
const Poll = require('../models/poll.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {

    createVote: async (req, res) => {
        // console.log(req.body) //
        let pollOwner = {
            karma: req.body.pollOwnerKarma > 0 ? req.body.pollOwnerKarma - 1 : 0,
        }
        let poll = {
            karma: pollOwner.karma,
            photoOneVoteCount: req.body.photoOneVoteCount,
            photoTwoVoteCount: req.body.photoTwoVoteCount,
            photoThreeVoteCount: req.body.photoThreeVoteCount
        }
        let activeUser = {
            karma: req.body.activeUserKarma < 999 ? req.body.activeUserKarma + 1 : 0,
        }
        //create vote
        Vote.create(req.body)
            .then(vote => {
                // res.json(vote);
                //update poll owner karma -1
                User.findOneAndUpdate({ _id: req.body.pollOwnerId }, pollOwner, { new: true, runValidators: true })
                    .then()
                    .catch(err => res.status(400).json(err))
                //update poll karma -1, voteCount +1
                Poll.findOneAndUpdate({ _id: req.body.pollId }, poll, { new: true, runValidators: true })
                    .then()
                    .catch(err => res.status(400).json(err))
                //update voter karma +1
                User.findOneAndUpdate({ _id: req.body.voterId }, activeUser, { new: true, runValidators: true })
                    .then()
                    .catch(err => res.status(400).json(err))
                //update voter poll karma +1
                Poll.findOneAndUpdate({ ownerId: req.body.voterId }, activeUser, { new: true, runValidators: true })
                    .then()
                    .catch(err => res.status(400).json(err))
                res.json(vote)
            })
            .catch(err => res.status(400).json(err))
    },



    // //gets user from userToken stored in cookie
    // getActiveUser: (req, res) => {
    //     // Get the user token from the cookie
    //     const userToken = req.cookies.usertoken;

    //     if (!userToken) {
    //         return res.status(401).json({ message: "User token not found." });
    //     }

    //     try {
    //         // Verify and decode the user token to get the user's ID
    //         const decoded = jwt.verify(userToken, process.env.SECRET_KEY);
    //         const userId = decoded.id;

    //         // Use the user's ID to query the database and fetch the user
    //         User.findOne({ _id: userId })
    //             .then(user => {
    //                 if (!user) {
    //                     return res.status(404).json({ message: "User not found." });
    //                 }
    //                 res.status(200).json({ user: user });
    //             })
    //             .catch(err => res.status(500).json({ message: "Server error." }));
    //     } catch (error) {
    //         return res.status(401).json({ message: "Invalid token." });
    //     }

    // },

}

