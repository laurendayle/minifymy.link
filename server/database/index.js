
const mongoose = require('mongoose');
const uri = process.env['MONGO_URI'];

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
module.exports.connect = connect;
