const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utills/errorResponse')

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public

// we need to export each method so that we get it into the routes file
exports.getBootcamps = async(req, res, next) => {
    //res.status(200).json({ success: true, data: { id: 1, msg: "show all bootcamps", hello:req.hello } });
    try{
        const bootcamps = await Bootcamp.find();
        res.status(200).json({ success: true, count:bootcamps.length, data:bootcamps });
    }catch(err){
        res.status(400).json({ success: false});
    }
}

//@desc     Get single bootcamps
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
           // res.status(400).json({ success: false});
           return next(new ErrorResponse(`Bootcamp not found with ${req.params.id}`,404));
        }
        res.status(200).json({ success: true, data:bootcamp });
    }catch(err){
        //res.status(400).json({ success: false});
        next(err);
    }
    //res.status(200).json({ success: true, msg: `show bootcamp ${req.params.id}` });
}

//@desc     Create new bootcamp
//@route    POST /api/v1/bootcamps/
//@access   Private
exports.createBootcamp = async (req, res, next) => {
    //console.log(req.body);
    //res.status(200).json({ success: true, msg: `Create new bootcamp` });
    try{
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({ success: true, data: bootcamp });
    }
    catch(err){
        res.status(400).json({ success: false});
    }

}

//@desc     Update bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = async(req, res, next) => {
    //res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` });
    try{
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        });
    
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with ${req.params.id}`,404));
        }
        res.status(200).json({ success: true, data:bootcamp });
    }
    catch(err){
        //res.status(400).json({ success: false});
        next(err);
    }
}

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = async (req, res, next) => {
    //res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with ${req.params.id}`,404));
        }
        res.status(200).json({ success: true, data:bootcamp });

    }catch(err){
        //res.status(400).json({ success: false});
        next(err);
    }
}