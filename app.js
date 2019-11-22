const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");

const keys = require("./config/keys");
require("./model/User");

// passport strategy setup
require("./passport/googleAuth");
require("./passport/facebookAuth");

const userRoute = require("./routes/user");
const googleAuthRoute = require("./routes/google");
const facebookAuthRoute = require("./routes/facebook");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

// passport Set_cookie inside Client Browser
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieSecret]
  })
);

// passport initialize.....
app.use(passport.initialize());

// Set current user obj inside req object
app.use(passport.session());

// routes........
app.use(userRoute);
app.use(facebookAuthRoute);
app.use(googleAuthRoute);

const PORT = process.env.PORT || 4000;
mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(res => {
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
    console.log("Database Connected.");
  })
  .catch(err => console.log(err));
