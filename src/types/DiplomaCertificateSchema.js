import { z } from "zod";

export const DiplomaCertificateSchema = z.object({
  session: z.string().min(1),
  name: z.string().min(1),
  fatherName: z.string().min(1),
  registrationNumber: z.string().min(1),
  institute: z.string().min(1),
  certificateName: z.string().min(1),
  conducted: z.string().min(1),
  theoryMarks: z.coerce.number().min(0),
  practicalMarks: z.coerce.number().min(0),
  certificateIssue: z.string().min(1),
   serialNumber: z.string().min(1),
  totalMarks: z.coerce.number().min(0),
});
