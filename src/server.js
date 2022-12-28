const express = require('express');
const path = require('path');

const app = express();

console.log(__dirname + '/../dist/frontend');
app.use(express.static(__dirname + '/../dist/frontend'));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
// });
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/../dist/frontend/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(process.env.PORT || 8080);