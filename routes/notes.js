const notes = require('express').Router();
const fs = require('fs');

// Loading in helper functions
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    // Reads the Database file and returns it in JSON format which is utilized by a frontend function
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)))
        .catch((err) => console.error('Data could not be received: ', err));
})

// POST Route for posting notes to database
notes.post('/', (req, res) => {
    // De-structures the request object to the two parameters we require from it 
    const { title, text } = req.body;
    // makes sure that we receive completed information otherwise we return an error
    if(req.body) {
        // if request is good then we create a new object with the information and use our utility functions
        // to write and append to the database
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

// DELETE Route for deleting existing notes from the database
notes.delete("/:id", async function(req, res) {
    // Uses an async await readfile to read the function into an array and prevent the program jumping ahead before the database is read 
    await readFromFile('./db/db.json','utf8')
        .then((data) => {
            let initArray;
            const noteToDelete = req.params.id;
            initArray = JSON.parse(data)
            // filters array to return all indexed objects except for the one containing the ID requested on the frontend
            const newArray = initArray.filter((note) => note.id !== noteToDelete);
            
            // writes new array with deleted index to the database
            fs.writeFile('./db/db.json', JSON.stringify(newArray, null, 4), (err) =>
            err ? console.error(err) : console.info(`\nData written to ./db/db.json`))

            res.send("Note Successfully deleted")
        })
        .catch((err) => console.error('Data could not be received: ', err));
  });

module.exports = notes;