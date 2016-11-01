module.exports = function(app){
	var validacao = require('../validacoes/usuarios');
	var Usuario   = app.models.usuarios;

	var UsuarioController = {
		index: function(req,res){
			Usuario.find(function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao buscar usuários: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/index', {lista: dados});
				}
			});			
		},

		create: function(req,res){
			res.render('usuarios/create', {user: new Usuario()});	
		},

		post: function(req,res){
			if(validacao(req,res)){
				var model      = new Usuario();
				model.nome     = req.body.nome;
				model.email    = req.body.email;
				model.telefone     = req.body.telefone;
				model.password = model.generateHash(req.body.password);

				Usuario.findOne({'email': model.email}, function(err,data){
					if(data){
						req.flash('erro', 'E-mail encontra-se cadastrado, tente outro.');
						res.render('usuarios/create', {user: model});
					}else{
						model.save(function(err){
							if(err){
								req.flash('erro', 'Erro ao cadastrar: '+err);
								res.render('usuarios/create', {user: req.body});
							}else{
								req.flash('info', 'Registro cadastrado com sucesso!');
								res.redirect('/usuarios');
							}
						});
					}
				});					
			}else{
				res.render('usuarios/create', {user: req.body});
			}			
		},

		show: function(req,res){
			Usuario.findById(req.params.id, function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao visualizar usuário: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/show', {dados: dados});
				}
			});
		},

		delete: function(req,res){
			Usuario.remove({_id: req.params.id}, function(err){
				if(err){
					req.flash('erro', 'Erro ao excluir usuário: '+err);
					res.redirect('/usuarios');	
				}else{
					req.flash('info', 'Registro excluído com sucesso!');
					res.redirect('/usuarios');
				}
			});
		},

		edit: function(req,res){
			Usuario.findById(req.params.id, function(err,data){
				if(err){
					req.flash('erro', 'Erro ao editar: '+err);
					res.redirect('/usuarios');	
				}else{
					res.render('usuarios/edit', {dados: data});
				}
			});
		},

		update: function(req,res){
			if(validacao(req,res)){
				Usuario.findById(req.params.id, function(err,data){
					var model  = data;
					model.nome = req.body.nome;
					model.telefone = req.body.telefone;

					model.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao editar: '+err);
							res.render('usuarios/edit', {dados: model});
						}else{
							req.flash('info', 'Registro atualizado com sucesso!');
							res.redirect('/usuarios');
						}
					});
				});
			}else{
				res.render('usuarios/edit', {user: req.body});	
			}
		}
	}

	return UsuarioController;
}