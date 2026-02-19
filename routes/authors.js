const express = require('express');

module.exports = function (authorController) {
  const router = express.Router();

  router.get('/all', (req, res) => authorController.getAllAuthors(req, res));
  router.get('/:id', (req, res) => authorController.getAuthorById(req, res));

  return router;
};