const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ashachakre:RbqVQGktxcO6Dx9w@cluster0.hi5w3x1.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    userUnifiedTopology: true,
})
module.exports = mongoose.connection;