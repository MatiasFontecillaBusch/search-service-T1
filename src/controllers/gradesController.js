import createOneFactory from '#factories/createOneFactory.js';
import deleteOneFactory from '#factories/deleteOneFactory.js';
import getAllFactory from '#factories/getAllFactory.js';
import getOneFactory from '#factories/getOneFactory.js';
import updateOneFactory from '#factories/updateOneFactory.js';
import Grades from '#models/gradesModel.js';

export const getAllGrades = getAllFactory(Grades);

export const getGradeById = getOneFactory(Grades);

export const createGrade = createOneFactory(Grades);

export const updateGrade = updateOneFactory(Grades);

export const deleteGrade = deleteOneFactory(Grades);
