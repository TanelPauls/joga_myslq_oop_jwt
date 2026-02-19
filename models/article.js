const BaseSqlModel = require('./base');

class ArticleModel extends BaseSqlModel {
    constructor() {
        super('article');
    }

    async findAll() {
        const articles = await super.findAll();
        return articles
    }

    async findOne(slug) {
        const article = await super.findOne('slug', slug)
        return article
    }

    async findByAuthor(authorId) {
        return super.findMany('author_id', authorId);
    }

    async create(article) {
        const createArticleId = await super.create(article);
        return createArticleId
    }
}
module.exports = ArticleModel;