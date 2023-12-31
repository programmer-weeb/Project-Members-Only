require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require("dotenv").config();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');


const indexRouter = require('./routes/index');
const UserModel = require('./models/UserModel');

const app = express();
mongoose.connect(process.env.DBConnectionString)
	.then(res => {
		console.log('db connected succ');
	})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(async (username, password, done) => {
	try {
		const user = await UserModel.findOne({ username: username }).exec()
		if (!user)
			return done(null, false, { message: 'incorrect username' })
		const match = await bcrypt.compare(password, user.password)
		if (!match)
			return done(null, false, { message: 'incorrect password' })
		console.log('from .use(new LocalStrategy)');
		console.log(user);
		return done(null, user)
	} catch (e) {
		done(e)
	}
}))
// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
	const user = await UserModel.findById(id).exec()
	done(null, user);
});

// Middleware to check user authentication
function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next(); // User is authenticated, proceed to the next middleware
	}
	// User is not authenticated, you can redirect them to the login page or show an error
	res.redirect('/login'); // Redirect to the login page
}

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Access the user from anywhere in our application
app.use((req, res, next) => {
	res.locals.currentUser = req.user
	next()
})

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
