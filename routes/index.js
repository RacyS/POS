var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('auth', { title: 'LOGIN' });
});
router.post('/LoginData', authController.FuncLogin)

module.exports = router;
