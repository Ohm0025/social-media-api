exports.apiError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.message || "fail";
  res
    .status(err.statusCode)
    .json({ status: err.statusCode, message: err.status });
};

exports.mapError = (statusCode, msg, next) => {
  let err = new Error();
  err.statusCode = statusCode;
  err.message = msg || "Internal sever error";
  next(err);
};
