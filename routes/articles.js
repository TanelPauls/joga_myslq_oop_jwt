const express = require('express');

module.exports = function (articleController) {
  const router = express.Router();
  const { requireAdmin } = require('../middleware/auth');

  router.get('/', articleController.getAllArticles.bind(articleController));
  router.get('/article/create', requireAdmin, (req,res) => articleController.createNewArticlePage(req, res));
  router.post('/article/create', requireAdmin, (req,res) => articleController.createNewArticle(req, res));
  router.get('/article/:slug', (req, res) => articleController.getArticleBySlug(req, res));
  router.patch('/article/edit/:id', requireAdmin, (req,res) => articleController.updateArticle(req, res));
  router.delete('/article/delete/:id', requireAdmin, (req,res) => articleController.deleteArticle(req, res));
  
  return router;
};