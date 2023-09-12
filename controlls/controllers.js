const passport = require("passport");
const MessageModel = require("../models/MessageModel");
const UserModel = require("../models/UserModel");
const { body, validationResult } = require('express-validator');


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

exports.getSignUp = async (req, res, next) => {
    res.render('signup_form')
}

exports.postSignUp = [
    body('username').trim().escape(),
    body('password').trim().escape(),
    body('confirmPassword').trim().escape()
        .custom((value, { req }) => {
            return value === req.body.password;
        }),
    async (req, res, next) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.send(errors)
            }
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if (err) res.send(err)
                const newUser = new UserModel({
                    username: req.body.username,
                    password: hashedPassword,
                })
                await newUser.save()
                console.log(newUser);
                res.redirect('/log-in')
            })
        } catch (e) {
            res.send(e)
        }
    }
]

exports.getLogin = async (req, res, next) => {
    res.render('login_form')
}

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) next(err)
        res.redirect('/')
    })
}

exports.getCreateMessage = (req, res, next) => {
	res.render('message_form')
}