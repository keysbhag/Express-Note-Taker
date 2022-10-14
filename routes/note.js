const note = require('express').Router();

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all notes
note.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// POST Route for posting notes to database
note.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text
        };

        readAndAppend(newNote, "./db/db.json");
        res.json('Note Successfully Added');
    } else {
        res.error('There was an error in the added Note');
    }
});

module.exports = note;