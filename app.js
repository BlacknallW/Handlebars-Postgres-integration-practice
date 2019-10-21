const createError = require('http-errors');
const express = require('express'),
  es6Renderer = require('express-es6-template-engine'),
  app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Imports route files
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', es6Renderer);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Sets static folder
app.use(express.static(path.join(__dirname, 'public')));

//Sets path to route folders
app.use('/', indexRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 5176

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });


module.exports = app;
