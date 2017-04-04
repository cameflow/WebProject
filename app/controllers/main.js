module.exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

module.exports.accounts = function(req, res){
	res.render('accounts', { title: 'Express' });
};
module.exports.transactions = function(req, res){
	res.render('transactions', { title: 'Express' });
};
module.exports.reports = function(req, res){
	res.render('reports', { title: 'Express' });
};

module.exports.newTra = function(req, res){
	res.render('newTransaction', { title: 'Express' });
};
