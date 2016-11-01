module.exports = function(app){
	
	var amigo      = app.controllers.amigos;
	var autenticar = require('../middleware/autenticar');

	app.route('/amigos').get(autenticar, amigo.index);

	app.route('/amigos/create')
		.get(autenticar, amigo.create)
		.post(amigo.salvar);

	app.route('/amigos/show/:id').get(autenticar, amigo.show);
	app.route('/amigos/delete/:id').post(amigo.excluir);

	app.route('/amigos/edit/:id')
		.get(autenticar, amigo.editar)
		.post(amigo.update);
}