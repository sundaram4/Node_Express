const errorResponse = require('../utills/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = {...err};

  error.message = err.message;

  console.log(err.stack.red);
  
  //console log error name -- CastError ||  E11000 duplicate key error || Validation error
  console.log(err.errors);

  // Mongoose bad ObjectId -- CastError
  if(err.name === 'CastError'){
    const message = `Resource not found with id ${err.value}`
    error = new errorResponse(message, 404);
  }

  //Mongoose duplicate key
  if(err.code === 11000 ){
    const message = 'duplicate key entered';
    error = new errorResponse(message, 400);
  }

  //Mongoose Validation error
  if(err.name=== 'ValidationError'){
    const message = Object.values(err.errors).map(val =>val.message);
    error = new errorResponse(message, 400); 
  } 


  res
    .status(error.statusCode || 400)
    .json({ success: false, message: error.message || "Server Error" });
};

module.exports = errorHandler;
