import createOneFactory from '#factories/createOneFactory.js';
import deleteOneFactory from '#factories/deleteOneFactory.js';
import getAllFactory from '#factories/getAllFactory.js';
import getOneFactory from '#factories/getOneFactory.js';
import updateOneFactory from '#factories/updateOneFactory.js';
import Restrictions from '#models/restrictionsModel.js';

export const getAllRestrictions = getAllFactory(Restrictions);

export const getRestrictionById = getOneFactory(Restrictions);

export const createRestriction = createOneFactory(Restrictions);

export const updateRestriction = updateOneFactory(Restrictions);

export const deleteRestriction = deleteOneFactory(Restrictions);
