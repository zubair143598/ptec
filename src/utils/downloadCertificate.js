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

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const drawText = (text, x, y, size = 12) => {
    page.drawText(String(text), {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  // Draw student main info
  drawText(` ${student.registrationNo}`, 110, 527); //Reg No:
  drawText(` ${student.session}`, 310, 530); //Session:
  drawText(` ${student.name}`, 120, 502); //Name:
  drawText(`${student.fatherName}`, 315, 502); //Father Name: 
  drawText(` ${student.institute}`, 120, 484);
  drawText(`${student.year}`, 120, 451);
  drawText(`${student.rollNo}`, 250, 451);
  drawText(` ${student.session}`, 350, 451);

  // Course Table header
  let startY = 410;
  drawText( 50, startY); //"Course Name"
  drawText( 150, startY); //"Total Theory",
  drawText( 230, startY); //"Total Practical",
  drawText( 330, startY); //"Obtained Theory",
  drawText( 440, startY); //"Obtained Practical",
  drawText( 560, startY); //"Total Obt",

  // List of courses
  student.courses.forEach((course, idx) => {
    const y = startY - (idx + 1) * 25 ;
    // drawText(course.courseName, 50, y);
    // drawText(course.totalTheory, 150, y);
    // drawText(course.totalPractical, 230, y);
    drawText(course.obtainedTheory, 370, y);
    drawText(course.obtainedPractical, 400, y);
    drawText(
      course.obtainedTheory + course.obtainedPractical,
      440,
      y
    );
  });

  // Generate PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  downloadBlob(blob, `${student.name.replaceAll(" ", "_")}_Certificate.pdf`);
}
