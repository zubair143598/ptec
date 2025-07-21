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
  page.drawText(String(student.rollNo),       { x:  95, y: 540, size: size12, font, color: black });
  page.drawText(student.session,              { x: 95, y: 525, size: size12, font, color: black });
  page.drawText(student.name,                 { x: 230, y: 397.7, size: size12, font, color: black });
  page.drawText(student.fatherName,           { x: 585, y: 397.7, size: size12, font, color: black });
  page.drawText(student.registrationNumber,   { x: 208, y: 379.5, size: size12, font, color: black });
  page.drawText(student.institute,            { x: 520, y: 380, size: size12, font, color: black });
  page.drawText(student.duration,             { x: 220, y: 340, size: size12, font, color: black });
  page.drawText(student.certificateName,      { x: 270, y: 320, size: size12, font, color: black });
  page.drawText(student.conducted,            { x: 590, y: 300, size: size12, font, color: black });
  page.drawText(String(student.theoryMarks),  { x: 530, y: 270, size: size12, font, color: black });
  page.drawText(String(student.practicalMarks),{x: 580, y: 250, size: size12, font, color: black });
  page.drawText(String(student.obtainedMarks),{ x: 310, y: 225, size: size12, font, color: black });
  page.drawText(student.certificateIssue,     { x: 520, y: 190, size: size12, font, color: black });
  page.drawText(String(student.percentage)+"%",{ x: 120, y: 370, size: size12, font, color: black });
  page.drawText(student.grade,                { x: 210, y: 370, size: size12, font, color: black });

  /* 4. return bytes */
  return await pdfDoc.save();
}
