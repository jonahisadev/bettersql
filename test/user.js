const BetterSQL = require('../index');

class User extends BetterSQL.Model {

	constructor(conn) {
		super(conn, "user");
	}

	id = {
		type: BetterSQL.Type.UUID,
		primary: true
	}

	username = {
		type: BetterSQL.Type.STRING,
		length: 64
	}

}

module.exports = User;