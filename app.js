const express = require('express');
const app = express() ;
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const quizRoutes = require('./api/routes/quizzes');

// connecting db , you can also pass a link which gives you mongodb-atlas.
mongoose.connect('mongodb://localhost/test'); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB connected");
});

app.use(morgan('dev')) ;  // logging requests.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()) ;

// allow browsers to access our db
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') ;
    res.header('Access-Control-Allow-Headers' ,
    "Origin, X-Requested-with, Content-Type, Accept, Authorization ")
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'PUT, PATCH, DELETE, GET, POST');
        res.status(200).json({}) ;
    }
    next() ;
});

app.use('/quizzes', quizRoutes);

app.use((req,res,next) => {
    const err = new Error('Something Wrong.') ;
    error.status = 404;
    next(error) ;
});

app.use( (error, req, res, next) => {
    res.status(err.status || 500) ;
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app ;