import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import DiplomaCertificate from "../../../../..//model/DiplomaCertificate.model";
import { generateDiplomaPdf } from "../../../../..//utils/generateDiplomaPdf";

export async function GET(_, { params }) {
  try {
    await connectDB();

    const student = await DiplomaCertificate.findById(params.id).lean();
    if (!student) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const pdfBytes = await generateDiplomaPdf(student);

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Diploma-${student.rollNo}.pdf"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
