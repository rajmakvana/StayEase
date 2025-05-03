const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {redirectSaveUrl} = require('../middleWare');

router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser , (err) => {
        if(err){
          return next(err);
        }
        req.flash("success", "User registered successfully");
        res.redirect("/Listings");
      })
      
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  redirectSaveUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Logged in successfully");
    let redirectUrl = res.locals.redirectUrl || '/Listings'
    res.redirect(redirectUrl);
  }
);

router.get('/logout' ,  (req , res , next) => {
  req.logout((err) => {
    if(err){
      return next(err);
    }
  })
  req.flash("success", "You are Logged out ");
  res.redirect('/Listings');
})

module.exports = router;
