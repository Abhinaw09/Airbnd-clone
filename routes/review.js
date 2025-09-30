const express= require("express");
const router = express.Router({ mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Expresserror = require("../utils/Expresserror.js");
const Review = require("../models/review.js");
const Listing =require("../models/listing.js");
const { isLoggedIn ,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");


     //Reviews
     router.post("/", isLoggedIn, reviewController.createReview);

     //Delete Review Route
   router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destoryReview));


      module.exports = router;