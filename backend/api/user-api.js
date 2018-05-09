const express = require('express');
const moment = require('moment');
// const multer = require('multer');
// var upload = multer({ dest: '../uploads/' });
const cloudinary = require('cloudinary').v2;
const config = require('./config');
const {User} = require('../models/users');

module.exports = (app, upload) => {

  cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET
  });

  /********Get all_users**********/
  app.get('/users', (req, res) => {
    User.find().then((docs) => {
      res.send(docs);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /********Get user_appliedjobs**********/
  app.get('/getappliedjobs/:email', (req, res) => {
    User.findOne({email: req.params.email}).then((doc) => {
      // console.log(doc.myjobs);
      res.send(doc.myjobs);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /********Get one_user**********/
  // app.get('/users/:username', (req, res) => {
  //   const {username} = req.params;
  //   // console.log(req.body);
  //   User.find({username}).then((doc) => {
  //     res.send(doc);
  //   }).catch((err) => {
  //     res.status(400).send(err);
  //   })
  // });

  /********Check login_user**********/
  app.post('/users', (req, res) => {
    const {username, password} = req.body;
    // console.log(username, password);
    User.find({username, password}).then((doc) => {
      if (!doc.length || doc[0].isEmployer) {
        return res.status(404).send('Invalid login');
      } else {
        return res.send(doc);
      }
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /********Check login_employer**********/
  app.post('/employers', (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password);
    User.find({email, password}).then((doc) => {
      if (!doc.length || !doc[0].isEmployer) {
        return res.status(404).send('Invalid login');
      } else {
        return res.send(doc);
      }
    }).catch((err) => {
      res.status(400).send(err);
    })
  })

  /********Get all_users_matchin_params_name**********/
  app.get('/users/:name/:id', (req, res) => {
    let {name, id} = req.params;
    // console.log(name);
    // name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    User.find({
      _id: {$ne: id},
      '$or': [
        {firstname: new RegExp(name, 'i')},
        {lastname: new RegExp(name, 'i')}
      ]
    }, ['firstname', 'lastname', 'company', 'designation', 'skills', 'fb', 'linkedin', 'twitter', 'github', 'blog', 'avatar', 'skills', 'location', 'education', 'experience', 'projects' ]).then((docs) => {
      // console.log(docs);
      res.send(docs);
    }).catch((err) => {
      res.send(400).status(err);
    })
  })

  /********POST new_user**********/
  app.post('/users/adduser', (req, res) => {
    // console.log(req.body);
    const { firstname, lastname, company, designation, isEmployer, email, password } = req.body;
    var time = moment().valueOf();
    if (isEmployer === true) {
      var user = new User({
        firstname,
        lastname,
        email,
        password,
        company,
        designation,
        isEmployer,
        joined: moment(time).format('ll')
      });
    } else {
      var user = new User({
        firstname,
        lastname,
        email,
        password,
        joined: moment(time).format('ll')
      });
    }

    // console.log(user);

    user.save().then((user) => {
      // res.send(docs);
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /********Post user_appliedjobs**********/
  app.post('/addappliedjobs/:id', (req, res) => {
    // console.log(req.body);
    User.findOneAndUpdate(
      {_id: req.params.id},
      {$push: {
        myjobs: {
          $each: [req.body]
        }
      }},
      {returnOriginal: false}
    ).then((doc) => {
      if (doc === null) {
        return res.status(400).send('No such company to update');
      }
      return res.send(doc.status);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /********Update user_profile**********/
  app.patch('/users/updateprofile/:id', (req, res) => {
    // console.log(req.body);
    const {id} = req.params;
    // const {firstname, lastname, designation, skills, location} = req.body;
    // var user = {
    //   firstname,
    //   lastname,
    //   skills,
    //   designation,
    //   location
    // };

    User.findByIdAndUpdate(id, {$set: req.body}, {new: true}).then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      return res.send(user);
    }).catch((err) => {
      res.send(400).send(err);
    })
  })

  /********Update user_skills**********/
  app.patch('/users/updateskills/:id', (req, res) => {
    // var {skills} = req.body;
    const {id} = req.params;
    // console.log(req.body);
    // console.log(id);
    // var skills = req.body.skills.split(',');
    // skills = skills.map(Function.prototype.call, String.prototype.trim);
    // console.log(skills);
    // console.log(skills);
    User.findByIdAndUpdate(id, {$set: req.body}, {new: true}).then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      return res.send(user);
    }).catch((err) => {
      res.send(400).send(err);
    })
  })

  /********Update user_education**********/
  app.patch('/users/updateeducation/:id', (req, res) => {
    const {id} = req.params;

    User.findByIdAndUpdate(id, {$push: {
      education: {
        $each: [req.body],
        $position: 0
      }
    }}, {new: true}).then((user) => {
      if (!user) {
        return res.status(404).send('No matching records')
      }
      return res.send(user);
    }).catch((err) => {
      res.status(400).send(err);
    });
  })

  /********Update user_projects**********/
  app.patch('/users/updateproject/:id', (req, res) => {
    // console.log(req.body);
    const {id} = req.params;

    User.findByIdAndUpdate(id, {$push: {
      projects: {
        $each: [req.body],
        $position: 0
      }
    }}, {new: true}).then((user) => {
      if (!user) {
        return res.status(404).send('No matching records')
      }
      return res.send(user);
      // console.log(user);
    }).catch((err) => {
      res.status(400).send(err);
    })
  })

  /********Update user_work_experience**********/
  app.patch('/users/updatework/:id', (req, res) => {
    // console.log(req.body);
    const {id} = req.params;

    User.findByIdAndUpdate(id, {$push: {
      experience: {
        $each: [req.body],
        $position: 0
      }
    }}, {new: true}).then((user) => {
      if (!user) {
        return res.status(404).send('No matching records')
      }
      return res.send(user);
      // console.log(user);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  // let isHired = req.body.status === 'yes' ? true : false;
  // // console.log(isHired);
  // Job.update(
  //   {'applied._id': req.params.id},
  //   {$set: {
  //     'applied.$.isHired': isHired
  //   }},
  //   {returnOriginal: true}).then((doc) => {
  //     if (doc.nModified === 1) {
  //       res.status(200).send();
  //     } else {
  //       res.status(404).send();
  //     }
  //     // res.status(200).send();
  //   }).catch((err) => {
  //     res.status(400).send(err);
  //   })

  /********Update user_appliedjobstatus**********/
  app.patch('/users/updateappliedjobstatus/:email', (req, res) => {
    // console.log(req.body, req.params);
    let {jobID, status, email} = req.body;
    let newStatus = status === 'yes' ? 'Accepted' : 'Rejected';
    // console.log(jobID, email, newStatus);
    User.update(
      {'email': req.body.email,
       'myjobs.jobID': jobID
     }, {$set: {
       'myjobs.$.status': newStatus
     }});
  })


  /********Update user_avatar**********/
  app.post('/users/avatar/:id', upload.single('file'), (req, res) => {
    // console.log(req.file);
    // console.log(req.data);
    const {id} = req.params;
    cloudinary.uploader.upload(req.file.path, (err, response) => {
      if (err) {
        return console.log(err);
      }
      // var user = {
      //   avatar: response.secure_url
      // }

      User.findByIdAndUpdate(id, {$set: {avatar: response.secure_url}}, {new: true}).then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        return res.send({url: response.secure_url});
      }).catch((err) => {
        res.send(400).send(err);
      });
    })
  });

  /********Update user_cover**********/
  app.post('/users/cover/:id', upload.single('file'), (req, res) => {
    const {id} = req.params;
    console.log(id);
    cloudinary.uploader.upload(req.file.path, (err, response) => {
      if (err) {
        return console.log(err);
      }
      // var user = {
      //   avatar: response.secure_url
      // }

      User.findByIdAndUpdate(id, {$set: {cover: response.secure_url}}, {new: true}).then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        return res.send({url: response.secure_url});
      }).catch((err) => {
        res.send(400).send(err);
      });
    });

  });

  var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    // console.log(req.body);
    // console.log(token);

    User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    }).catch((err) => {
        res.status(401).send();
      })
    }

  app.post('/users/me', authenticate, (req, res) => {
    // console.log(req);
    res.send(req.user);
  });


  app.post('/users/login', (req, res) => {
    var {email, password} = req.body;

    User.findByCredentials(email, password).then((user) => {
      // console.log(user);
      return user.generateAuthToken().then((token) => {
        // console.log(user);
        return res.header('x-auth', token).send(user);
      });
    }).catch((err) => {
      res.status(400).send('Not found');
    });
  });


  app.delete('/users/me/token', authenticate, (req, res) => {
    // console.log(req.token);
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    })
  });


}
