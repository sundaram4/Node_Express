const errorResponse = require('../utills/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = {...err};

  error.message = err.message;

  console.log(err.stack.red);
  
  //console log error name -- CastError || 
  console.log(err.name);

  // Mongoose bad ObjectId -- CastError
  if(err.name === 'CastError'){
    const message = `Resource not found with id ${err.value}`
    error = new errorResponse(message, 404);
  }

  res
    .status(error.statusCode || 400)
    .json({ success: false, message: error.message || "Server Error" });
};

module.exports = errorHandler;
