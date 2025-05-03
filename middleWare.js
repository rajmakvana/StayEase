const Listing = require('./models/listings');
const Review  = require('./models/review');


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

module.exports.isOwner = async (req , res , next) => {
    let {id} = req.params ;
    let listing = await Listing.findById(id)
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error" , "you don't have a permision to delete Listing ");
        return res.redirect(`/Listings/${id}`);
    }
    next()
}

module.exports.isReviewAuthor = async (req , res , next) => {
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error" , "you are not the author of this reviews");
        return res.redirect(`/Listings/${id}`);
    }  
    next()
}