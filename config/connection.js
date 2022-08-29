const { connect, connection } = require('mongoose');
const connectionString = 
process.env.MONGODB_URI || 'mongoDB://localhost:27017/socialNetworkDb';

connect(connectionString, {
    useNewUrlParser: true,
    userUnifiedTopology: true,

});
module.exports = connection;