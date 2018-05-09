const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    trim: true,
    unique: true
  },
  password: {
    type: String,
    trim: true
  },
  views: {
    type: String,
    trim: true
  },
  joined: {
    type: String
  },
  isEmployer: {
    type: Boolean,
    default: false
  },
  company: {
    type: String,
    trim: true,
    default: 'N/A'
  },
  designation: {
    type: String,
    trim: true,
    default: 'N/A'
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/jobboard/image/upload/v1525078819/user_avatars/default.png'
  },
  skills: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    trim: true
  },
  education: [{
    university: {
      type: String,
      trim: true
    },
    major: {
      type: String,
      trim: true
    },
    degree: {
      type: String,
      trim: true
    },
    gpa: {
      type: String,
      trim: true
    },
    gradDate: {
      type: String,
      trim: true
    }
  }],
  experience: [{
    company: {
      type: String,
      trim: true
    },
    years: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  projects: [{
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    image: {
      type: String
    },
    cover: {
      type: String
    },
    link: {
      type: String
    }
  }],
  about: {
    type: String,
    trim: true
  },
  fb: {
    type: String,
    trim: true,
    default: ''
  },
  linkedin: {
    type: String,
    trim: true,
    default: ''
  },
  twitter: {
    type: String,
    trim: true,
    default: ''
  },
  github: {
    type: String,
    trim: true,
    default: ''
  },
  blog: {
    type: String,
    trim: true,
    default: ''
  },
  myjobs: [{
    job: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    jobID: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true
    }
  }],
  messages: [{
    from: String,
    to: String,
    subject: String,
    message: String,
    isRead: {
      type: Boolean,
      default: false
    }
  }],
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  // const {_id, email} = userObject;
  // return {_id, email};
  return userObject;
};

userSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
}

userSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  })
}

userSchema.statics.findByToken = function (token) {
  // console.log(token);
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'secret');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

userSchema.statics.findByCredentials = function (email, password) {
  var User = this;


  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        // console.log(password);
        // console.log(user.password);
        // console.log(res);
        if (res) {
          // console.log(user);
          resolve(user);
          return user;
        } else {
          reject();
        }
      });
    });
  });

}

userSchema.pre('save', function (next) {
  var user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

const User = mongoose.model('users', userSchema);

module.exports = {
  User
}
