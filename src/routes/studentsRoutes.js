import { Router } from 'express';
import { getAllStudents } from '#controllers/studentsController.js';

const studentsRouter = Router();

studentsRouter.route('/').get(getAllStudents);

export default studentsRouter;
