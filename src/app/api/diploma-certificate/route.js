import { NextResponse } from "next/server";
import { DiplomaCertificateSchema } from "../../../types/DiplomaCertificateSchema";
import DiplomaCertificate from "../../../model/DiplomaCertificate.model";
import {connectDB} from "../../../lib/db"

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const parsed = DiplomaCertificateSchema.parse(body);

    const { theoryMarks, practicalMarks } = parsed;
    const obtainedMarks = theoryMarks + practicalMarks;
    const percentage = Number(((obtainedMarks / 3450) * 100).toFixed(2));

    let grade = "F";
    if (percentage >= 80) grade = "A+";
    else if (percentage >= 70) grade = "A";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else if (percentage >= 40) grade = "D";
    else if (percentage >= 33) grade = "E";

    const last = await DiplomaCertificate.findOne({}, {}, { sort: { rollNo: -1 } });
    const newRollNo = last ? last.rollNo + 1 : 15033;

    const doc = await DiplomaCertificate.create({
      ...parsed,
      rollNo: newRollNo,
      duration: "3 Years",
      totalMarks: 3450,
      obtainedMarks,
      percentage,
      grade,
    });

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const students = await DiplomaCertificate.find().sort({ rollNo: 1 });
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message + "why like this" }, { status: 500 });
  }
}

