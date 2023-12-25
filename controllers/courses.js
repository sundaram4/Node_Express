const ErrorResponse = require('../utills/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc      Get courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    res.status(200).json({
      success: true,
      count:courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
  
});


// @desc      Get single courses
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path:'bootcamp',
    select: 'name description'
  });

  if(!course){
    //res.status(400).json({success:false,message:`Course not found with id of ${req.params.id}`})
    return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
      success:true,
      data:course
  });

});

// @desc      Add course
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if(!bootcamp){
    //res.status(400).json({success:false,message:`Course not found with id of ${req.params.id}`})
    return next(new ErrorResponse(`bootcamp not found with id of ${req.params.bootcampId}`, 404))
  }
  //Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`,
        401
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
      success:true,
      data:course
  });

});

// @desc      Update courses
// @route     PUT /api/v1/courses/:id
// @access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new:true,
    runValidators:true
  });

  if(!course){
    //res.status(400).json({success:false,message:`Course not found with id of ${req.params.id}`})
    return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404))
  }
  //Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update a course ${course._id}`,
        401
      )
    );
  }

  res.status(200).json({
      success:true,
      data:course
  });

});

// @desc      Delete courses
// @route     Delete /api/v1/courses/:id
// @access    Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if(!course){
    //res.status(400).json({success:false,message:`Course not found with id of ${req.params.id}`})
    return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404))
  }

  //Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete the course ${course._id}`,
        401
      )
    );
  }

  course = await course.deleteOne();

  res.status(200).json({
      success:true,
      data:course
  });

});