import { connectDB } from '../../../lib/db';
import FirstYear from '../../../model/FirstYear';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const students = await FirstYear.find().sort({ rollNo: 1 });
  return NextResponse.json(students);
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();

    const studentData = {
      ...body,
    };

    const student = new FirstYear(studentData);
    await student.save();

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("POST /api/first-year Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(request) {
  await connectDB();
  const { id, ...updateData } = await request.json();

  // Recalculate the totals based on the new courses array
  const courses = updateData.courses || [];
  const totalTheory = courses.reduce((sum, c) => sum + (c.totalTheory || 0), 0);
  const totalPractical = courses.reduce((sum, c) => sum + (c.totalPractical || 0), 0);
  const obtainedTheory = courses.reduce((sum, c) => sum + (c.obtainedTheory || 0), 0);
  const obtainedPractical = courses.reduce((sum, c) => sum + (c.obtainedPractical || 0), 0);

  const recalculatedData = {
    ...updateData,
    totalMaxMarks: totalTheory + totalPractical,
    totalTheoryObtained: obtainedTheory,
    totalPracticalObtained: obtainedPractical,
    totalObtained: obtainedTheory + obtainedPractical,
  };

  try {
    const updatedStudent = await FirstYear.findByIdAndUpdate(
      id,
      recalculatedData,
      { new: true }
    );
    if (!updatedStudent) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json(updatedStudent);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json();

  try {
    const deletedStudent = await FirstYear.findByIdAndDelete(id);
    if (!deletedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}