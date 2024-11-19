const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/db');
const bodyParser = require('body-parser');
const Routes = require('./Routes/Routes');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/public', Routes);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server is running at port ${PORT}`));