import createOneFactory from '#factories/createOneFactory.js';
import deleteOneFactory from '#factories/deleteOneFactory.js';
import getAllFactory from '#factories/getAllFactory.js';
import getOneFactory from '#factories/getOneFactory.js';
import updateOneFactory from '#factories/updateOneFactory.js';
import Subjects from '#models/subjectModel.js';

export const getAllSubjects = getAllFactory(Subjects);

export const getSubjectById = getOneFactory(Subjects);

export const createSubject = createOneFactory(Subjects);

export const updateSubject = updateOneFactory(Subjects);

export const deleteSubject = deleteOneFactory(Subjects);
