module.exports = function(app){

	var home       = app.controllers.home;
	var autenticar = require('../middleware/autenticar');
	
	app.route('/')
		.get(home.login)
		.post(home.autenticacao);

	app.route('/home').get(autenticar, home.index);
	app.route('/logout').get(home.logout);

	app.route('/email')
		.get(autenticar, home.email)
		.post(home.enviar);
}