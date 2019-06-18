const express = require('express');
// const express = require('./DataBase/index');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./Controllers/authController')(app);
require('./Controllers/projectController')(app);

app.listen(5000);