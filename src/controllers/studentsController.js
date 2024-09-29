import createOneFactory from '#factories/createOneFactory.js';
import deleteOneFactory from '#factories/deleteOneFactory.js';
import getOneFactory from '#factories/getOneFactory.js';
import Students from '#models/studentsModel.js';
import APIFeatures from '#utils/apiFeatures.js';
import AppError from '#utils/appErrors.js';
import catchAsync from '#utils/catchAsync.js';

export const getAllStudents = catchAsync(async (req, res, next) => {
  const regex = new RegExp(req.query.search, 'i');

  const { populateFields } = req.query;

  const features = new APIFeatures(
    Students.find({
      $or: [{ name: regex }, { lastName: regex }, { uuid: regex }],
    }).lean(),
    req.query,
  )
    .sort()
    .limitFields()
    .paginate();

  let { query } = features;

  if (populateFields) {
    const fieldsToPopulate = populateFields.split(',');

    if (fieldsToPopulate.includes('restrictions')) {
      query = query.populate('restrictions');
    }

    if (fieldsToPopulate.includes('grades')) {
      query = query.populate({
        path: 'grades',
      });
    }
  }

  const students = await query;

  res.status(200).json({
    status: 'success',
    results: students.length,
    data: students,
  });
});

export const getStudentById = getOneFactory(Students, [
  {
    path: 'restrictions',
  },
]);

export const createStudent = createOneFactory(Students);

export const updateStudent = catchAsync(async (req, res, next) => {
  const { body } = req;
  const student = await Students.findById(req.params.id);

  if (!student) {
    return next(new AppError('No document found with that ID', 404));
  }

  if (body.restrictions) {
    student.restrictions.push(...body.restrictions);
    delete body.restrictions;
  }

  Object.assign(student, body);

  await student.save();

  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
});

export const deleteStudent = deleteOneFactory(Students);

export const removeStudentRestriction = catchAsync(async (req, res, next) => {
  const { restrictionUUID } = req.params;
  const student = await Students.findById(req.params.id);

  if (!student) {
    return next(new AppError('No document found with that ID', 404));
  }

  await student.removeRestrictionByUUID(restrictionUUID);

  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
});

export const removeRestrictionFromAllStudents = catchAsync(
  async (req, res, next) => {
    const { restrictionUUID } = req.params;

    const updatedStudents =
      await Students.removeRestrictionFromAll(restrictionUUID);

    res.status(200).json({
      status: 'success',
      data: {
        students: updatedStudents,
      },
    });
  },
);
