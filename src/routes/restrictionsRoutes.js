import { Router } from 'express';
import {
  createRestriction,
  deleteRestriction,
  getAllRestrictions,
  getAllRestrictionsByStudents,
  getRestrictionById,
  updateRestriction,
} from '#controllers/restrictionsController.js';

const restrictionsRouter = Router();

restrictionsRouter.route('/').get(getAllRestrictions).post(createRestriction);

restrictionsRouter.route('/students').get(getAllRestrictionsByStudents);

restrictionsRouter
  .route('/:id')
  .get(getRestrictionById)
  .patch(updateRestriction)
  .delete(deleteRestriction);

export default restrictionsRouter;
