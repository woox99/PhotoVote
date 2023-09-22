//user.controller.js file
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {

    register: async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        if(user){
            return res.status(400).json({ errors: { email: { message: "This email is already associated with an account."} } });
        }

        User.create(req.body)
            .then(user => {
                const payload = {id: user._id};
                const userToken = jwt.sign(payload, process.env.SECRET_KEY);
                res.cookie('usertoken', userToken, { httpOnly: true }).json({ message: 'Logged in!', user:user });
            })
            .catch(err => res.status(400).json(err))
    },
    
    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        
        // If no user was returned
        if (!user) {
            return res.status(400).json({ message: "Invalid Email." })
        }
        
        // If we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const passIsCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if (!passIsCorrect) {
            return res.status(400).json({ message: "Invalid Password." })
        }

        // If we made it this far, the password was correct and we create cookie
        const payload = {id: user._id};
        const userToken = jwt.sign(payload, process.env.SECRET_KEY)
        res.cookie('usertoken', userToken, { httpOnly: true }).json({ message: 'Logged in!', user:user });
    },

    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    //gets user from userToken stored in cookie
    getActiveUser: (req, res) => {
        // Get the user token from the cookie
        const userToken = req.cookies.usertoken;
    
        if (!userToken) {
            return res.status(401).json({ message: "User token not found." });
        }
    
        try {
            // Verify and decode the user token to get the user's ID
            const decoded = jwt.verify(userToken, process.env.SECRET_KEY);
            const userId = decoded.id;
    
            // Use the user's ID to query the database and fetch the user
            User.findOne({ _id: userId })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: "User not found." });
                    }
                    res.status(200).json({ user: user });
                })
                .catch(err => res.status(500).json({ message: "Server error." }));
        } catch (error) {
            return res.status(401).json({ message: "Invalid token." });
        }
    },

    findAll: (req, res) => {
        User.find({})
            .then(users => res.json(users))
            .catch(err => res.status(401).json(err));
    },

    deleteUser: (req, res) => {
        User.findOneAndDelete({_id : req.params.userId})
            .then(deletedUser => res.status(200).json({ message: "User deleted successfully.", deletedUser }))
            .catch(err => res.status(401).json(err))
    }


}

