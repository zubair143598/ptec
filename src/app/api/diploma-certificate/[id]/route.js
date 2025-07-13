import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import DiplomaCertificate from "../../../../model/DiplomaCertificate.model";
import { DiplomaCertificateSchema } from "../../../../types/DiplomaCertificateSchema";

/* ───────────────────────────────────────── GET one ────────────────────────── */
export async function GET(_, { params }) {
  try {
    await connectDB();
    const doc = await DiplomaCertificate.findById(params.id);
    if (!doc) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: doc });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/* ───────────────────────────────────────── UPDATE ─────────────────────────── */
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    /* Allow partial updates but keep validation */
    const parsed = DiplomaCertificateSchema.partial().parse(body);

    /* Get the current document to fill missing fields */
    const current = await DiplomaCertificate.findById(params.id);
    if (!current) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    /* Use existing marks unless new ones are supplied */
    const theory = parsed.theoryMarks ?? current.theoryMarks;
    const practical = parsed.practicalMarks ?? current.practicalMarks;

    /* Recalculate derived values */
    const obtainedMarks = theory + practical;
    const percentage = Number(((obtainedMarks / 3450) * 100).toFixed(2));

    let grade = "F";
    if (percentage >= 80) grade = "A+";
    else if (percentage >= 70) grade = "A";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else if (percentage >= 40) grade = "D";
    else if (percentage >= 33) grade = "E";

    const updated = await DiplomaCertificate.findByIdAndUpdate(
      params.id,
      {
        ...parsed,
        theoryMarks: theory,           // guarantee numbers are saved
        practicalMarks: practical,
        obtainedMarks,
        percentage,
        grade,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

/* ───────────────────────────────────────── DELETE (optional) ──────────────── */
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await DiplomaCertificate.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
