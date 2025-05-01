const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = "mongodb+srv://tryprosen27:DFTi96Kmpuk6z7or@cluster0.wxzktur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj, owner: '6813a0be847460e29e3ed229'}))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();