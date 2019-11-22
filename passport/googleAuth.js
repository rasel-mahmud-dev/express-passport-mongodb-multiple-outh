const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../config/keys");
const User = mongoose.model("users");

//*  received user from instance of FaceBook Strategy......
passport.serializeUser((userId, done) => {
  done(null, userId);
});

// set inside server req.user = (when user login success)
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

//* Google Outh 2.0 Passport stratrgy setup
// passport middleware strategy......
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googelClientID,
      clientSecret: keys.googelClientSecret,
      callbackURL: keys.googleCallbackUrl
    },
    async (accessToken, refreshToken, profile, done) => {
      const exitingUser = await User.findOne({
        email: profile.emails[0].value
      });

      // Match via Email and Google Id
      if (exitingUser && exitingUser.googleId === profile.id) {
        return done(null, exitingUser._id);
      }
      // Set Google Id
      if (exitingUser && !exitingUser.googleId) {
        exitingUser.googleId = profile.id;
        const user = await exitingUser.save();
        return done(null, user._id);
      }

      const user = await new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }).save();

      done(null, user._id);
    }
  )
);
