import getAllFactory from '#factories/getAllFactory.js';
import Students from '#models/studentsModel.js';

export const getAllStudents = getAllFactory(Students);
