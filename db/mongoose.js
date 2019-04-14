const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbURL,  {useNewUrlParser: true})
    .then(() =>  console.log('Database connected successfully'))
    .catch((err) => console.error(err));
module.exports = mongoose;
