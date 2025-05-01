const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash('warning','you must be logged in');
        return res.redirect('/login')
     }
     next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id}=req.params;
     // const listing = await Listing.findById(id);
     let listing = await Listing.findById(id);

     if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash('warning', 'You do not have the permission to proceed.');
        return res.redirect(`/listings/${id}`);
        
     }
    next();
}
module.exports.reviewAuth = async (req, res, next) => {
    let {id,reviewId}=req.params;
     // const listing = await Listing.findById(id);
     let review = await Review.findById(reviewId);

     if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash('warning', 'You do not have the permission to proceed.');
        return res.redirect(`/listings/${id}`);
        
     }
    next();
}