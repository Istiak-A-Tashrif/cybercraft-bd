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

// ✅ Protect all routes
router.use(protect);

// ✅ Routes for all authenticated users
router.route("/me").get(getCurrentUserContact);
router.route("/").post(createOrUpdateContact);

// ✅ Public (No Admin Required)
router.route("/excel").get(downloadContactsExcel);

// ✅ Routes that need admin authorization
router.route("/")
  .get(authorize(Roles.Admin), advancedResults(Contact), getContacts)
  .delete(authorize(Roles.Admin), deleteMultipleContacts);

router.route("/:id/pdf").get(authorize(Roles.Admin), downloadContactPdf);

router.route("/:id")
  .get(authorize(Roles.Admin), getContact)
  .put(authorize(Roles.Admin), updateContact)
  .delete(authorize(Roles.Admin), deleteContact);

router.route("/pdf").post(authorize(Roles.Admin), downloadMultipleContactsPdf);

module.exports = router;
