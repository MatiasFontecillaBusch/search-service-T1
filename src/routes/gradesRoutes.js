import { Router } from 'express';
import {
  createGrade,
  deleteGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
} from '#controllers/gradesController.js';

const gradesRouter = Router();

gradesRouter.route('/').get(getAllGrades).post(createGrade);

gradesRouter
  .route('/:id')
  .get(getGradeById)
  .patch(updateGrade)
  .delete(deleteGrade);

export default gradesRouter;
