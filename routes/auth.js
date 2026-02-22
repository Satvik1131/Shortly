const express = require('express');
const passport = require('passport');
const { setuser } = require('../service/auth');
const router = express.Router();

// Redirect to Google for authentication
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
        prompt: 'select_account'
    })
);

// Google callback
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    function (req, res) {
        // Generate JWT token for the user
        const token = setuser(req.user);

        // Redirect to frontend with token in query param using relative URL
        res.redirect(`/?token=${token}`);
    }
);

module.exports = router;
