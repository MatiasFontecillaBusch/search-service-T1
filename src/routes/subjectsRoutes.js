import { Router } from 'express';
import {
  createSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
} from '#controllers/subjectsController.js';

const subjectsRouter = Router();

subjectsRouter.route('/').get(getAllSubjects).post(createSubject);

subjectsRouter
  .route('/:id')
  .get(getSubjectById)
  .patch(updateSubject)
  .delete(deleteSubject);

export default subjectsRouter;
