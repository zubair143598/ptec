import mongoose from "mongoose";

const DiplomaCertificateSchema = new mongoose.Schema({
  rollNo: Number,
  session: { type: String, required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  institute: { type: String, required: true },
  certificateName: { type: String, required: true },
  conducted: { type: String, required: true },
  theoryMarks: { type: Number, required: true },
  practicalMarks: { type: Number, required: true },
  duration: { type: String, default: "3 Years" },
  totalMarks: { type: Number, required: true },
  obtainedMarks: Number,
  percentage: Number,
  grade: String,
  certificateIssue: { type: String, required: true, default: "" },
  serialNumber: { type: String, required: true, default: "" },
});

export default mongoose.models.DiplomaCertificate ||
  mongoose.model("DiplomaCertificate", DiplomaCertificateSchema);
