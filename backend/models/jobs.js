const mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
    jobID: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 6,
      maxlength: 6
    },
    designation: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    postedBy: [{
      name: {
        type: String,
        trim: true
      },
      emailID: {
        type: String,
        trim: true
      }
    }, {_id: false}],
    postedOn: String,
    description: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    requirements: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      trim: true
    },
    applied: [{
      firstname: {
        type: String,
        trim: true
      },
      lastname: {
        type: String,
        trim: true
      },
      email: {
        type: String,
        trim: true
      },
      phone: {
        type: String,
        trim: true
      },
      gender: {
        type: String,
        trim: true
      },
      university: {
        type: String,
        trim: true
      },
      dob: {
        type: String,
        trim: true
      },
      gpa: {
        type: String,
        trim: true
      },
      resume: {
        type: String,
        trim: true
      },
      isHired: {
        type: Boolean
      }
    }]
});

jobSchema.index({designation: 'text'});

var Job = mongoose.model('jobs', jobSchema);

module.exports = {
  Job
};
