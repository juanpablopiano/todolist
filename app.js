const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Entry = require('./models/entry');

//connection to db
let db = process.env.MONGODB_URL;
const dbObject = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false};
if (db == null || db == "") {
    db = 'mongodb://localhost:27017/todolist';
}
mongoose.connect(db, dbObject);

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// index of entries
app.get('/', (req, res) => {

    Entry.find({}, (error, allEntries) => {
        if (error) {
            console.log(error);
        } else {
            res.render('index', {entries: allEntries});
        }
    });
});

// enter new entry
app.post('/', (req, res) => {
    console.log(req.body.description);
    let desc = req.body.description;
    let newEntry = {
        description: desc,
        id: 1
    }

    Entry.create(newEntry, (error, newE) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    });
});

//whatever
app.get('/:thing', (req, res) => {
    let thing = req.params.thing;
    res.send(`Is this your ${thing}?`)
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}
app.listen(port, () => {
    console.log('The app is listening in port ' + port);
});