// app/api/second-year/route.js
import { connectDB } from '@/lib/db';
import SecondYear from '@/model/SecondYear';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const students = await SecondYear.find().sort({ rollNo: 1 });
  return NextResponse.json(students);
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Calculate first year totals
    const firstYearTotalObtained = (body.firstYearTheoryObtained || 0) + (body.firstYearPracticalObtained || 0);

    const studentData = {
      ...body,
      firstYearTotalObtained,
    };

    const student = new SecondYear(studentData);
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
  try {
    await connectDB();
    const { id, ...updateData } = await request.json();

    const courses = updateData.courses || [];
    const firstYearTheory = updateData.firstYearTheoryObtained || 0;
    const firstYearPractical = updateData.firstYearPracticalObtained || 0;
    
    const totalTheory = courses.reduce((sum, c) => sum + (c.totalTheory || 0), 0);
    const totalPractical = courses.reduce((sum, c) => sum + (c.totalPractical || 0), 0);
    const obtainedTheory = courses.reduce((sum, c) => sum + (c.obtainedTheory || 0), 0) + firstYearTheory;
    const obtainedPractical = courses.reduce((sum, c) => sum + (c.obtainedPractical || 0), 0) + firstYearPractical;

    const recalculatedData = {
      ...updateData,
      firstYearTotalObtained: firstYearTheory + firstYearPractical,
      totalMaxMarks: totalTheory + totalPractical,
      totalTheoryObtained: obtainedTheory,
      totalPracticalObtained: obtainedPractical,
      totalObtained: obtainedTheory + obtainedPractical,
      grandTotalObtained: firstYearTheory + firstYearPractical + obtainedTheory + obtainedPractical
    };

    const updatedStudent = await SecondYear.findByIdAndUpdate(
      id,
      recalculatedData,
      { new: true }
    );
    
    if (!updatedStudent) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { error: 'Failed to update student', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();

    const deletedStudent = await SecondYear.findByIdAndDelete(id);
    if (!deletedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { error: 'Failed to delete student', details: error.message },
      { status: 500 }
    );
  }
}