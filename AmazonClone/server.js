const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressFlash = require('express-flash')

const mainRoutes = require('./routes/main')
const userRoutes = require('./routes/user')

const app = express()

mongoose.connect('mongodb://root:hellojava1@ds137596.mlab.com:37596/ecommerce', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) console.log(err)
    console.log('DB Connected');
})

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'secret',
}));
app.use(expressFlash());
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')


// Routes
app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, (err) => {
    if (err) throw err
    console.log('Service is running');
})
