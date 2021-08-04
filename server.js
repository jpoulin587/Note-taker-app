const express = require("express");
const router = express.Router()
const fs = require("fs");
const path = require('path');
const notesData = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Get the notes data
app.get('/api/notes', (req, res) => {
    res.json(notesData);
    //console.log(notesData);
    });

    //TODO get the post from the form
//=========================================
// adapted from unit 11 activity 20
router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  notesData.push(newNote)
  fs.writeFile(__dirname + '/../db/db.json', JSON.stringify(notesData), function (err) {
    if (err) throw err
  })
  res.end()
  console.log("saved");
});



//=========================================
// end of put function.......



// Route for Index
app.get('*', (req,res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);