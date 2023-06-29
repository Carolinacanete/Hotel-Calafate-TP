const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();
const session = require('express-session');

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactanosRouter = require('./routes/contactanos');
const sobreElHotelRouter = require('./routes/sobreElHotel');
const ubicacionRouter = require('./routes/ubicacion');

const loginRouter = require('./routes/admin/login');
const resenasRouter = require('./routes/admin/resenas');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '1agjjkuuyyhhjkkmjjjjjj',
    resave: false,
    saveUninitialized: true
}));

secured = async (req, res, next) => {
    try {
        console.log(req.session.id_usuario);
        if (req.session.id_usuario) {
            next();
        } else {
            res.redirect('/admin/login')
        }
    } catch (error) {
        console.log(error)
    }
}

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contactanos', contactanosRouter);
app.use('/sobre-el-hotel', sobreElHotelRouter);
app.use('/ubicacion', ubicacionRouter);

// Rutas Admin
app.use('/admin/login', loginRouter);
app.use('/admin/resenas', secured, resenasRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
