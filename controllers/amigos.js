var validacao = require('../validacoes/amigos');

module.exports = function(app){

	var Amigos = app.models.amigos;

	var AmigoController = {
		index: function(req,res){
			Amigos.find(function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao carregar: '+err);
					res.render('amigos/index', {lista: null});
				}
				res.render('amigos/index', {lista: dados});
			});
		},

		create: function(req,res){
			res.render('amigos/create', {model: new Amigos()});
		},

		salvar: function(req,res){
			if(validacao(req,res)){
				var model   = new Amigos();
				model.nome  = req.body.nome;
				model.email = req.body.email;
				Amigos.findOne({'nome': model.nome}, function(err,dados){
					if(dados){
						req.flash('erro', 'Nome encontra-se cadastrado, informe outro.');
						res.render('amigos/create', {model: model});
					}else{
						model.save(function(err){
							if(err){
								req.flash('erro', 'Erro ao cadastrar: '+err);
								res.render('amigos/create', {model: model});
							}else{
								req.flash('info', 'Registro cadastrado com sucesso!');
								res.redirect('/amigos');
							}
						});						
					}
				});
			}else{
				res.render('amigos/create', {model: req.body});
			}
		},

		show: function(req,res){
			Amigos.findById(req.params.id, function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao carregar amigo: '+err);
					res.redirect('/amigos');
				}else{
					res.render('amigos/show', {model: dados});
				}
			});
		},

		excluir: function(req,res){
			Amigos.remove({_id: req.params.id}, function(err){
				if(err){
					req.flash('erro', 'Erro ao excluir: '+err);
					res.redirect('/amigos');
				}else{
					req.flash('info', 'Registro excluído com sucesso!');
					res.redirect('/amigos');
				}	
			});
		},

		editar: function(req,res){
			Amigos.findById(req.params.id, function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao editar: '+err);
					res.redirect('/amigos');
				}else{					
					res.render('amigos/edit', {model: dados});
				}
			});
		},

		update: function(req,res){
			if(validacao(req,res)){
				Amigos.findById(req.params.id, function(err,dados){
					var model   = dados;
					model.nome  = req.body.nome;
					model.email = req.body.email;
					model.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao atualizar: '+err);
							res.render('amigos/edit', {model: model});
						}else{
							req.flash('info', 'Registro atualizado com sucesso!');
							res.redirect('/amigos');
						}
					});
				});
			}else{
				res.render('amigos/edit', {model: req.body});
			}	
		}
	}

	return AmigoController;
}