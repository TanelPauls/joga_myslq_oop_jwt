const express = require('express');

module.exports = function (userController) {
  const router = express.Router();

  router.get('/register', (req, res) => userController.registerPage(req, res));
  router.post('/register', (req, res) => userController.register(req, res));
  router.post('/login', (req, res) => userController.login(req, res));
  router.post('/logout', (req, res) => userController.logout(req, res));

  return router;
};