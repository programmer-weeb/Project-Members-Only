const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: String,
    timestamp: { type: Date, default: Date.now },
    text: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

messageSchema.virtual('url').get(function () {
    return `/message/${this._id}`
})

module.exports = mongoose.model('Message', messageSchema)