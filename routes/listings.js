const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const {listingSchema } = require('../schema.js');
const Listing  = require('../models/listings');
const {isLogedIn} = require('../middleWare.js');

//* MiddleWare 

const validateSchema = (req , res ,next) => {
    const result = listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400 , result.error)
    }else{
        next();
    }
}


// * index route 
router.get('/' , async (req , res) => {
    let listings = await Listing.find();
    res.render('listings/index.ejs' , {listings});
});

// * new route
router.get('/new' , isLogedIn , (req , res) => {
    res.render('listings/new.ejs');
});

// * create route
router.post('/' ,isLogedIn, validateSchema , wrapAsync(async (req , res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash('success' , 'New Listing Created !!');
    res.redirect('/Listings');
}));

router.get('/:id/edit' , isLogedIn , wrapAsync(async (req , res) => {
    const id = req.params.id;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash('error' , ' Listing you request for does not exist !!');
        res.redirect('/Listings');
    }
    res.render('listings/edit.ejs' , {listing});
}));

// * show route 
router.get('/:id' ,  wrapAsync(async (req , res) => {
    const id = req.params.id;
    let listing = await Listing.findById(id).populate('reviews');
    if(!listing){
        req.flash('error' , ' Listing you request for does not exist !!');
        res.redirect('/Listings');
    }
    return res.render('listings/show.ejs' , {listing});
}));

// * upadate route
router.put('/:id' , validateSchema , isLogedIn , wrapAsync(async (req ,res) => {
    const id = req.params.id;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing} , {new : true});
    req.flash('success' , ' Listing Updated !!');
    res.redirect(`/Listings/${id}`);
}));

// * delete route 
router.delete('/:id' , isLogedIn , wrapAsync(async (req , res) => {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash('success' , 'Listing Deleted !!');
    res.redirect('/Listings');
}));


module.exports = router;
