const mysql = require('mysql2/promise');

const Type = require('./types');
const Model = require('./model');

class BetterSQL {

	static Type = Type;
	static Model = Model;

	constructor(options) {
		this._conn = mysql.createPool({
			host: options.host,
			user: options.username,
			password: options.password,
			database: options.db,
			connectionLimit: options.limit
		});
	}

}

module.exports = BetterSQL;