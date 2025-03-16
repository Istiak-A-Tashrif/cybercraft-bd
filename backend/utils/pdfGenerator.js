const PDFDocument = require('pdfkit');

exports.generatePDF = async (contact, isMultiple = false) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      
      // Add header with logo and title
      doc.fontSize(20).text('Contact Form Submission', { align: 'center' });
      doc.moveDown();
      
      if (isMultiple) {
        // Multiple contacts
        const contacts = contact;
        
        contacts.forEach((item, index) => {
          // Add a page break after the first contact
          if (index > 0) {
            doc.addPage();
          }
          
          doc.fontSize(16).text(`Contact #${index + 1}`, { underline: true });
          doc.moveDown();
          
          doc.fontSize(12).text(`Full Name: ${item.fullName}`);
          doc.text(`Email: ${item.email}`);
          doc.text(`Status: ${item.status}`);
          doc.text(`Submitted on: ${item.createdAt.toLocaleString()}`);
          doc.moveDown();
          
          doc.fontSize(14).text('Message:', { underline: true });
          doc.fontSize(12).text(item.message);
          doc.moveDown();
          
          // Add divider except for last item
          if (index < contacts.length - 1) {
            doc.moveTo(50, doc.y)
               .lineTo(550, doc.y)
               .stroke();
            doc.moveDown();
          }
        });
        
      } else {
        // Single contact
        doc.fontSize(12).text(`Full Name: ${contact.fullName}`);
        doc.text(`Email: ${contact.email}`);
        doc.text(`Status: ${contact.status}`);
        doc.text(`Submitted on: ${contact.createdAt.toLocaleString()}`);
        doc.moveDown();
        
        doc.fontSize(14).text('Message:', { underline: true });
        doc.fontSize(12).text(contact.message);
      }
      
      // Add footer
      doc.moveDown(2);
      const footerText = `Generated on ${new Date().toLocaleString()}`;
      doc.fontSize(10).text(footerText, { align: 'center' });
      
      doc.end();
      
    } catch (error) {
      reject(error);
    }
  });
};