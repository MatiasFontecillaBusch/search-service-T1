import { Router } from 'express';
import {
  createRestriction,
  deleteRestriction,
  getAllRestrictions,
  getRestrictionById,
  updateRestriction,
} from '#controllers/restrictionsController.js';

const restrictionsRouter = Router();

restrictionsRouter.route('/').get(getAllRestrictions).post(createRestriction);

restrictionsRouter
  .route('/:id')
  .get(getRestrictionById)
  .patch(updateRestriction)
  .delete(deleteRestriction);

export default restrictionsRouter;
