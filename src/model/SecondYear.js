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
  // First year marks
  firstYearTotalMarks: { type: Number, default: 0 },
  firstYearTheoryObtained: { type: Number, default: 0 },
  firstYearPracticalObtained: { type: Number, default: 0 },
  firstYearTotalObtained: { type: Number, default: 0 },
  // Second year marks
  totalMaxMarks: { type: Number },
  totalTheoryObtained: { type: Number },
  totalPracticalObtained: { type: Number },
  totalObtained: { type: Number },
  // Combined marks
  grandTotalObtained: { type: Number }
});

studentSchema.pre('save', function(next) {
  // First year totals
  this.firstYearTotalObtained = this.firstYearTheoryObtained + this.firstYearPracticalObtained;
  
  // Second year totals
  this.totalTheoryObtained = this.courses.reduce((sum, course) => sum + course.obtainedTheory, 0) + this.firstYearTheoryObtained;
  this.totalPracticalObtained = this.courses.reduce((sum, course) => sum + course.obtainedPractical, 0) + this.firstYearPracticalObtained;
  this.totalObtained = this.totalTheoryObtained + this.totalPracticalObtained;
  this.totalMaxMarks = this.courses.reduce((sum, course) => sum + course.totalTheory + course.totalPractical, 0) + this.firstYearTotalMarks;
  
  // Grand total (first year + second year)
  this.grandTotalObtained = this.firstYearTotalObtained + this.totalObtained;
  
  next();
});

export default mongoose.models.SecondYear || mongoose.model('SecondYear', studentSchema);