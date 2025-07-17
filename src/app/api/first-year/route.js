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
  const body = await request.json();
  
  // Find the highest roll number to increment
  const lastStudent = await FirstYear.findOne().sort({ rollNo: -1 });
  const lastRollNo = lastStudent ? parseInt(lastStudent.rollNo.split('-')[1]) : 10532;
  const newRollNo = `R-${lastRollNo + 1}`;
  
  // Generate registration number
  const newRegNo = `PTEC/PITE/A246-61${70 + (lastRollNo + 1 - 10533)}`;
  
  const studentData = {
    ...body,
    rollNo: newRollNo,
    registrationNo: newRegNo,
    year: '1st Year'
  };

  const student = new FirstYear(studentData);
  await student.save();
  
  return NextResponse.json(student, { status: 201 });
}