import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  totalTheory: { type: Number, required: true },
  totalPractical: { type: Number, required: true },
  obtainedTheory: { type: Number, required: true },
  obtainedPractical: { type: Number, required: true }
});

const studentSchema = new mongoose.Schema({
  registrationNo: { type: String, required: true, unique: true },
  session: { type: String, required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  institute: { type: String, required: true },
  certificateName: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  courses: [courseSchema],
  totalMaxMarks: { type: Number },
  totalTheoryObtained: { type: Number },
  totalPracticalObtained: { type: Number },
  totalObtained: { type: Number }
});

// Pre-save hook to calculate totals
studentSchema.pre('save', function(next) {
  this.totalTheoryObtained = this.courses.reduce((sum, course) => sum + course.obtainedTheory, 0);
  this.totalPracticalObtained = this.courses.reduce((sum, course) => sum + course.obtainedPractical, 0);
  this.totalObtained = this.totalTheoryObtained + this.totalPracticalObtained;
  this.totalMaxMarks = this.courses.reduce((sum, course) => sum + course.totalTheory + course.totalPractical, 0);
  next();
});

export default mongoose.models.FirstYear || mongoose.model('FirstYear', studentSchema);