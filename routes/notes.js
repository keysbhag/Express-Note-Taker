const notes = require('express').Router();

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all notes
notes.get('/', async (req, res) => {
    await readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)))
        .catch((err) => console.error('Data could not be received: ', err));
})

// POST Route for posting notes to database
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            id: uuid(),
            title,
            text
        };

        readAndAppend(newNote, "./db/db.json");
        res.json('Note Successfully Added');
    } else {
        res.error('There was an error in the added Note');
    }
});

module.exports = notes;