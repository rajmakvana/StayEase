const User = require("../models/user");

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.renderSignupForm = (req, res) => {
    res.render("./users/signup.ejs");
}
 
module.exports.signUp = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser , (err) => {
        if(err){
          return next(err);
        }
        req.flash("success", "User registered successfully");
        res.redirect("/");
      })
      
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
}


module.exports.login = async (req, res) => {
    req.flash("success", "Logged in successfully");
    let redirectUrl = res.locals.redirectUrl || '/'
    res.redirect(redirectUrl);
}


module.exports.logout = (req , res , next) => {
    req.logout((err) => {
      if(err){
        return next(err);
      }
    })
    req.flash("success", "You are Logged out ");
    res.redirect('/');
  }