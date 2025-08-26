import { z } from "zod";

export const courseSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  totalTheory: z.number().min(0, "Must be 0 or greater"),
  totalPractical: z.number().min(0, "Must be 0 or greater"),
  obtainedTheory: z.number().min(0, "Must be 0 or greater"),
  obtainedPractical: z.number().min(0, "Must be 0 or greater"),
});

export const thirdYearFormSchema = z.object({
    session: z.string().min(1, "Session is required"),
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  rollNo: z.string().min(1, "Roll No is required"),
  registrationNo: z.string().min(1, "Registration No is required"),
  institute: z.string().min(1, "Institute is required"),
  certificateName: z.string().min(1, "Institute is required"),
  // second year marks
  secondYearTotalMarks: z.number().min(0, "Must be 0 or greater").default(0),
  secondYearTheoryObtained: z.number().min(0, "Must be 0 or greater").default(0),
  secondYearPracticalObtained: z.number().min(0, "Must be 0 or greater").default(0),
  courses: z.array(courseSchema).min(1, "At least one course is required")
});
