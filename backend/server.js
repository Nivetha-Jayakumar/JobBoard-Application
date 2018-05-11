const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer({ dest: '../uploads/' });
const moment = require('moment');
const cors = require('cors');

const {mongoose} = require('./db/db');
// const Company = require('./models/company');
const {User} = require('./models/users');
const companyAPI = require('./api/company-api');
const userAPI = require('./api/user-api');
const jobAPI = require('./api/job-api');
const msgAPI = require('./api/message-api');

var app = express();
app.use(cors());

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));


// app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname + '/public')));

companyAPI(app);
userAPI(app, upload);
jobAPI(app, upload);
msgAPI(app);


// app.get('/reviews/:name', (req, res) => {
//   const {name} = req.params;
//   Company.find({name}, {reviews: {$slice: 3}}).then((doc) => {
//     res.send(doc[0].reviews);
//   }).catch((err) => {
//     res.status(400).send(err);
//   })
// });

app.listen(port, () => {
  console.log(`Started at port ${port}`);
})
