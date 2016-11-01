var express          = require('express'),
    path             = require('path'),
	favicon          = require('static-favicon'),
	logger           = require('morgan'),
	cookieParser     = require('cookie-parser'),
	bodyParser   	 = require('body-parser'),
	session      	 = require('express-session'),
	load         	 = require('express-load'),
	mongoose         = require('mongoose'),
	flash            = require('express-flash'),
	moment           = require('moment'),
	expressValidator = require('express-validator');

//conexão com o mongodb
mongoose.connect('mongodb://localhost/desafionode', function(err){
	if(err){
		console.log("Erro ao conectar no mongodb: "+err);
	}else{
		console.log("Conexão com o mongodb efetuada com sucesso!");
	}
});

var app = express();

//middleware
var erros = require('./middleware/erros');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'desafioodejs009933' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//helpers
app.use(function(req,res,next){
	res.locals.session  = req.session.usuario;
	res.locals.isLogged = req.session.usuario ? true : false;
	res.locals.moment   = moment;
	next();
});

//app.use('/', routes);
//app.use('Users', users);

load('models').then('controllers').then('routes').into(app);

//middleware
app.use(erros.notfound);
app.use(erros.serverError);

app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});
