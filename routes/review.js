const express = require('express');
const router = express.Router({mergeParams : true});

const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const {reviewSchama} = require('../schema.js');
const Listing  = require('../models/listings');
const Review  = require('../models/review');
const {isLogedIn , isReviewAuthor} = require('../middleWare.js')


// ** Middele ware for chack schema validation

const validateReviewSchema = (req , res ,next) => {
    const result = reviewSchama.validate(req.body);
    if(result.error){
        throw new ExpressError(400 , result.error)
    }else{
        next();
    }
}


const reviewsController = require("../controller/reviews.js")

// * Delete Review route
router.delete('/:reviewId' ,isLogedIn ,isReviewAuthor, wrapAsync(reviewsController.destroyReview));



// * ADD Review Route
router.post('/' ,isLogedIn, validateReviewSchema , wrapAsync(reviewsController.createReview));




module.exports = router;