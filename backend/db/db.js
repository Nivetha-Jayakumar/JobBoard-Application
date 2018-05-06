const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/JobBoard';

mongoose.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to DB');
  } else {
    console.log('Connected established to DB');
  }
});

module.exports = {
  mongoose
};
