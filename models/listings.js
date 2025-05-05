const mongoose = require("mongoose");
const { title } = require("process");
const Review = require('./review.js');
const { ref } = require("joi");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url : String,
    filename : String
  },
  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type : mongoose.Types.ObjectId,
      ref : "Review"
    }
  ],
  owner : {
    type : mongoose.Types.ObjectId,
    ref : "User"
  }
});

listingSchema.post('findOneAndDelete' , async (listing) => {
    if(listing) {
      await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
