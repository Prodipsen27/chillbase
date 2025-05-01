const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model properly
const wrapAsync = require('../utils/wrapAsync');
const flash = require('connect-flash');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
// GET signup form
router.get('/signup', (req, res) => {
    res.render('users/signup.ejs');
});

// POST signup form submission
router.post('/signup', wrapAsync(async (req, res,next) => {

    try {
        const { username, email, password, confirmPassword } = req.body;
    const newUser = new User({email,username});
    const registeredUSer = await User.register(newUser,password);
    console.log(registeredUSer)
    req.login(registeredUSer,(err)=>{
        if (err) {
           return next(err)
        }
        req.flash('success', 'Welcome to chillbase')
    res.redirect('/listings')
    })
    
    } catch (error) {
        req.flash('try again!', error.message)
        res.redirect('/signup')
    }
    
    // try {
    //     const { username, email, password, confirmPassword } = req.body;

    //     // Basic validation
    //     if (!username || !email || !password || !confirmPassword) {
    //         return res.status(400).send('All fields are required.');
    //     }

    //     if (password !== confirmPassword) {
    //         return res.status(400).send('Passwords do not match.');
    //     }

    //     // Create and save new user
    //     const newUser = new User({ username, email, password });
    //     await newUser.save();

    //     res.redirect('/login'); // After successful signup, redirect to login page (or wherever you want)
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send('Something went wrong. Please try again.');
    // }
}));


router.get('/login', (req, res) => {
    const error = req.flash('error');
    res.render('users/login.ejs', { error });
});

router.post('/login',saveRedirectUrl,passport.authenticate('local',
    {failureRedirect:'/login',failureFlash:true}), 
    async(req, res) => {
    // res.send('welcome')
    req.flash('success', 'Welcome back to Chillbase')
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl)
});

router.get('/logout',(req, res)=>{
    req.logOut((err)=>{
        if (err) {
            next(err);
        }
            req.flash('success','Logged Out!');
            res.redirect('/listings');
        
    })
})

module.exports = router;
