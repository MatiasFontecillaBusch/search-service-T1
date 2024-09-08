import { Router } from 'express';
import { getAllGrades } from '#controllers/gradesController.js';

const gradesRouter = Router();

gradesRouter.route('/').get(getAllGrades);

export default gradesRouter;
