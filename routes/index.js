var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController')
var registerController = require('../controllers/registerController')
const { checkLogin } = require('../middleware/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('auth', { title: 'LOGIN' });
});
router.get('/register', function(req, res, next) {
  res.render('registery', { title: 'Registery' });
});
router.post('/LoginData', authController.FuncLogin)

router.post('/RegisterForm', registerController.FuncRegister)

router.get('/dashboard', checkLogin, (req, res) => {
    res.render('dashboard', { 
        title: 'Dashboard',
        userName: req.session.userEmail 
    });
});

module.exports = router;
