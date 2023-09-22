//user.model.js file
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required.'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [1, 'Password must be at least 8 characters']
    },
    karma: {
        type: Number,
        default: 0,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// add this after UserSchema is defined
UserSchema.virtual('confirm')
    .get(() => this._confirm)
    .set(value => this._confirm = value);

// pre-hook runs the function within it before the argument 'validate' or 'save' happens
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirm) {
        this.invalidate('confirm', 'Passwords do not match.');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


module.exports = mongoose.model('User', UserSchema);