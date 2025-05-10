const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database/connectdb');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/', require('./routes'));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
