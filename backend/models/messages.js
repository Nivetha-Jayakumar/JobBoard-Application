const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  fromID: String,
  toID: String,
  from: String,
  to: String,
  message: String,
  time: String,
  isRead: {
    type: Boolean,
    default: false
  }
})

var Message = mongoose.model('messages', messageSchema);

module.exports = {
  Message
};
