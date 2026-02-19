const authorDbModel = require('../models/author.js');
const articleDbModel = require('../models/article.js');

const authorModel = new authorDbModel();
const articleModel = new articleDbModel();

class authorController {
    constructor() {
        const authors = [];
    }

    async getAuthorById(req, res) {
        const author = await authorModel.findById(req.params.id);
        const articles = await articleModel.findByAuthor(author.id);
        author['articles'] = articles;
        res.status(201).json({author: author})
    }

    async getAllAuthors(req, res){
        const authors = await authorModel.findAll();
        res.status(201).json({authors});
    }
}

module.exports = authorController