const express = require('express');
const router = express.Router({mergeParams : true});

const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const {reviewSchama} = require('../schema.js');
const Listing  = require('../models/listings');
const Review  = require('../models/review');


// ** Middele ware for chack schema validation

const validateReviewSchema = (req , res ,next) => {
    const result = reviewSchama.validate(req.body);
    if(result.error){
        throw new ExpressError(400 , result.error)
    }else{
        next();
    }
}


// * Delete Review route

router.delete('/:reviewId' , wrapAsync(async (req , res) => {
    let {id , reviewId} = req.params;
    console.log(id , reviewId);
    let result = await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}})
    console.log(result);
    await Review.findByIdAndDelete(reviewId);
    req.flash('success' , ' Review Deleted !!');
    res.redirect(`/Listings/${id}`);
}));

// * ADD Review Route

router.post('/' , validateReviewSchema , wrapAsync(async (req , res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    req.flash('success' , 'New Review Updated !!');
    await newReview.save();
    await listing.save();
    res.redirect(`/Listings/${listing.id}`);
}));




module.exports = router;