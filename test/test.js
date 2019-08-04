const BetterSQL = require('../index');
const better = new BetterSQL({
	host: 'localhost',
	username: 'root',
	password: 'admin',
	db: 'test_db',
	limit: 10
});

var UserModel = require('./user');
const User = new UserModel(better);
User.verify().then(_ => User.sync());