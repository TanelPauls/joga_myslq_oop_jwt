const BaseSqlModel = require('./base');

class AuthorModel extends BaseSqlModel {
    constructor() {
        super('author');
    }

    async findMany(author) {
        if (!author || !author.id) {
            throw new Error('Author object with id required');
        }

        return super.findMany({
            author_id: author.id
        });
    }
}
module.exports = AuthorModel;