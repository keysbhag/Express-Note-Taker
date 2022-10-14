const express = require('express');

const notesRouter = require('./note');

const app = express();

app.use('/note', notesRouter);

module.exports = app;
