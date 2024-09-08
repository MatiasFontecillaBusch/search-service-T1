import getAllFactory from '#factories/getAllFactory.js';
import Grades from '#models/gradesModel.js';

export const getAllGrades = getAllFactory(Grades);
