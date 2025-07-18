import { z } from 'zod';

export const courseSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  totalTheory: z.number().min(0, "Must be 0 or greater"),
  totalPractical: z.number().min(0, "Must be 0 or greater"),
  obtainedTheory: z.number().min(0, "Must be 0 or greater"),
  obtainedPractical: z.number().min(0, "Must be 0 or greater")
});

export const studentFormSchema = z.object({
  session: z.string().min(1, "Session is required"),
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  institute: z.string().min(1, "Institute is required"),
  year: z.enum(['1st Year', '2nd Year']).optional(),
  courses: z.array(courseSchema).min(1, "At least one course is required")
});