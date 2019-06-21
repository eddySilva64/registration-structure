const express = require('express');
// const express = require('./DataBase/index');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/Controllers/index')(app);

app.listen(5000);