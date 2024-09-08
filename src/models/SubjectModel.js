import { model, Schema } from 'mongoose';

const subjectSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    inmutable: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Subjects = model('subjects', subjectSchema);
export default Subjects;
