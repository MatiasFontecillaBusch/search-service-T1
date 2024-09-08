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
    type: Schema.Types.ObjectId,
    ref: 'subjects',
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'students',
    required: true,
  },
});

const Grade = model('grades', gradeSchema);
export default Grade;
