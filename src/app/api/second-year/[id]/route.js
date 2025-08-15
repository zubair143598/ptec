import { connectDB } from '../../../../lib/db';
import SecondYear from '../../../../model/SecondYear';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;
  const body = await request.json();
  
  const updatedStudent = await SecondYear.findByIdAndUpdate(id, body, { new: true });
  
  if (!updatedStudent) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
  
  return NextResponse.json(updatedStudent);
}