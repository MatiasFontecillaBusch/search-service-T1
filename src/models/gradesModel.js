import { model, Schema } from 'mongoose';

const gradeSchema = new Schema({
  _id: {
    type: Schema.Types.UUID,
    required: true,
    immutable: true,
  },
  name: String,
  value: Number,
  comment: String,
  subject: {
    type: Schema.Types.UUID,
    ref: 'subjects',
    required: true,
  },
  student: {
    type: Schema.Types.UUID,
    ref: 'students',
    required: true,
  },
});

const Grades = model('grades', gradeSchema);
export default Grades;
