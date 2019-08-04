const Type = require('./types');
const uuid = require('uuid/v4');

class Model {

	constructor(better, name) {
		this._conn = better._conn;
		this._name = name;
	}

	_columns() {
		var cols = [];
		var members = Object.getOwnPropertyNames(this);
		for (var i = 0; i < members.length; i++) {
			if (members[i].startsWith('_')) continue;
			
			var col = this[members[i]];
			col["name"] = members[i];
			cols.push(col);
		}
		return cols;
	}

	verify() {
		return this._conn.getConnection().then(conn => {
			const res = conn.query("SELECT 1 + 1 AS sum");
			conn.release();
			return res;
		}).then(res => {
			if (res[0][0].sum == 2)
				console.log("Verified connection");
			else
				console.log("Connection could not be verified");
			return this;
		}).catch(err => {
			throw err;
		});
	}

	sync() {
		const cols = this._columns();
		var sql = "CREATE TABLE IF NOT EXISTS " + this._name + " (\n";
		
		for (var i = 0; i < cols.length; i++) {
			var col = cols[i];
			
			sql += "\t" + col.name + " ";
			switch (col.type) {
				case Type.STRING:
					sql += "VARCHAR(" + col.length + ")";
					break;
				case Type.NUMBER:
					sql += "INT";
					break;
				case Type.UUID:
					sql += "VARCHAR(36)";
					break;
				default:
					break;
			}

			if (col.primary)
				sql += " PRIMARY KEY";

			if (i != cols.length - 1)
				sql += ","
			sql += "\n";
		}

		sql += ");"
		
		console.log("Syncing table " + this._name + "...");
		console.log(sql);

		return this._conn.getConnection().then(conn => {
			const res = conn.query(sql);
			conn.release();
			return res;
		}).then(res => {
			console.log("Successfully synced " + this._name + " table!");
		}).catch(err => {
			throw err;
		});
	}

}

module.exports = Model;