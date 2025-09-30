const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const Expresserror = require("../utils/Expresserror.js");
const Listing =require("../models/listing.js");
const { isLoggedIn , isOwner} = require("../middleware.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});

const ListingController = require("../controllers/listings.js");
   
router.route("/")
// route to show all listings
.get( wrapAsync(ListingController.index))
  //create route 
.post(isLoggedIn, upload.single('listing[image]'), wrapAsync( ListingController.createListing));

 //new route
    router.get("/new",isLoggedIn,ListingController.renderNewForm);

router.route("/:id")
//show route
.get(wrapAsync( ListingController.showListing ))

//Update Route
.put(isLoggedIn, isOwner, upload.single('listing[image]'),wrapAsync( ListingController.updateListing))

//Delete route  
.delete( isLoggedIn,isOwner,ListingController.destoryListing);

    //Edit route
      router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.renderEditForm ));


         module.exports = router;