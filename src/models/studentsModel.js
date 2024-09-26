import { model, Schema } from 'mongoose';
import AppError from '#utils/appErrors.js';

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

studentSchema.methods.removeRestrictionByUUID = async function (
  restrictionUUID,
) {
  const restrictionIndex = this.restrictions.indexOf(restrictionUUID);

  if (restrictionIndex === -1) {
    throw new AppError('Restricción no encontrada', 404);
  }

  this.restrictions.splice(restrictionIndex, 1);

  await this.save();

  return this;
};

studentSchema.statics.removeRestrictionFromAll = async function (
  restrictionUUID,
) {
  const students = await this.find({ restrictions: restrictionUUID });

  if (students.length === 0) {
    throw new AppError('No se encontraron usuarios con esa restricción');
  }

  await Promise.all(
    students.map(async (student) => {
      const restrictionIndex = student.restrictions.indexOf(restrictionUUID);
      if (restrictionIndex !== -1) {
        student.restrictions.splice(restrictionIndex, 1);
        await student.save();
      }
    }),
  );

  return students;
};

studentSchema.virtual('grades', {
  ref: 'grades',
  localField: '_id',
  foreignField: 'student',
});

const Students = model('students', studentSchema);
export default Students;
