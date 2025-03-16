const express = require('express');
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  deleteMultipleContacts,
  downloadContactPdf,
  downloadContactsExcel,
  downloadMultipleContactsPdf
} = require('../controllers/contacts');

const Contact = require('../models/Contact');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Apply protect middleware to all routes
router.use(protect);

// Routes that need admin authorization
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResults(Contact), getContacts)
  .post(authorize('admin'), createContact)
  .delete(deleteMultipleContacts);

router
  .route('/excel')
  .get(downloadContactsExcel);

router
  .route('/pdf')
  .post(downloadMultipleContactsPdf);

router
  .route('/:id')
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

router
  .route('/:id/pdf')
  .get(downloadContactPdf);

module.exports = router;