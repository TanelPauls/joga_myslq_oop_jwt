const BaseSqlModel = require('./base');

class UserModel extends BaseSqlModel {
    constructor() {
        super('users');
    }

    async findByUsername(username) {
        return await super.findOne('username', username);
    }

    async findByEmail(email) {
        return await super.findOne('email', email);
    }

    async findByUsernameWithRole(username) {
        const query = `
            SELECT u.id, u.username, u.email, u.password_hash, r.name AS role
            FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.username = ?
        `;

        const results = await this.executeQuery(query, [username]);
        return results[0];
    }

}
module.exports = UserModel;