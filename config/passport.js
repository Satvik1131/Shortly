const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'missing_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'missing_client_secret',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:8001/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            // Find user by googleId
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // Check if user already exists with the same email
                user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // Link google account to existing user
                    user.googleId = profile.id;
                    await user.save();
                } else {
                    // Create new user in MongoDB
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    });
                }
            }
            return cb(null, user);
        } catch (err) {
            return cb(err, null);
        }
    }
));

module.exports = passport;
