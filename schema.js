const Joi = require('joi');

// Single listing schema
const listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object({
        url: Joi.string().allow('', null),
        filename: Joi.string().allow('', null),
    }),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
});

// Schema to validate a single listing request (like POST/PUT)
module.exports.listingSchema = Joi.object({
    listing: listingSchema.required()
});

// Schema for validating a bulk array of listings
module.exports.listingArraySchema = Joi.array().items(listingSchema);

// Review schema remains unchanged
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});
