if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const User = require('./models/user.js');
const ExpressError = require('./utils/ExpressError.js');
const listingRouter = require('./routes/listing.js');
const userRouter = require('./routes/user.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
main()
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect(process.env.DB_URL);
}

// Passport Initialization
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Health Check Routes
app.get('/api', (req, res) => res.json({ message: "Velvet Horizon API is running!" }));
app.get('/', (req, res) => res.json({ message: "Velvet Horizon API is running!" }));

// Routes
app.use('/api/listings', listingRouter);
app.use('/api/users', userRouter);

// 404 Handler
app.all('*', (req, res, next) => {
    next(new ExpressError(404, "API Endpoint Not Found!"))
})

// Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went Wrong!' } = err;
    res.status(statusCode).json({ error: message });
})

module.exports = app;

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server Started on port ${PORT}`);
    });
}