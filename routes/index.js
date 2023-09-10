var express = require('express');
const UserModel = require('../models/UserModel');
const MessageModel = require('../models/MessageModel');
var router = express.Router();

router.get('/', async (req, res, next) => {
	// display all message in homePage
	const allMessages = await MessageModel.find().populate('createdBy').exec()
	res.render('layout', {
		title: 'titleeeeee',
		user: req.user,
		messages: allMessages,
	})
});

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