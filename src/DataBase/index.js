const mongoose = require('mongoose')

mongoose.connect('mongodb://cadastro:cadastro@cluster0-shard-00-00-kgdq5.mongodb.net:27017,cluster0-shard-00-01-kgdq5.mongodb.net:27017,cluster0-shard-00-02-kgdq5.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majoritymongodb+srv://cadastro:<password>@cluster0-kgdq5.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;