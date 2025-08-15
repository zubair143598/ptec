// utils/downloadCertificate.js
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// Helper function to download blob
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function generateStudentCertificate(student) {
  // Load certificate template
  const existingPdfBytes = await fetch("/templates/1st year.pdf").then(res =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const page = pages[0];
  const { width } = page.getSize();

  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold); 

  const drawText = (text, x, y, size = 9) => {
    page.drawText(String(text), {
      x,
      y,
      size,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
  };

  // ---------- NEW: formatting helpers ----------
  const parseNumOrNull = (v) => {
    // treat null/undefined/empty-string as "no value"
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const displayNum = (v) => {
    // If value is exactly numeric 0 -> show '-'
    // If value is missing -> show empty string
    // Otherwise show the value as string
    const n = parseNumOrNull(v);
    if (n === null) return "";
    return n === 0 ? "-" : String(n);
  };
  // -------------------------------------------
const certFontSize = 12; // or bigger if you want
const certText = student.certificateName || "";
const certTextWidth = boldFont.widthOfTextAtSize(certText, certFontSize);
const certX = (width - certTextWidth) / 2;

page.drawText(certText, {
  x: certX,
  y: 496,
  size: certFontSize,
  font: boldFont,
  color: rgb(0, 0, 0),
});

  drawText(` ${student.registrationNo}`, 106, 470); //Reg No:
  drawText(` ${student.session}`, 310, 470); //Session:
  drawText(`${student.rollNo}`, 250, 451);
  drawText(` ${student.name}`, 150, 430); //Name:
  drawText(`${student.fatherName}`, 150, 413); //Father Name:
  drawText(` ${student.institute}`, 150, 396); //Institute:
  drawText(`${student.totalTheoryObtained}`, 440, 117); 
  drawText(` ${student.totalPracticalObtained}`, 482, 117);
  drawText(`${student.totalObtained}`, 520, 117); 
  // drawText(` ${student.totalPracticalObtained}`, 150, 396);

  // Course Table header (fix: pass text first, then x,y)
  // drawText("Course Name", 50, 355);
  // drawText("Total Theory", 150, 355);
  // drawText("Total Practical", 230, 355);
  // drawText("Obtained Theory", 330, 355);
  // drawText("Obtained Practical", 440, 355);
  // drawText("Total Obt", 560, 355);

  // List of courses
  student.courses.forEach((course, idx) => {
    const y = 350 - (idx + 1) * 21;
    drawText(course.courseName || "", 100, y);

    // Use displayNum for each numeric field so 0 -> '-'
    drawText(
  `${displayNum(course.totalTheory)}/${displayNum(course.totalPractical)}`,
  370,
  y
);
    drawText(displayNum(course.obtainedTheory), 440, y);
    drawText(displayNum(course.obtainedPractical), 485, y);

    // For the sum: if both obtained fields are missing -> show blank
    const a = parseNumOrNull(course.obtainedTheory);
    const b = parseNumOrNull(course.obtainedPractical);
    let sumDisplay = "";
    if (a !== null || b !== null) {
      const sum = (a || 0) + (b || 0);
      sumDisplay = sum === 0 ? "-" : String(sum);
    }
    drawText(sumDisplay, 520, y);
  });

  // Generate PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  downloadBlob(blob, `${student.name.replaceAll(" ", "_")}_Certificate.pdf`);
}
