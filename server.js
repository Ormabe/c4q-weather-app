const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.listen('4747', () => console.log('Listening on http://localhost:4747'));

module.export = app;