import { Router } from 'express';
import { getAllRestrictions } from '#controllers/restrictionsController.js';

const restrictionsRouter = Router();

restrictionsRouter.route('/').get(getAllRestrictions);

export default restrictionsRouter;
