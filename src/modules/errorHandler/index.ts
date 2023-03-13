import { type ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log('============ ErrorHandler 🪲 ============');
  console.log({ url: req.url, method: req.method, error });
  console.log('============ =============== ============');
  if (typeof error.status === 'number') {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    errorType: error?.name,
    error,
  });
  next();
};
