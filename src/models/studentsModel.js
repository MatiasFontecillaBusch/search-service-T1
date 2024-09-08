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
  },
  restrictionsIds: [
    {
      type: String,
      ref: 'restrictions',
    },
  ],
});

const Students = model('students', studentSchema);
export default Students;
