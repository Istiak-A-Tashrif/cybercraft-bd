const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  deleteMultipleContacts,
  downloadContactPdf,
  downloadContactsExcel,
  downloadMultipleContactsPdf,
} = require("../controllers/contacts");

const Contact = require("../models/Contact");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const { Roles } = require("../config/role");

// Apply protect middleware to all routes
router.use(protect);

router
  .route("/")
  .get(advancedResults(Contact), getContacts)
  .post(createContact)
  .delete(authorize(Roles.Admin), deleteMultipleContacts);

router
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(authorize(Roles.Admin), deleteContact);

// Routes that need admin authorization
router.use(authorize(Roles.Admin));

router.route("/excel").get(downloadContactsExcel);

router.route("/pdf").post(downloadMultipleContactsPdf);

router.route("/:id/pdf").get(downloadContactPdf);

module.exports = router;
