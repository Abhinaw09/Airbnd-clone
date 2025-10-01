const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const Expresserror = require("../utils/Expresserror.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const ListingController = require("../controllers/listings.js");

// Route to show all listings & create new listing
router
  .route("/")
  .get(wrapAsync(ListingController.index))
  // Corrected upload: just 'image', not 'listing[image]'
  .post(isLoggedIn, upload.single("image"), wrapAsync(ListingController.createListing));

// Route to render "new listing" form
router.get("/new", isLoggedIn, ListingController.renderNewForm);

// Show, update, delete, edit routes
router
  .route("/:id")
  .get(wrapAsync(ListingController.showListing))
  .put(isLoggedIn, isOwner, upload.single("image"), wrapAsync(ListingController.updateListing))
  .delete(isLoggedIn, isOwner, ListingController.destoryListing);

// Edit form route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm));

module.exports = router;
