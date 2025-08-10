import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateVerificationPDF(student) {
  try {
    const existingPdfBytes = await fetch("/templates/verification.pdf").then(res =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Load fonts
    const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const fontSize = 13;
    const textColor = rgb(0, 0, 0);

    // Paragraph parts: plain text & bold text separately
    const parts = [
      { text: "It is to verify that the Diploma/Certificate issued in favor of Mr/Miss/Mrs. ", font: fontNormal },
      { text: student.name, font: fontBold },
      { text: " S/D/W/O ", font: fontNormal },
      { text: student.fatherName, font: fontBold },
      { text: ", vide Registration No: ", font: fontNormal },
      { text: student.registrationNumber, font: fontBold },
      { text: " with Roll No: ", font: fontNormal },
      { text: student.rollNo.toString(), font: fontBold },
      { text: " trained and evaluated by ", font: fontNormal },
      { text: student.institute, font: fontBold },
      { text: " in the trade of ", font: fontNormal },
      { text: student.certificateName, font: fontBold },
      { text: " (3 Years) is found genuine according to our office record with the following transcript.", font: fontNormal }
    ];

    // Draw the paragraph with wrapping (manual wrapping since pdf-lib has no auto HTML layout)
    let x = 53;
    let y = 520;
    const maxWidth = 500;

    for (const part of parts) {
      const words = part.text.split(" ");
      for (let word of words) {
        const wordWidth = part.font.widthOfTextAtSize(word + " ", fontSize);
        if (x + wordWidth > 50 + maxWidth) { // wrap
      x = 50;
      y -= fontSize + 4 + 8; // <-- increased line height
    }
        firstPage.drawText(word + " ", {
          x,
          y,
          size: fontSize,
          font: part.font,
          color: textColor
        });
        x += wordWidth;
      }
    }

    // Marks data (unchanged)
    firstPage.drawText(`${student.totalMarks}`, { x: 385, y: 318, size: fontSize, font: fontNormal, color: textColor });
    firstPage.drawText(`${student.theoryMarks}`, { x: 385, y: 290, size: fontSize, font: fontNormal, color: textColor });
    firstPage.drawText(`${student.practicalMarks}`, { x: 385, y: 260, size: fontSize, font: fontNormal, color: textColor });
    firstPage.drawText(`${student.obtainedMarks}`, { x: 385, y: 230, size: fontSize, font: fontNormal, color: textColor });
    firstPage.drawText(`${student.percentage}%`, { x: 385, y: 200, size: fontSize, font: fontNormal, color: textColor });
    firstPage.drawText(`${student.grade}`, { x: 386, y: 170, size: fontSize, font: fontNormal, color: textColor });

    // Save & download
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `verification_${student.rollNo}.pdf`;
    a.click();
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}
