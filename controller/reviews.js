const Listing  = require('../models/listings');
const Review  = require('../models/review');


module.exports.createReview = async (req , res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id ;
    listing.reviews.push(newReview);
    req.flash('success' , 'New Review Updated !!');
    await newReview.save();
    await listing.save();
    res.redirect(`/Listings/${listing.id}`);
}


module.exports.destroyReview = async (req , res) => {
    let {id , reviewId} = req.params;
    let result = await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success' , ' Review Deleted !!');
    res.redirect(`/Listings/${id}`);
}