const passport = require("passport");
const MessageModel = require("../models/MessageModel");


exports.postLogin = passport.authenticate('local', { successRedirect: '/', failureMessage: '/log-in' })

exports.getHome = async (req, res, next) => {
    // display all message in homePage
    const allMessages = await MessageModel.find().populate('createdBy').exec()
    res.render('index2', {
        title: 'titleeeeee',
        user: req.user,
        messages: allMessages,
    })
}