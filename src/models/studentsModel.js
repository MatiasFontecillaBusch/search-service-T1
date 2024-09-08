import { model, Schema } from 'mongoose';

const studentSchema = new Schema({
  _id: {
    type: Schema.Types.UUID,
    required: true,
    immutable: true,
  },
  uuid: {
    type: String,
    required: true,
    immutable: true,
    unique: true,
  },
  name: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  restrictions: [
    {
      type: Schema.Types.UUID,
      ref: 'restrictions',
    },
  ],
});

studentSchema.virtual('grades', {
  ref: 'grades',
  localField: '_id',
  foreignField: 'student',
});

const Students = model('students', studentSchema);
export default Students;
