const Contact = require("../models/Contact");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { generatePDF } = require("../utils/pdfGenerator");
const { generateExcel } = require("../utils/excelGenerator");
const { sendContactEmail } = require("../utils/emailService");
const mongoose = require("mongoose");

exports.createOrUpdateContact = asyncHandler(async (req, res, next) => {
  const { fullName, email, message } = req.body;

  let contact = await Contact.findOne({ user: req.user.id });

  if (contact) {
    contact = await Contact.findOneAndUpdate(
      { user: req.user.id },
      { fullName, email, message },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: contact,
      message: "Contact information updated successfully",
    });
  } else {
    contact = await Contact.create({
      fullName,
      email,
      message,
      user: req.user.id,
    });
 
    const pdfBuffer = await generatePDF(contact);

    await sendContactEmail({
      to: process.env.EMAIL_TO,
      subject: "New Contact Form Submission",
      text: `New contact form submission from ${fullName} (${email})`,
      attachments: [
        {
          filename: `contact_${contact._id}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: "Contact information submitted successfully",
    });
  }
});

exports.getCurrentUserContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findOne({ user: req.user.id });

  if (!contact) {
    return res.status(200).json({
      success: true,
      data: null,
      message: "No contact information found",
    });
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

exports.getContacts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

exports.updateContact = asyncHandler(async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  }

  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: contact,
  });
});

exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.deleteMultipleContacts = asyncHandler(async (req, res, next) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return next(
      new ErrorResponse("Please provide an array of IDs to delete", 400)
    );
  }

  await Contact.deleteMany({ _id: { $in: ids } });

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.downloadContactPdf = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  }

  const pdfBuffer = await generatePDF(contact);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=contact_${contact._id}.pdf`
  );
  res.send(pdfBuffer);
});

exports.downloadContactsExcel = asyncHandler(async (req, res, next) => {
  try {
    let query = {};

    if (req.query.ids) {
      let ids = req.query.ids.split(",");
      
      ids = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));

      if (ids.length > 0) {
        query._id = { $in: ids };
      }
    }

    const contacts = await Contact.find(query);

    if (contacts.length === 0) {
      return next(new ErrorResponse("No contacts found", 404));
    }

    const excelBuffer = await generateExcel(contacts);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=contacts.xlsx");
    res.send(excelBuffer);
  } catch (error) {
    console.error("Error:", error);
    next(new ErrorResponse("Internal Server Error", 500));
  }
});


exports.downloadMultipleContactsPdf = asyncHandler(async (req, res, next) => {
  const { ids } = req.body;

  let query = {};
  if (ids && Array.isArray(ids) && ids.length > 0) {
    query = { _id: { $in: ids } };
  }

  const contacts = await Contact.find(query);

  if (contacts.length === 0) {
    return next(new ErrorResponse("No contacts found", 404));
  }

  const pdfBuffer = await generatePDF(contacts, true);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=contacts.pdf");
  res.send(pdfBuffer);
});
