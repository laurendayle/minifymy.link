

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

// app.use(compression());
// app.use(morgan('dev'));
app.use(cors());
// app.use(helmet({}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/', router);

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Listening on ${port} in ${process.env.NODE_ENV} mode`);
});

module.exports = {
  app: app,
};

