const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync.js');
const listingController = require('../controllers/listingController.js');
const { isLoggedIn, isOwner } = require('../middleware.js');

// Index & Create
router.route('/')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));

// Show, Update & Delete
router.route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
