import AppError from '#utils/appErrors.js';
import catchAsync from '#utils/catchAsync.js';

export default (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`No document found with that ID ${req.params.id}`, 404),
      );
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
