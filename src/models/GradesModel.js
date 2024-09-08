import { model, Schema } from 'mongoose';

const gradeSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    inmutable: true,
  },
  name: String,
  value: Number,
  comment: String,
  subjectId: {
    type: String,
    ref: 'subjects',
    required: true,
  },
  studentId: {
    type: String,
    ref: 'students',
    required: true,
  },
});

const Grades = model('grades', gradeSchema);
export default Grades;
