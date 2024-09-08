import createOneFactory from '#factories/createOneFactory.js';
import deleteOneFactory from '#factories/deleteOneFactory.js';
import getAllFactory from '#factories/getAllFactory.js';
import getOneFactory from '#factories/getOneFactory.js';
import updateOneFactory from '#factories/updateOneFactory.js';
import Students from '#models/studentsModel.js';

export const getAllStudents = getAllFactory(Students);

export const getStudentById = getOneFactory(Students);

export const createStudent = createOneFactory(Students);

export const updateStudent = updateOneFactory(Students);

export const deleteStudent = deleteOneFactory(Students);
