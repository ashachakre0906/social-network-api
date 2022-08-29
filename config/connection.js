const mongoose = require('mongoose');

mongoose.connect('mongoDB://localhost:27017/socialNetworkDb',{
    useNewUrlParser: true,
    userUnifiedTopology: true,
})
module.exports = mongoose.connection;