import { Router } from 'express';
import { getAllSubjects } from '#controllers/subjectsController.js';

const subjectsRouter = Router();

subjectsRouter.route('/').get(getAllSubjects);

export default subjectsRouter;
