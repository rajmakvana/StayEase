const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listings");
const { isLogedIn, isOwner } = require("../middleWare.js");

//* MiddleWare

const validateSchema = (req, res, next) => {
  const result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error);
  } else {
    next();
  }
};

const listingController = require('../controller/listings.js')

// * index route
router.get("/", wrapAsync(listingController.index) );


// * new route
router.get("/new", isLogedIn,listingController.renderNewForm );


// * create route
router.post(
  "/",
  isLogedIn,
  validateSchema,
  wrapAsync(listingController.createListing)
);


// * edit route 
router.get(
  "/:id/edit",
  isLogedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


// * show route
router.get(
  "/:id",
  wrapAsync(listingController.showListing)
);


// * upadate route
router.put(
  "/:id",
  isLogedIn,
  isOwner,
  validateSchema,
  wrapAsync(listingController.updateListing)
);


// * delete route
router.delete(
  "/:id",
  isLogedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
