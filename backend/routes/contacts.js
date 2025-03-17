const express = require("express");
const {
  getContacts,
  getContact,
  createOrUpdateContact,
  updateContact,
  deleteContact,
  deleteMultipleContacts,
  downloadContactPdf,
  downloadContactsExcel,
  downloadMultipleContactsPdf,
  getCurrentUserContact
} = require("../controllers/contacts");

const Contact = require("../models/Contact");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const { Roles } = require("../config/role");

// Apply protect middleware to all routes
router.use(protect);

// Routes for all authenticated users
router.route("/me")
  .get(getCurrentUserContact);

router.route("/")
  .post(createOrUpdateContact);

// Routes that need admin authorization for GET and DELETE
router.route("/")
  .get(authorize(Roles.Admin), advancedResults(Contact), getContacts)
  .delete(authorize(Roles.Admin), deleteMultipleContacts);

// Routes for getting contact by ID - admin only
router.route("/:id")
  .get(authorize(Roles.Admin), getContact)
  .put(authorize(Roles.Admin), updateContact)
  .delete(authorize(Roles.Admin), deleteContact);

// Routes that need admin authorization
router.use(authorize(Roles.Admin));

router.route("/excel").get(downloadContactsExcel);

router.route("/pdf").post(downloadMultipleContactsPdf);

router.route("/:id/pdf").get(downloadContactPdf);

module.exports = router;