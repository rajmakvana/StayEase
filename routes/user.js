const express = require("express");
const router = express.Router({ mergeParams: true });


const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {redirectSaveUrl} = require('../middleWare');

const userController = require("../controller/user");

router.get("/signup", userController.renderSignupForm);

router.post(
  "/signup",
  wrapAsync(userController.signUp)
);

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  redirectSaveUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get('/logout' ,  userController.logout)

module.exports = router;
