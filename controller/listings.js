const Listing = require("../models/listings");


module.exports.index = async (req, res) => {
    let listings = await Listing.find();
    res.render("listings/index.ejs", { listings });
}


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.createListing = async (req, res) => {
    const url = req.file.path;
    const filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename}
    await newListing.save();
    req.flash("success", "New Listing Created !!");
    res.redirect("/");
}

module.exports.renderEditForm = async (req, res) => {
    const id = req.params.id;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", " Listing you request for does not exist !!");
      res.redirect("/");
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
      res.redirect("/");
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
    
    if(typeof req.file !== "undefined"){
      const filename = req.file.filename;
      const url = req.file.path;
      listing.image = {url , filename}
      await listing.save()
    }
    
    req.flash("success", " Listing Updated !!");
    res.redirect(`/Listings/${id}`);
}


module.exports.destroyListing = async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted !!");
    res.redirect("/");
  }