/* eslint-disable no-unused-vars */
import AppError from '#utils/appErrors.js';

const handleDuplicateFieldsDB = (err) => {
  const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Campo duplicado valor: ${value}. Utilize otro valor`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  if (!err.errors) return new AppError('Algo salio mal!', 500);

  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Datos ingresados inválidos. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    msg: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      msg: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      msg: 'Algo salio mal!',
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.statusCode === 500 && !err.isOperational) {
      error = handleValidationErrorDB(error);
    }
    sendErrorProd(error, req, res);
  }
};
