const passport = require("passport");
const express = require("express");
const router = express.Router();

//* For Google Auth Hit this url( Client )
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//* Google Redirect callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;

