const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  res
    .status(err.statusCode || 400)
    .json({ success: false, message: err.message || "Server Error" });
};

module.exports = errorHandler;
