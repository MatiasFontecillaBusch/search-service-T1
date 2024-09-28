import Grades from '#models/gradesModel.js';
import Restrictions from '#models/restrictionsModel.js';
import Students from '#models/studentsModel.js';
import catchAsync from '#utils/catchAsync.js';

export const deleteAll = catchAsync(async (req, res, next) => {
  await Students.deleteMany();
  await Grades.deleteMany();
  await Restrictions.deleteMany();
  res.status(200).json({
    status: 'success',
    msg: 'Base de datos vaciada',
  });
});
