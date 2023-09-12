var express = require('express');
const UserModel = require('../models/UserModel');
const MessageModel = require('../models/MessageModel');
var router = express.Router();
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const controllers = require('../controlls/controllers')

router.get('/', controllers.getHome);

router.get('/sign-up', controllers.getSignUp)
router.post('/sign-up', controllers.postSignUp)

router.get('/log-in', controllers.getLogin)

router.get('/log-out', controllers.logout)

router.post('/log-in', controllers.postLogin)

router.get('/user/:id', async (req, res, next) => {
	const user = UserModel.findById(req.params.id)
	res.send(user)

})
router.get('/message/:id', async (req, res, next) => {
	const message = MessageModel.findById(req.params.id)
	res.send(message)
})

router.get('/create-message', (req, res, next) => {
	res.render('message_form')
})

router.post('/create-message', [
	body("messageTitle").trim().isLength({ min: 1 }).withMessage("Title must not be empty"),
	body("messageText").trim().isLength({ min: 1 }).withMessage("Text must not be empty"),
	async (req, res, next) => {
		const newMessage = new MessageModel({
			title: req.body.messageTitle,
			text: req.body.messageText,
			createdBy: req.user,
		})

		await newMessage.save()
		res.redirect('/')
	}
])

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