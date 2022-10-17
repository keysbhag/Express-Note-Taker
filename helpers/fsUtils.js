// Helper File to Read, Write and Append to the Data base
const fs = require('fs');
const util = require('util');

// Uses promise to read the file, instead of using a call back so that we can make sure we get and error if data is not received
const readFromFile = util.promisify(fs.readFile);

// Passes in new array and the destination file so that
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Reads Database into an array, pushes new content into that array and writes the file into the same output
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };