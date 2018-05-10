const express = require('express');
const moment = require('moment');
const Company = require('../models/company');


module.exports = (app) => {

  /**********GET reviews**********/
  app.get('/:name/reviews', (req, res) => {
    const {name} = req.params;
    Company.find({name}, {reviews: {$slice: 3}}).then((doc) => {
      if (!doc.length) {
        return res.status(400).send('No such company to fetch reviews');
      }
      return res.send(doc[0].reviews);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /*********GET company_details*********/
  app.get('/companies/:name', (req, res) => {
    const {name} = req.params;
    Company.find({name: new RegExp(name, 'i')}).then((doc) => {
      if (!doc.length) {
        return res.status(400).send('No such company');
      }
      return res.send(doc[0]);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /*********GET all_companies*********/
  app.get('/companies', (req, res) => {
    Company.find().then((docs) => {
      if (!docs.length) {
        return res.status(404).send('No companies');
      }
      return res.send(docs);
    }).catch((err) => {
      res.status(400).send(err);
    });
  })

  /*********GET company_size*********/
  app.get('/size/:name', (req, res) => {
    // const {name} = req.params;
    // console.log(name);
    const name = req.params.name;
    // console.log(name);

    Company.find({name}).then((doc) => {
      if (!doc.length) {
        return res.status(404).send('No companies');
      }
      // console.log(doc[0].size);
      return res.send(doc[0]);
    }).catch((err) => {
      res.status(400).send(err);
    });
  })


  /*********POST reviews************/
  app.post('/:name/writereview', (req, res) => {
    // console.log('Request', req.body);
    var time = moment().valueOf();
    var review = {
        job: req.body.job,
        status: req.body.status,
        title: req.body.title,
        pros: req.body.pros,
        cons: req.body.cons,
        benefits: req.body.benefits,
        salary: req.body.salary,
        rating: req.body.rating,
        postedOn: moment(time).format('ll')
    }

    Company.findOneAndUpdate(
      {name: req.params.name},
      {$push: {
        reviews: {
          $each: [review],
          $position: 0
        }
      }},
      {returnOriginal: false}
    ).then((doc) => {
      if (doc === null) {
        return res.status(400).send('No such company to update');
      }
      return res.send(doc);
    }).catch((err) => {
      console.log(err);
    })
  });

}
