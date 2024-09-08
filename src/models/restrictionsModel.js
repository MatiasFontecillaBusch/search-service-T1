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
  restrictionReason: String,
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

restrictionSchema.set('toObject', { virtuals: true });
restrictionSchema.set('toJSON', { virtuals: true });

const Restrictions = model('restrictions', restrictionSchema);
export default Restrictions;
