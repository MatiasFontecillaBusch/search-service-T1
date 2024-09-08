import { model, Schema } from 'mongoose';

const studentSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    inmutable: true,
  },
  name: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  restrictionsIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'restrictions',
    },
  ],
});

const Students = model('students', studentSchema);
export default Students;
