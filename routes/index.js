var express = require('express');
const UserModel = require('../models/UserModel');
const MessageModel = require('../models/MessageModel');
var router = express.Router();

router.get('/', async (req, res, next) => {
	// display all message in homePage
	const allMessages = await MessageModel.find().exec()
	res.send(allMessages)
	// res.render('index', { title: 'Express' });
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
