const mongoose = require("mongoose");
const slugify = require("slugify");

const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxLength: [50, "name cannot be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxLength: [500, "description cannot be more than 500 characters"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please add a valid url",
      ],
    },
    phone: {
      type: String,
      maxLength: [20, "Phone number cannot be more than 20 characters"],
    },
    email: {
      type: String,
      match: [/[^\s@]+@[^\s@]+\.[^\s@]+/, "Enter a valid email"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      //GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
        index: "2dsphere",
      },
      formattedaddress: String,
      street: String,
      city: String,
      zipcode: String,
      country: String,
    },
    careers: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user:{
      type:mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//Create bootcamp slug from the name
BootcampSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
  console.log(`logging name ${this.slug}`);
});

//Geocode & create location field
// BootcampSchema.pre('save', async function() {

// })

//Cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function(next){
  console.log('delete Courses middleware fired')
  await this.model('Course').deleteMany({bootcamp:this._id});
  next();
})


//Reverse populate with virtuals
BootcampSchema.virtual('courses',{
  ref:'Course',
  localField:'_id',
  foreignField:'bootcamp',
  justOne:false
})

module.exports = mongoose.model("Bootcamp", BootcampSchema);
