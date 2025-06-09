import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentID: { 
    type: String,
    unique: true,
    required: true },
  studentName: String,
  course: String,
  presentDate: String
});

export default mongoose.model('Student', studentSchema);