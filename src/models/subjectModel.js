import { model, Schema } from 'mongoose';

const subjectSchema = new Schema({
  _id: {
    type: Schema.Types.UUID,
    required: true,
    immutable: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Subjects = model('subjects', subjectSchema);
export default Subjects;
