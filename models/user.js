const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Often you'd want the email to be unique
    }
});

// It should be userSchema.plugin, not User.plugin
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
