import mongoose from "mongoose";

const DiplomaCertificateSchema = new mongoose.Schema({
  rollNo: Number,
  session: String,
  name: String,
  fatherName: String,
  registrationNumber: String,
  institute: String,
  certificateName: String,
  conducted: String,
  theoryMarks: Number,
  practicalMarks: Number,
  duration: { type: String, default: "3 Years" },
  totalMarks: { type: Number, default: 3450 },
  obtainedMarks: Number,
  percentage: Number,
  grade: String,
  certificateIssue: { type: String, default: "" },
  certificateIssue: { type: String, required: true },
});

export default mongoose.models.DiplomaCertificate ||
  mongoose.model("DiplomaCertificate", DiplomaCertificateSchema);
