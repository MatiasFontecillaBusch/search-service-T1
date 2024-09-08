import createOneFactory from '#factories/createOneFactory.js';
import deleteOneFactory from '#factories/deleteOneFactory.js';
import getOneFactory from '#factories/getOneFactory.js';
import updateOneFactory from '#factories/updateOneFactory.js';
import Students from '#models/studentsModel.js';
import APIFeatures from '#utils/apiFeatures.js';
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
        populate: {
          path: 'subject',
          model: 'subjects',
        },
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

export const updateStudent = updateOneFactory(Students);

export const deleteStudent = deleteOneFactory(Students);
