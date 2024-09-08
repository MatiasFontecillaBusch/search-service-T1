import getAllFactory from '#factories/getAllFactory.js';
import Subjects from '#models/subjectModel.js';

export const getAllSubjects = getAllFactory(Subjects);
