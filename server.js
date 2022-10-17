// Declaring express variables and routers
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Sets port
const PORT = 3001;

const app = express();

// Allows express to use methods from the browser and through JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);

app.use(express.static('public'));

// Routes to the index.html when URL is loaded in the browser
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Routes to the notes.html when URL with /notes parameter is loaded in the browser
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Sets which port the server will be run on 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);