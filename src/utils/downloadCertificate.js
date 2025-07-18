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
  const existingPdfBytes = await fetch("/templates/certificate-1.pdf").then(res =>
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
  drawText(`Name: ${student.name}`, 50, 400);
  drawText(`Father Name: ${student.fatherName}`, 150, 400);
  drawText(`Reg No: ${student.registrationNo}`, 230, 400);
  drawText(`Roll No: ${student.rollNo}`, 330, 400);
  drawText(`Session: ${student.session}`, 440, 400);
  drawText(`Institute: ${student.institute}`, 500, 400);
  drawText(`Year: ${student.year}`, 550, 400);

  // Course Table header
  let startY = 580;
  drawText("Course Name", 50, startY);
  drawText("Total Theory", 150, startY);
  drawText("Total Practical", 230, startY);
  drawText("Obtained Theory", 330, startY);
  drawText("Obtained Practical", 440, startY);
  drawText("Total Obt", 560, startY);

  // List of courses
  student.courses.forEach((course, idx) => {
    const y = startY - (idx + 1) * 20;
    drawText(course.courseName, 50, y);
    drawText(course.totalTheory, 150, y);
    drawText(course.totalPractical, 230, y);
    drawText(course.obtainedTheory, 330, y);
    drawText(course.obtainedPractical, 440, y);
    drawText(
      course.obtainedTheory + course.obtainedPractical,
      560,
      y
    );
  });

  // Generate PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  downloadBlob(blob, `${student.name.replaceAll(" ", "_")}_Certificate.pdf`);
}
