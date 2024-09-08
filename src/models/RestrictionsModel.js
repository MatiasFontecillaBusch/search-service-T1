// models/Restriction.js
import { model, Schema } from 'mongoose';

const restrictionSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    inmutable: true,
  },
  restrictionReason: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Restriction = model('restrictions', restrictionSchema);
export default Restriction;
