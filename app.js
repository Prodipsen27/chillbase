
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
    
}

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');

const LocalStrategy = require('passport-local');
const User = require('./models/user.js');


const path =  require ('path');
const methodOverride =  require('method-override');
const ExpressError =  require('./utils/ExpressError.js');
// const wrapAsync =  require('./utils/wrapAsync.js');
// const {listingSchema}=  require('./schema.js');
const {reviewSchema}=  require('./schema.js')
const listingRouter = require('./routes/listing.js');
const userRouter = require('./routes/user.js');
const { error } = require('console');
ejsMate = require('ejs-mate')

const app = express();
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('ejs', ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'/public')))

main()
    .then(()=>{
        console.log('Connected Chill-Base');
    }).catch((err)=>{console.log(err)});

async function main() {
    await mongoose.connect(process.env.DB_URL);
}
const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    crypto: 'process.env.SECRET',
    touchAfter:  24*3600
});

store.on('error',()=>{
    console.log('error')
})
const sessionOptions = {
    store,
    secret: 'process.env.SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 *60 * 1000,
        maxAge: 7 * 24 * 60 *60 * 1000,
    }
};




// app.get('/',(req,res)=>{res.send('Root.')});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// app.get('/demoUser',async (req, res)=>{
//     let fakeUser = new User({
//         email: 'student@gmail.com',
//         username: 'delta-student',
//     })

//     let registeredUSer = await User.register(fakeUser,'harekrsna');
//     res.send(registeredUSer)
// })

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    res.locals.currentUser = req.user;
    // res.locals.currentUserReview = req.user;
    console.log(res.locals.success)
    next();
})

app.use('/listings',listingRouter);
app.use('/',userRouter);

// app.get('/default', async (req,res)=>{
    
//     let sampleListing = new Listing({
//         title: 'My new Villa',
//         description:'kuch bhi',
//         price:1700,
//         location:'Mayapur, Navadwip',
//         Country: 'Bharat'
//     });
//     await sampleListing.save();
//     console.log('sample working')
//     res.send('working');

// });

app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"))
})

app.use((err,req,res,next)=>{
    let {statusCode=500, message = 'Something went Wrong!'} = err;
    res.render('error.ejs',{statusCode,message});
    // res.status(statusCode).send(message);
    // res.send("Something went wrong!")
})

app.listen(8080,() => {
    console.log('Server Started!');
    
});