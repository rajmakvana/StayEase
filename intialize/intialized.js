const mongoose = require('mongoose');
const Listing =  require('../models/listings');
const initData =  require('./data');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
}

main().then(() => {
    console.log("Database was Connected ");
}).catch(err  => console.log(err));

async function intialized() {
    await Listing.deleteMany();
    await Listing.insertMany(initData.data);
}

intialized().then((result) => {
    console.log(result);
}).catch(err =>  console.log(err));


// Listing.insertMany(initData.data)