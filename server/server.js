if (process.env['PORT'] !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const connectDB = require('./database/index').connect;
connectDB();

app.use(compression());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/', router);

const port = process.env['PORT'] || 3005;

app.listen(port, () => {
  console.log(`Listening on ${port} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;
