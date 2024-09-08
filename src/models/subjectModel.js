import { model, Schema } from 'mongoose';

const subjectSchema = new Schema({
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
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subjects = model('subjects', subjectSchema);
export default Subjects;
