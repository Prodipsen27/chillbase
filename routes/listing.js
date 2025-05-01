const express = require('express');
const multer = require('multer');
const { storage, cloudinary } = require('../cloudConfig.js');
const upload = multer({ storage });
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const { isLoggedIn, isOwner, reviewAuth } = require('../middleware.js');

// ---------------------- Validation Middlewares ----------------------

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

// -------------------------- Routes --------------------------

// All Listings
router.get('/', wrapAsync(async (req, res) => {
    let filter = true;
    const allListings = await Listing.find({});
    res.render('listings.ejs', { allListings,filter });
}));
router.get('/search', wrapAsync(async (req, res,next) => {
    console.log(res)
    req.flash('error', 'Currently in development phase!');
    next()
}));

// New Form
router.get('/new', isLoggedIn, (req, res) => {
    res.render('new.ejs');
});

// Show One Listing
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: 'reviews', populate: { path: 'author' } })
        .populate('owner');

    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }

    res.render('show.ejs', { listing });
}));

// Create New Listing
router.post('/', isLoggedIn, validateListing, upload.single('listing[image]'),
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;

        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await newListing.save();
        req.flash('success', 'New Listing Created');
        res.redirect('/listings');
    })
);

// Edit Form
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    let originalImage = listing.image.url;
    originalImage = originalImage.replace('/upload','/upload/h_300,w_200')
    res.render('edit.ejs', { listing,originalImage });
}));

// Update Listing
router.put('/:id', isLoggedIn, isOwner,  upload.single('listing[image]'),
    wrapAsync(async (req, res) => {
        const { id } = req.params;

        const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        if (req.file) {
            // Delete old image from Cloudinary
            if (listing.image && listing.image.filename) {
                await cloudinary.uploader.destroy(listing.image.filename);
            }

            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
            await listing.save();
        }

        req.flash('success', 'Listing Updated.');
        res.redirect(`/listings/${listing._id}`);
    })
);

// Delete Listing
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    // Delete image from Cloudinary
    if (listing.image && listing.image.filename) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }

    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing Deleted');
    res.redirect('/listings');
}));

// Add Review
router.post('/:id/reviews', isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash('success', 'Added a review');
    res.redirect(`/listings/${listing._id}`);
}));

// Delete Review
router.delete('/:id/reviews/:reviewId', reviewAuth, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Deleted a review');
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
