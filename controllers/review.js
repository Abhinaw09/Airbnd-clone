const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview =  async(req,res)=>{
         let listing = await Listing.findById(req.params.id);
         let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        console.log(newReview);
         listing.reviews.push(newReview);

         await newReview.save();
         await listing.save();

         console.log("new review is saved");
         req.flash("success","New Review is Created");
         res.redirect(`/listings/${listing._id}`);
     };

     module.exports.destoryReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review is Updated");
    res.redirect(`/listings/${id}`);
      };