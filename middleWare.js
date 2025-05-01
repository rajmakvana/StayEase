module.exports.isLogedIn = (req , res ,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash('error' , 'You must be logged in to create a listing!');
        return res.redirect('/login');
    }else{
        next()
    }
}


module.exports.redirectSaveUrl = (req , res , next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}