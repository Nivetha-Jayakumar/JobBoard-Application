const express = require('express');
const moment = require('moment');
const {Message} = require('../models/messages');

module.exports = (app) => {

  /********Send message**********/
  app.post('/messages/sendmessage', (req, res) => {
    // console.log(req.body);
    var time = moment().valueOf();
    var msg = new Message({
      fromID: req.body.fromID,
      toID: req.body.toID,
      from: req.body.from,
      to: req.body.to,
      message: req.body.message,
      time: moment(time).format('MMM Do, h:mm a')
    })

    msg.save().then((doc) => {
      console.log(doc);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /********Get messages**********/
  app.get('/messages/getmessages/:id', (req, res) => {
    // console.log(req.params);
    const {id} = req.params;

    Message.find({toID: id}).then((docs) => {
      res.send(docs);
    }).catch((err) => {
      res.status(400).send(err);
    })
  })

  /********Update messages_isRead**********/
  app.get('/messages/updateread/:id', (req, res) => {
    const {id} = req.params;

    Message.findByIdAndUpdate(id, {$set: {isRead: true}}, {new: true}).then((doc) => {
      console.log(doc);
    }).catch((err) => {
      re.status(400).send(err);
    })
  })
}
