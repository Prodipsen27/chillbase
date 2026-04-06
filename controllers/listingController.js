const Listing = require("../models/listing");
const Review = require("../models/review");
const { cloudinary } = require("../cloudConfig");

module.exports.index = async (req, res) => {
  const { search, category, minPrice, maxPrice } = req.query;
  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const allListings = await Listing.find(query).populate("owner");
  res.json(allListings);
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  
  if (!listing) {
    return res.status(404).json({ error: "Listing not found!" });
  }
  res.json(listing);
};

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.images = [{
      url: req.file.path,
      filename: req.file.filename,
    }];
  }

  await newListing.save();
  res.status(201).json({ message: "New Listing Created", listing: newListing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  const updatedListing = await Listing.findById(id).populate("owner");
  res.json({ message: "Listing Updated", listing: updatedListing });
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (listing.image && listing.image.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  await Listing.findByIdAndDelete(id);
  res.json({ message: "Listing Deleted" });
};
