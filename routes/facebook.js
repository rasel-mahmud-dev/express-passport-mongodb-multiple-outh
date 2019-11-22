const passport = require("passport");
const express = require("express");
const router = express.Router();


//* For Facebook Auth Hit this url( Client )
router.get("/auth/facebook", passport.authenticate("facebook", { scope: ['email']}));


//* Facebook Redirect callback
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
