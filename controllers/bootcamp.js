const Bootcamp = require('../models/Bootcamp')

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public

// we need to export each method so that we get it into the routes file
exports.getBootcamps = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, data: { id: 1, msg: "show all bootcamps", hello:req.hello } });
}

//@desc     Get single bootcamps
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `show bootcamp ${req.params.id}` });
}

//@desc     Create new bootcamp
//@route    POST /api/v1/bootcamps/
//@access   Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Create new bootcamp` });
}

//@desc     Update bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
}

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
}