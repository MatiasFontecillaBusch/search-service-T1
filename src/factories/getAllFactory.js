import APIFeatures from '#utils/apiFeatures.js';
import catchAsync from '#utils/catchAsync.js';

export default (Model, validPaths = []) =>
  catchAsync(async (req, res, next) => {
    const filter = {};

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter(Model.numericFields ? Model.numericFields() : [])
      .sort()
      .populate(validPaths)
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });
