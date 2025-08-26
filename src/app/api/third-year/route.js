import { connectDB } from '../../../lib/db';
import ThirdYear from '../../../model/thirdYear';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const students = await ThirdYear.find().sort({ rollNo: 1 });
  return NextResponse.json(students);
}

export async function POST(request) {
    try {
    await connectDB();
    const body = await request.json();

    // Calculate second year totals
    const secondYearTotalObtained = (body.secondYearTheoryObtained || 0) + (body.secondYearPracticalObtained || 0);

    const studentData = {
      ...body,
      secondYearTotalObtained,
    };

    const student = new ThirdYear(studentData);
    await student.save();
    
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Failed to create student', details: error.message },
      { status: 500 }
    );
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
    year: '3rd Year', // Force 3rd Year
    totalMaxMarks: totalTheory + totalPractical,
    totalTheoryObtained: obtainedTheory,
    totalPracticalObtained: obtainedPractical,
    totalObtained: obtainedTheory + obtainedPractical,
  };

  try {
    const updatedStudent = await ThirdYear.findByIdAndUpdate(
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
    const deletedStudent = await ThirdYear.findByIdAndDelete(id);
    if (!deletedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}