module.exports = function(req,res){
	
	req.assert('telefone', 'Informe seu telefone.').notEmpty();

	var validacoesErros = req.validationErrors() || [];

	if(validacoesErros.length > 0){
		validacoesErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false;
	}
	
	return true;
}