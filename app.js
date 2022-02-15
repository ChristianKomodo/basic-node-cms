const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
/*
  old sass middleware
  // const sassMiddleware = require('node-sass-middleware');
*/
var sass = require('node-sass');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/edit');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
  old sass middleware
  // app.use(sassMiddleware({
    //   src: path.join(__dirname, 'public'),
    //   dest: path.join(__dirname, 'public'),
    //   indentedSyntax: false,
    //   sourceMap: true
    // }));
*/
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/edit', usersRouter);

/*
  sass package.  Can't see how to actually save the .css file after it compiles
  // const sass = require('sass');
  // const result = sass.compile('public/stylesheets/style.scss');
  // console.log(result.css);
*/
/* failed attempt to export the compiled css file
const fs = require('fs');
sass.render(
	{
		file: 'public/stylesheets/style.scss',
		outFile: 'public/stylesheets/result.css',
	},
	function (err, result) {
		if (!err) {
			// No errors during the compilation, write this result on the disk
			fs.writeFile('public/stylesheets/', result.css, function (errorInside) {
				if (!errorInside) {
					console.log('css compiled from sass and saved to file!');
				} else {
					console.log('error saving css file from sass compilation.');
				}
			});
		} else {
			console.log('error compiling sass:', err);
		}
	}
);
*/

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
