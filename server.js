const express     = require('express');
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const app         = express();
const port = 8080;

//create load directory
var dir = './app/load/';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

require('./app/routes')(app, {});
app.listen(port, () => {
  console.log('We are live on ' + port);
});

module.exports = app;

