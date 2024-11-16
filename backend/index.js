const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db');
const publicRouter = require('./Routes/publicRoutes');

dotenv.config();

app.use('/api', publicRouter);







const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server is running at port ${PORT}`)});