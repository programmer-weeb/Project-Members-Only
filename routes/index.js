var express = require('express');
const UserModel = require('../models/UserModel');
const MessageModel = require('../models/MessageModel');
var router = express.Router();
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const passport = require('passport');

router.get('/', async (req, res, next) => {
	// display all message in homePage
	const allMessages = await MessageModel.find().populate('createdBy').exec()
	res.render('index2', {
		title: 'titleeeeee',
		user: req.user,
		messages: allMessages,
	})
});

router.get('/sign-up', async (req, res, next) => {
	res.render('signup_form')
})
router.post('/sign-up', [
	body('username').trim().escape(),
	body('password').trim().escape(),
	body('confirmPassword').trim().escape(),
	async (req, res, next) => {
		try {
			bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
				const newUser = new UserModel({
					username: req.body.username,
					password: hashedPassword,
				})
				await newUser.save()
				console.log(newUser);
				res.redirect('/log-in')
			})
		} catch (e) {

		}
	}
])

router.get('/log-in', async (req, res, next) => {
	res.render('login_form')
})

router.get('/log-out', (req, res, next) => {
	req.logout((err) => {
		if (err) next(err)
		res.redirect('/')	
	})
})

router.post('/log-in', passport.authenticate('local', {successRedirect: '/', failureMessage: '/log-in'}))

router.get('/user/:id', async (req, res, next) => {
	const user = UserModel.findById(req.params.id)
	res.send(user)

})
router.get('/message/:id', async (req, res, next) => {
	const message = MessageModel.findById(req.params.id)
	res.send(message)
})

module.exports = router;

// router.get("/", index_controller.index);
// router.post("/", message_controller.delete_message_post);

// router.get('/sign-up', auth_controller.signup_get);
// router.post('/sign-up', auth_controller.signup_post);

// router.get("/log-in", auth_controller.login_get);
// router.post("/log-in", auth_controller.login_post);
// router.get("/log-out", auth_controller.logout_get);

// router.get("/member", user_controller.member_get);
// router.post("/member", user_controller.member_post);

// router.get("/create-message", message_controller.create_message_get);
// router.post("/create-message", message_controller.create_message_post);

// router.get("/admin", user_controller.admin_get);
// router.post("/admin", user_controller.admin_post);