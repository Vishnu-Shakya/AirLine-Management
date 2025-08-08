const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const cors = require("cors");
const mainRouter = require('./routes/routes.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', mainRouter);

module.exports = app;
