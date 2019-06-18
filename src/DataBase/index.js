const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://cadastro:cadastro@cluster0-kgdq5.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;