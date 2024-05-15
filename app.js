var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/desarrolloWeb')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');


var app = express();

// Configuración de la vista
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    console.log('Time:',Date.now())
    if (req.headers.authorization && req.headers.authorization === "123456") {
        next();
    } else {
        res.status(401).json({ error: "No hay autorización" });
    }
});


// Rutas que requieren autorización
app.use('/', indexRouter);
app.use('/users', usersRouter );
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);



// Middleware para verificar autorización sólo en rutas protegidas



// Manejo de error 404
app.use(function(req, res, next) {
    res.status(404).send('404 Not Found');
});

// Manejador de errores
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
