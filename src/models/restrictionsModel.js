// models/Restriction.js
import { model, Schema } from 'mongoose';

const restrictionSchema = new Schema({
  _id: {
    type: String,
    required: true,
    immutable: true,
  },
  restrictionReason: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Restrictions = model('restrictions', restrictionSchema);
export default Restrictions;
