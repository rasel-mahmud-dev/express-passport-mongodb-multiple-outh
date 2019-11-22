const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

// received user from instance of FaceBook Strategy......
passport.serializeUser((userId, done) => {    
  done(null, userId);
});

// set inside server req.user = (when user login success)
passport.deserializeUser(async(id, done) => {  
  const user = await User.findById(id)
  done(null, user);
});


// passport middleware strategy......
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: keys.facebookCallbackUrl,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      
      let exitingUser = await User.findOne({email: profile.emails[0].value})
      if(exitingUser){
        return done(null, exitingUser._id)
      }
      let newUser = await new User({ 
        username: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }).save()
     done(null, newUser._id)
    }
  )
);
