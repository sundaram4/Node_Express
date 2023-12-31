const express = require("express");
const {
  getBootcamp,
  getBootcamps,
  deleteBootcamp,
  updateBootcamp,
  createBootcamp,
  bootcampPhotoUpload
} = require("../controllers/bootcamp");

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

//Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

const {protect,authorize} = require('../middleware/auth');

//Re-route into other resource roters
router.use('/:bootcampId/courses', courseRouter)

router.route('/:id/photo').put(protect,authorize('publisher','admin'),bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp,'courses'),getBootcamps)
  .post(protect,authorize('publisher','admin'),createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect,authorize('publisher','admin'),updateBootcamp)
  .delete(protect,authorize('publisher','admin'),deleteBootcamp);

// router.get("/", (req, res) => {
//   //console.log(res)
//   // res.send('<h1>Hello World</h1>');
//   //res.json({name:'Brad'});
//   //send only status 200, 400, 300
//   //res.sendStatus(400);
//   //res.status(400).json({success:false});
//   //successful response
//   res
//     .status(200)
//     .json({ success: true, data: { id: 1, msg: "show all bootcamps" } });
// });
// router.get("/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `show bootcamp ${req.params.id}` });
// });
// router.post("/", (req, res) => {
//   res.status(200).json({ success: true, msg: `Create new bootcamp` });
// });
// router.put("/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
// });
// router.delete("/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
// });

module.exports = router;
