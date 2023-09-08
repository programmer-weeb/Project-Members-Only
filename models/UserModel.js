const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true,
    }, // You can use email for this, but make sure it's unique.
    password: String,
    membershipStatus: {
        type: String,
        enum: ['Free', 'Premium'], // Adjust as needed
        default: 'Free',
    },
})

userSchema.virtual('url').get(function () {
    return `/user/${this._id}`
})

module.exports = mongoose.model('User', userSchema)