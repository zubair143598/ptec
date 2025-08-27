import path from "path";
import { readFile } from "fs/promises";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

export async function generateDiplomaPdf(student) {
  // 1. Load the blank certificates
  const templatePath = path.join(process.cwd(), "public", "templates", "certificate-1.pdf");
  const templatePath2 = path.join(process.cwd(), "public", "templates", "certificate-1-back.pdf");
  const templateBytes = await readFile(templatePath);
  const templateBytes2 = await readFile(templatePath2);

  // 2. Load into PDF docs
  const pdfDoc1 = await PDFDocument.load(templateBytes);
  const pdfDoc2 = await PDFDocument.load(templateBytes2);

  // 3. Create a new doc to merge both
  const finalPdf = await PDFDocument.create();

  // Copy pages from first doc
  const [page1] = await finalPdf.copyPages(pdfDoc1, [0]);
  finalPdf.addPage(page1);

  // Copy pages from second doc
  const [page2] = await finalPdf.copyPages(pdfDoc2, [0]);
  finalPdf.addPage(page2);

  // 4. Embed font
  const font = await finalPdf.embedFont(StandardFonts.HelveticaBold);
  
  const size12 = 10;
  const black = rgb(0, 0, 0);

  // 5. Draw on page1
  page1.drawText(String(student.rollNo),       { x: 97, y: 537, size: size12, font, color: black });
  page1.drawText(student.session,              { x: 103, y: 522.5, size: size12, font, color: black });
  page1.drawText(student.serialNumber || "",         { x: 700, y: 527, size: size12, font, color: black });
  page1.drawText(student.name,                 { x: 230, y: 397.7, size: size12, font, color: black });
  page1.drawText(student.fatherName,           { x: 570, y: 397.7, size: size12, font, color: black });
  page1.drawText(student.registrationNumber,   { x: 165, y: 379, size: size12, font, color: black });
  page1.drawText(student.institute,            { x: 430, y: 379, size: size12, font, color: black });
  page1.drawText(student.duration,             { x: 200, y: 340, size: size12, font, color: black });
  page1.drawText(student.certificateName,      { x: 250, y: 322, size: size12, font, color: black });
  page1.drawText(student.conducted,            { x: 590, y: 305, size: size12, font, color: black });
  page1.drawText(String(student.theoryMarks),  { x: 425, y: 284, size: size12, font, color: black });
  page1.drawText(String(student.practicalMarks),{x: 645, y: 284, size: size12, font, color: black });
  page1.drawText(student.certificateIssue,     { x: 484, y: 246, size: size12, font, color: black });
  page1.drawText(String(student.totalMarks),   { x: 120, y: 183, size: size12, font, color: black });
  page1.drawText(String(student.obtainedMarks),{ x: 310, y: 183, size: size12, font, color: black });
  page1.drawText(String(student.percentage)+"%",{ x: 480, y: 183, size: size12, font, color: black });
  page1.drawText(student.grade,                { x: 645, y: 183, size: size12, font, color: black });

  // 6. Draw on page2
// Build verification URL
const verificationUrl = `https://psdec.com/verification?q=${student.rollNo}`;

// Generate QR as Data URL with custom color
const qrDataUrl = await QRCode.toDataURL(verificationUrl, { 
  margin: 1,
  color: {
    dark: "#1C4A7E",   // QR dots color
    light: "#FFFFFF00" // background color (transparent), or use "#FFFFFF" for white
  }
});

// Convert to bytes and embed
const qrImageBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");
const qrImage = await finalPdf.embedPng(qrImageBytes);

// Decide size and position
const qrSize = 80; // px in PDF points
const qrX = 665;   // adjust to place above text
const qrY = 470;   // slightly higher than your text y=427

// Draw QR on PDF
page2.drawImage(qrImage, {
  x: qrX,
  y: qrY,
  width: qrSize,
  height: qrSize,
});

  page2.drawText(String("Scan QR Code to verify"),  { x: 665, y: 455, size: 12, font, color: black });
  page2.drawText(String("For Online Verification"),  { x: 665, y: 441, size: 12, font, color: black });
  page2.drawText(String("https://psdec.com"),  { x: 665, y: 427, size: 12, font, color: black });
  page2.drawText(`code No : ${student.rollNo}`, {
  x: 665,
  y: 411,
  size: 12,
  font,
  color: rgb(0.11, 0.29, 0.49), // "#1C4A7E" in pdf-lib requires rgb()
});
  page2.drawText(String(student.rollNo),   { x: 152, y: 60, size: size12, font, color: black });


  // 7. Save final PDF with both pages
  return await finalPdf.save();
}
