const mongoose = require('mongoose');
const Listing =  require('../models/listings');
const initData =  require('./data');

async function main() {
    await mongoose.connect("mongodb+srv://rajmakvana07e:dbZtIDfnRju9vQqz@cluster0.7vlbcdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

main().then(() => {
    console.log("Database was Connected ");
}).catch(err  => console.log(err));

async function intialized() {
    initData.data = initData.data.map( (data) => {
        return {...data , owner : '68199b8752e32098f44f31f1'}
    } );
    await Listing.insertMany(initData.data);
}

intialized().then((result) => {
    console.log(result);
}).catch(err =>  console.log(err));


// Listing.insertMany(initData.data)