const mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  about: String,
  type: String,
  size: String,
  founder: String,
  ceo: String,
  location: String,
  short_description: String,
  reviews: [{
    job: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    pros: {
      type: String,
      required: true,
      trim: true
    },
    cons: {
      type: String,
      required: true,
      trim: true
    },
    benefits: {
      type: String,
      trim: true
    },
    salary: {
      type: String,
      trim: true
    },
    rating: {
      type: String,
      required: true,
      trim: true
    },
    postedOn: String
  }],
  image: String
});

const Company = mongoose.model('companies', companySchema);

module.exports = Company;
