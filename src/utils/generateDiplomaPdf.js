import path from "path";
import { readFile } from "fs/promises";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

/**
 * Takes a student object and returns a Uint8Array containing
 * a fresh PDF with the student's data positioned on your template.
 */
export async function generateDiplomaPdf(student) {
  // 1. load the blank certificate you uploaded
  const templatePath = path.join(process.cwd(), "public", "templates", "certificate-1.pdf");
  const templateBytes = await readFile(templatePath);

  // 2. create the pdf-lib doc
  const pdfDoc   = await PDFDocument.load(templateBytes);
  const page     = pdfDoc.getPages()[0];
  const font     = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const size12   = 10;
  const black    = rgb(0, 0, 0);

  /* 3. write fields — adjust x/y until they line up exactly with your design */
  page.drawText(String(student.rollNo),       { x:  93, y: 540, size: size12, font, color: black });
  page.drawText(student.session,              { x: 93, y: 525, size: size12, font, color: black });
  page.drawText(student.name,                 { x: 230, y: 398, size: size12, font, color: black });
  page.drawText(student.fatherName,           { x: 585, y: 398, size: size12, font, color: black });
  page.drawText(student.registrationNumber,   { x: 185, y: 470, size: size12, font, color: black });
  page.drawText(student.certificateName,      { x: 120, y: 430, size: size12, font, color: black });
  page.drawText(student.conducted,            { x: 120, y: 410, size: size12, font, color: black });
  page.drawText(String(student.theoryMarks),  { x: 120, y: 390, size: size12, font, color: black });
  page.drawText(String(student.practicalMarks),{x: 210, y: 390, size: size12, font, color: black });
  page.drawText(String(student.obtainedMarks),{ x: 310, y: 390, size: size12, font, color: black });
  page.drawText(String(student.percentage)+"%",{ x: 120, y: 370, size: size12, font, color: black });
  page.drawText(student.grade,                { x: 210, y: 370, size: size12, font, color: black });
  page.drawText(student.certificateIssue,     { x: 310, y: 370, size: size12, font, color: black });

  /* 4. return bytes */
  return await pdfDoc.save();
}
