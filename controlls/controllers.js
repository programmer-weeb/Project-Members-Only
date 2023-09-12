const passport = require("passport");


exports.postLogin = passport.authenticate('local', { successRedirect: '/', failureMessage: '/log-in' })