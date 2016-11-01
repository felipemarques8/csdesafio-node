var mongoose = require('mongoose');

module.exports = function(){

	var contatoSchema = mongoose.Schema({
		tipo    : {type: String, required: true, trim: true},
		telefone: {type: String, required: true, trim: true}
	});

	var amigosSchema = mongoose.Schema({
		nome    : {type: String, required: true, trim: true, unique: true},
		email   : {type: String, trim: true},
		contatos: [contatoSchema],
		data_cad: {type: Date, default: Date.now},		
	});

	return mongoose.model('Amigos', amigosSchema);
}