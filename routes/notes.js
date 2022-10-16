const notes = require('express').Router();
const fs = require('fs');

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
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

notes.delete("/:id", async function(req, res) {

    await readFromFile('./db/db.json','utf8')
        .then((data) => {
            let initArray;
            const noteToDelete = req.params.id;
            initArray = JSON.parse(data)

            const newArray = initArray.filter((note) => note.id !== noteToDelete);
            console.log(newArray);
        
            fs.writeFile('./db/db.json', JSON.stringify(newArray, null, 4), (err) =>
            err ? console.error(err) : console.info(`\nData written to ./db/db.json`))

            res.send("Note Successfully deleted")
        })
        .catch((err) => console.error('Data could not be received: ', err));
  });

module.exports = notes;