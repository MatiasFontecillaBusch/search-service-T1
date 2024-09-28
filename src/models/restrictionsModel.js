// models/Restriction.js
import { model, Schema } from 'mongoose';

const restrictionSchema = new Schema({
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
  restrictionReason: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

restrictionSchema.virtual('students', {
  ref: 'students',
  localField: '_id',
  foreignField: 'restrictions',
});

const Restrictions = model('restrictions', restrictionSchema);
export default Restrictions;
