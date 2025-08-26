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
  // second year marks
  secondYearTotalMarks: { type: Number, default: 0 },
  secondYearTheoryObtained: { type: Number, default: 0 },
  secondYearPracticalObtained: { type: Number, default: 0 },
  secondYearTotalObtained: { type: Number, default: 0 },
  // third year marks
  totalMaxMarks: { type: Number },
  totalTheoryObtained: { type: Number },
  totalPracticalObtained: { type: Number },
  totalObtained: { type: Number },
  // Combined marks
  grandTotalObtained: { type: Number }
});

studentSchema.pre('save', function(next) {
  // second year totals
  this.secondYearTotalObtained = this.secondYearTheoryObtained + this.secondYearPracticalObtained;
  
  // third year totals
  this.totalTheoryObtained = this.courses.reduce((sum, course) => sum + course.obtainedTheory, 0) + this.secondYearTheoryObtained;
  this.totalPracticalObtained = this.courses.reduce((sum, course) => sum + course.obtainedPractical, 0) + this.secondYearPracticalObtained;
  this.totalObtained = this.totalTheoryObtained + this.totalPracticalObtained;
  this.totalMaxMarks = this.courses.reduce((sum, course) => sum + course.totalTheory + course.totalPractical, 0) + this.secondYearTotalMarks;
  
  // Grand total (second year + third year)
  this.grandTotalObtained = this.secondYearTotalObtained + this.totalObtained;
  
  next();
});

export default mongoose.models.ThirdYear ||
  mongoose.model("ThirdYear", studentSchema);
