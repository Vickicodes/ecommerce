const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
	async create(attrs) {
		attrs.id = this.randomId();

		const salt = crypto.randomBytes(8).toString('hex');
		const buf = await scrypt(attrs.password, salt, 64);
		const hash = buf.toString('hex');

		const records = await this.getAll();
		const record = {
			...attrs,
			password: `${hash}.${salt}`
		};
		records.push(record);

		await this.writeAll(records);

		return record;
	}
	async comparePasswords(saved, supplied) {
		const [ hashed, salt ] = saved.split('.');
		const bufSupplied = await scrypt(supplied, salt, 64);
		const hashedSupplied = bufSupplied.toString('hex');

		return hashed === hashedSupplied;
	}
}

module.exports = new UsersRepository('users.json');
