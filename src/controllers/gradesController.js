import createOneFactory from '#factories/createOneFactory.js';
import deleteOneFactory from '#factories/deleteOneFactory.js';
import getOneFactory from '#factories/getOneFactory.js';
import updateOneFactory from '#factories/updateOneFactory.js';
import Grades from '#models/gradesModel.js';
import APIFeatures from '#utils/apiFeatures.js';
import catchAsync from '#utils/catchAsync.js';

export const getAllGrades = catchAsync(async (req, res, next) => {
  const filter = {};

  // Fetch grades along with the student data
  const features = new APIFeatures(
    Grades.find(filter).populate('student').lean(),
    req.query,
  )
    .filter(Grades.numericFields ? Grades.numericFields() : [])
    .sort()
    .limitFields()
    .paginate();

  const grades = await features.query;

  const groupedByStudent = grades.reduce((acc, grade) => {
    const { student, subjectName } = grade;
    if (!acc[student.uuid]) {
      acc[student.uuid] = {
        _id: student._id,
        name: student.name,
        lastName: student.lastName,
        email: student.email,
        grades: [],
      };
    }

    acc[student.uuid].grades.push({
      _id: grade._id,
      subjectName: subjectName || 'No subject',
      gradeName: grade.name,
      gradeValue: grade.value,
      comment: grade.comment,
    });

    return acc;
  }, {});

  const groupedStudents = Object.values(groupedByStudent);

  res.status(200).json({
    status: 'success',
    results: groupedStudents.length,
    data: groupedStudents,
  });
});

export const getGradeById = getOneFactory(Grades);

export const createGrade = createOneFactory(Grades);

export const updateGrade = updateOneFactory(Grades);

export const deleteGrade = deleteOneFactory(Grades);
