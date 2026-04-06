const mongoose = require("mongoose");
const review = require("./review");
const Review = require('./review.js');
const { required } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required:true,
  } ,
  images: [
    {
      url: String,
      filename: String,
    }
  ],
  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Domes", "Boats", "Desert"],
    required: true,
  },
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:'Review'
    }
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref:'User'
  }
});

listingSchema.post('findOneAndDelete',async(listing)=>{
  if (listing) {
    
    await Review.deleteMany({_id: {$in: listing.reviews}})
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;