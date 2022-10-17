// Routes request to the right script depending on the parameter and method passed
const express = require('express');
const notesRouter = require('./notes');
const app = express();

// routes to the notes.js
app.use('/notes', notesRouter);

module.exports = app;
