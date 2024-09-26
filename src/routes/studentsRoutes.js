import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  removeRestrictionFromAllStudents,
  removeStudentRestriction,
  updateStudent,
} from '#controllers/studentsController.js';

const studentsRouter = Router();

studentsRouter.route('/').get(getAllStudents).post(createStudent);

studentsRouter
  .route('/restrictions/:restrictionUUID')
  .delete(removeRestrictionFromAllStudents);

studentsRouter
  .route('/:id')
  .get(getStudentById)
  .patch(updateStudent)
  .delete(deleteStudent);

studentsRouter
  .route('/:id/restrictions/:restrictionUUID')
  .delete(removeStudentRestriction);

export default studentsRouter;
