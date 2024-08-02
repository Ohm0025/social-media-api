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
  err.message = modifyErrorMessage(msg) || "Internal sever error";
  next(err);
};

function modifyErrorMessage(msg) {
  if (msg.startsWith("Key")) {
    let arr_msg = msg.split("");
    let index_start = arr_msg.findIndex((item) => item === "(");
    let index_end = arr_msg.findIndex((item) => item === ")");
    return `this ${msg.substring(
      index_start + 1,
      index_end
    )} already exist , please use another one`;
  }
  return msg;
}
