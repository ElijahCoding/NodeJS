const express = require('express');

const app = express();

function validateUser (req, res, next) {
    res.locals.validated = true;
    console.log('validated ran');
    next();
}

// app.use(validateUser);
app.use('/contact', validateUser);

app.get('/', (req, res) => {
    res.send('<h1>Home</h1>');
});

app.listen(3000);
