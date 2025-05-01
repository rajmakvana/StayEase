const joi = require('joi');
const { model } = require('mongoose');
const review = require('./models/review');

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        image : joi.string().allow("", null),
        location : joi.string().required(),
        price : joi.number().required().min(0),
        country : joi.string().required(),
    }).required()
});


module.exports.reviewSchama = joi.object({
    review : joi.object({
        rating : joi.number().required().min(1).max(5),
        commet : joi.string().required(),
    }).required()
});