const express = require('express');

const app = express();

app.use(express.static('public'));

// all is a method, and it takes 2 args;
// 1. route
// 2. callback to run if the route is requested
app.all('*', (req, res) => {
    res.send('<h1>Home page</h1>');
});

app.listen(3000);
