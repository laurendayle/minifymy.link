require('dotenv').config();

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const bodyParser = require('body-parser');
const connectDB = require('./database/index').connect;

const app = express();
connectDB();

app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/', router);

const port = process.env['PORT'] || 3005;

app.listen(port, () => {
  console.log(`Listening on ${port} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;
