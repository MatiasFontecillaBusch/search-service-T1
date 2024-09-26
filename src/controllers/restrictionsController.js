import createOneFactory from '#factories/createOneFactory.js';
import deleteOneFactory from '#factories/deleteOneFactory.js';
import getAllFactory from '#factories/getAllFactory.js';
import getOneFactory from '#factories/getOneFactory.js';
import updateOneFactory from '#factories/updateOneFactory.js';
import Restrictions from '#models/restrictionsModel.js';
import Students from '#models/studentsModel.js';
import catchAsync from '#utils/catchAsync.js';

export const getAllRestrictionsByStudents = catchAsync(
  async (req, res, next) => {
    const searchTerm = req.query.search || '';

    const restrictions = await Students.aggregate([
      {
        $lookup: {
          from: 'restrictions',
          localField: 'restrictions',
          foreignField: '_id',
          as: 'restrictionDetails',
        },
      },
      { $unwind: '$restrictionDetails' },
      {
        $match: {
          $or: [
            {
              'restrictionDetails.restrictionReason': {
                $regex: searchTerm,
                $options: 'i',
              },
            },
            {
              'restrictionDetails.uuid': {
                $regex: searchTerm,
                $options: 'i',
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          studentId: '$_id',
          name: '$name',
          lastName: '$lastName',
          email: '$email',
          'restriction._id': '$restrictionDetails._id',
          'restriction.restrictionReason':
            '$restrictionDetails.restrictionReason',
          'restriction.createdAt': '$restrictionDetails.createdAt',
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      results: restrictions.length,
      data: restrictions,
    });
  },
);

export const getAllRestrictions = getAllFactory(Restrictions);

export const getRestrictionById = getOneFactory(Restrictions);

export const createRestriction = createOneFactory(Restrictions);

export const updateRestriction = updateOneFactory(Restrictions);

export const deleteRestriction = deleteOneFactory(Restrictions);
