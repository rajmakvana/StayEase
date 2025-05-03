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
    initData.data = initData.data.map( (data) => {
        return {...data , owner : '6813b386050fe989cb513a75'}
    } );
    await Listing.insertMany(initData.data);
}

intialized().then((result) => {
    console.log(result);
}).catch(err =>  console.log(err));


// Listing.insertMany(initData.data)