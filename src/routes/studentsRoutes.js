import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '#controllers/studentsController.js';

const studentsRouter = Router();

studentsRouter.route('/').get(getAllStudents).post(createStudent);

studentsRouter
  .route('/:id')
  .get(getStudentById)
  .patch(updateStudent)
  .delete(deleteStudent);

export default studentsRouter;
