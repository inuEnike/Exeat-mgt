export const errorHandler = (err, req, res, next) => {
  let errormessage = err.message || "Somethig went wrong";
  let errorStatus = err.status || 404;

  res.status(errorStatus).json({
    Success: false,
    Status: errorStatus,
    Message: errormessage,
    stackTrace: err.stack,
  });
};
