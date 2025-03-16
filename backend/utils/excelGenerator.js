const Excel = require('exceljs');

exports.generateExcel = async (contacts) => {
  return new Promise((resolve, reject) => {
    try {
      // Create workbook and worksheet
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Contacts');
      
      // Define columns
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Full Name', key: 'fullName', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Message', key: 'message', width: 50 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Created At', key: 'createdAt', width: 20 }
      ];
      
      // Add header style
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD3D3D3' }
      };
      
      // Add data
      contacts.forEach(contact => {
        worksheet.addRow({
          id: contact._id.toString(),
          fullName: contact.fullName,
          email: contact.email,
          message: contact.message,
          status: contact.status,
          createdAt: contact.createdAt.toLocaleString()
        });
      });
      
      // Format cells
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          row.eachCell({ includeEmpty: false }, cell => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          });
        }
      });
      
      // Write to buffer
      workbook.xlsx.writeBuffer().then(buffer => {
        resolve(buffer);
      });
      
    } catch (error) {
      reject(error);
    }
  });
};