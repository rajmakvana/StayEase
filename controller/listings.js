const Listing = require("../models/listings");


module.exports.index = async (req, res) => {
    let listings = await Listing.find();
    res.render("listings/index.ejs", { listings });
}


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created !!");
    res.redirect("/Listings");
}

module.exports.renderEditForm = async (req, res) => {
    const id = req.params.id;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", " Listing you request for does not exist !!");
      res.redirect("/Listings");
    }
    res.render("listings/edit.ejs", { listing });
  }


module.exports.showListing = async (req, res) => {
    const id = req.params.id;
    let listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", " Listing you request for does not exist !!");
      res.redirect("/Listings");
    }
    return res.render("listings/show.ejs", { listing });
}


module.exports.updateListing = async (req, res) => {
    const id = req.params.id;
    let listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true }
    );
    req.flash("success", " Listing Updated !!");
    res.redirect(`/Listings/${id}`);
}


module.exports.destroyListing = async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted !!");
    res.redirect("/Listings");
  }