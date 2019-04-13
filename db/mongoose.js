let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/delivery',  {useNewUrlParser: true})
    .then(() =>  console.log('Database connected successfully'))
    .catch((err) => console.error(err));
module.exports = mongoose;
